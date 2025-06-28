import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateMainImage, generateDetailImages, getApartmentType } from '../utils/image-helpers';

const router: Router = Router();
const prisma = new PrismaClient();


router.get('/', async (req, res) => {
  try {
    const { unitName, unitNumber, projectName, page, limit } = req.query;

    
    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const pageSize = limit ? parseInt(limit as string, 10) : 21;

    
    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSize) || pageSize < 1) {
      return res.status(400).json({ error: 'Invalid pagination parameters' });
    }

    
    const filter: any = {};

    
    if (unitName) {
      filter.unitName = { contains: unitName as string, mode: 'insensitive' };
    }

    if (unitNumber) {
      filter.unitNumber = { contains: unitNumber as string, mode: 'insensitive' };
    }

    if (projectName) {
      filter.project = {
        name: { contains: projectName as string, mode: 'insensitive' },
      };
    }

    
    const totalApartments = await prisma.apartment.count({ where: filter });

    
    const skip = (pageNumber - 1) * pageSize;

    
    const apartments = await prisma.apartment.findMany({
      where: filter,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
      skip,
      take: pageSize,
    });

    
    res.json({
      data: apartments,
      pagination: {
        total: totalApartments,
        page: pageNumber,
        limit: pageSize,
        pages: Math.ceil(totalApartments / pageSize),
      },
    });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ error: 'Failed to retrieve apartments' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await prisma.apartment.findUnique({
      where: { id: Number(id) },
      include: {
        project: true,
      },
    });

    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    res.json(apartment);
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ error: 'Failed to retrieve apartment' });
  }
});


router.post('/', async (req, res) => {
  try {
    const {
      unitName,
      unitNumber,
      area,
      bedrooms,
      bathrooms,
      price,
      description,
      status,
      projectId,
      mainImage,
      images,
    } = req.body;

    
    if (!unitName || !unitNumber || !area || !bedrooms || !bathrooms || !price || !projectId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    
    const apartmentType = getApartmentType(unitName);
    const defaultMainImage = generateMainImage(apartmentType, `${unitNumber}-${projectId}`);
    const defaultDetailImages = generateDetailImages(apartmentType, `${unitNumber}-${projectId}`);

    
    const newApartment = await prisma.apartment.create({
      data: {
        unitName,
        unitNumber,
        area: Number(area),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        price: Number(price),
        description,
        status: status || 'available',
        projectId: Number(projectId),
        mainImage: mainImage || defaultMainImage,
        images: images || defaultDetailImages,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    res.status(201).json(newApartment);
  } catch (error) {
    console.error('Error creating apartment:', error);
    res.status(500).json({ error: 'Failed to create apartment' });
  }
});

export default router;
