import { PrismaClient } from '@prisma/client';
import { generateMainImage, generateDetailImages, getApartmentType } from './seed-helper';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.apartment.deleteMany();
  await prisma.project.deleteMany();

  
  const cityGate = await prisma.project.create({
    data: {
      name: 'City Gate',
      location: 'New Cairo',
      description: 'Premium development by Qatari Diar with financing up to 10 years',
    },
  });

  const ilBosco = await prisma.project.create({
    data: {
      name: 'Il Bosco',
      location: 'New Administrative Capital',
      description:
        'Modern residential compound by Misr Italia Properties with financing up to 8 years',
    },
  });

  const zedEast = await prisma.project.create({
    data: {
      name: 'ZED East',
      location: '6th Settlement',
      description: 'Luxury development by Ora Developers with financing up to 10 years',
    },
  });

  const districtFive = await prisma.project.create({
    data: {
      name: 'DISTRICT 5',
      location: 'South New Cairo',
      description: 'Contemporary residential complex by Marakez with financing up to 8 years',
    },
  });

  const mountainViewICity = await prisma.project.create({
    data: {
      name: 'Mountain View ICity',
      location: 'New Cairo',
      description: 'Elite compound by Mountain View with premium amenities',
    },
  });

  const badya = await prisma.project.create({
    data: {
      name: 'Badya',
      location: 'October Gardens',
      description: 'Premium development by Palm Hills with financing up to 12 years',
    },
  });

  const bloomFields = await prisma.project.create({
    data: {
      name: 'Bloomfields',
      location: 'Mostakbal City',
      description: 'Modern residential project by Tatweer Misr with financing up to 10 years',
    },
  });

  const villette = await prisma.project.create({
    data: {
      name: 'Villette',
      location: 'New Cairo',
      description: 'Exclusive compound by SODIC with premium finishing',
    },
  });

  const oWest = await prisma.project.create({
    data: {
      name: 'O West',
      location: 'October Gardens',
      description: 'Luxury development by Orascom with financing up to 9 years',
    },
  });

  const cairoGate = await prisma.project.create({
    data: {
      name: 'Cairo Gate',
      location: 'Sheikh Zayed',
      description: 'Premium compound by Emaar Misr with exclusive amenities',
    },
  });

  
  const createApartment = (
    unitName: string,
    unitNumber: string,
    area: number,
    bedrooms: number,
    bathrooms: number,
    price: number,
    description: string,
    projectId: number
  ) => {
    const type = getApartmentType(unitName);
    const mainImage = generateMainImage(type, unitNumber);
    const images = generateDetailImages(type, unitNumber);

    return {
      unitName,
      unitNumber,
      area,
      bedrooms,
      bathrooms,
      price,
      description,
      projectId,
      mainImage,
      images,
    };
  };

  
  await prisma.apartment.createMany({
    data: [
      
      createApartment(
        'Premium Villa Type A',
        'CG-101',
        350,
        4,
        4,
        11060000,
        'Luxury villa with premium finishes and private garden',
        cityGate.id
      ),
      createApartment(
        'Townhouse Type B',
        'CG-102',
        280,
        3,
        3,
        12280000,
        'Modern townhouse with spacious layout and garden',
        cityGate.id
      ),
      createApartment(
        'Twin Villa Type C',
        'CG-103',
        320,
        4,
        3,
        13500000,
        'Semi-attached villa with premium finishing',
        cityGate.id
      ),
      createApartment(
        'Standalone Villa',
        'CG-104',
        400,
        5,
        5,
        15800000,
        'Exclusive standalone villa with private pool',
        cityGate.id
      ),
      createApartment(
        'Garden Apartment',
        'CG-105',
        220,
        3,
        2,
        9800000,
        'Ground floor apartment with private garden',
        cityGate.id
      ),

      
      createApartment(
        'Garden Suite Type A',
        'IB-101',
        180,
        3,
        2,
        7000000,
        'Ground floor apartment with garden access',
        ilBosco.id
      ),
      createApartment(
        'Premium Apartment',
        'IB-102',
        200,
        3,
        2,
        7500000,
        'Middle floor apartment with modern design',
        ilBosco.id
      ),
      createApartment(
        'Sky Villa',
        'IB-103',
        250,
        4,
        3,
        9200000,
        'Top floor apartment with panoramic views',
        ilBosco.id
      ),
      createApartment(
        'Twin House',
        'IB-104',
        300,
        4,
        3,
        10500000,
        'Semi-attached house with private entrance',
        ilBosco.id
      ),
      createApartment(
        'Studio Apartment',
        'IB-105',
        70,
        1,
        1,
        3100000,
        'Modern studio with smart home features',
        ilBosco.id
      ),

      
      createApartment(
        'Luxury Suite Type A',
        'ZE-101',
        200,
        3,
        2,
        12506550,
        'Premium apartment with high-end finishes',
        zedEast.id
      ),
      createApartment(
        'Duplex Apartment',
        'ZE-102',
        280,
        4,
        3,
        14800000,
        'Two-floor apartment with private entrance',
        zedEast.id
      ),
      createApartment(
        'Garden Duplex',
        'ZE-103',
        300,
        4,
        4,
        16200000,
        'Ground floor duplex with private garden',
        zedEast.id
      ),
      createApartment(
        'Sky Penthouse',
        'ZE-104',
        350,
        5,
        4,
        18500000,
        'Exclusive penthouse with roof access',
        zedEast.id
      ),
      createApartment(
        'Smart Apartment',
        'ZE-105',
        160,
        2,
        2,
        9800000,
        'Modern apartment with smart home system',
        zedEast.id
      ),

      
      createApartment(
        'Modern Suite Type A',
        'D5-101',
        165,
        3,
        2,
        11520000,
        'Contemporary apartment with premium view',
        districtFive.id
      ),
      createApartment(
        'Family Apartment',
        'D5-102',
        190,
        3,
        2,
        12800000,
        'Spacious apartment with modern layout',
        districtFive.id
      ),
      createApartment(
        'Penthouse Suite',
        'D5-103',
        250,
        4,
        3,
        15600000,
        'Luxury penthouse with city views',
        districtFive.id
      ),
      createApartment(
        'Garden Home',
        'D5-104',
        220,
        3,
        3,
        13900000,
        'Ground floor unit with private garden',
        districtFive.id
      ),
      createApartment(
        'Studio Plus',
        'D5-105',
        80,
        1,
        1,
        6448000,
        'Luxury studio with premium finishing',
        districtFive.id
      ),
      
      createApartment(
        'Premium Suite Type A',
        'MV-101',
        190,
        3,
        2,
        11700123,
        'Luxury apartment with premium finishing',
        mountainViewICity.id
      ),
      createApartment(
        'Garden Villa',
        'MV-102',
        280,
        4,
        3,
        14500000,
        'Villa with private garden and premium amenities',
        mountainViewICity.id
      ),
      createApartment(
        'Sky Loft',
        'MV-103',
        210,
        3,
        2,
        12800000,
        'Duplex apartment with modern design',
        mountainViewICity.id
      ),
      createApartment(
        'Twin House Elite',
        'MV-104',
        300,
        4,
        3,
        15900000,
        'Premium twin house with private entrance',
        mountainViewICity.id
      ),
      createApartment(
        'Smart Studio',
        'MV-105',
        75,
        1,
        1,
        4800000,
        'Modern studio with smart features',
        mountainViewICity.id
      ),

      
      createApartment(
        'Garden Suite',
        'BD-101',
        170,
        3,
        2,
        6561300,
        'Ground floor apartment with garden access',
        badya.id
      ),
      createApartment(
        'Family Home',
        'BD-102',
        190,
        3,
        2,
        7200000,
        'Spacious apartment with modern layout',
        badya.id
      ),
      createApartment(
        'Premium Villa',
        'BD-103',
        280,
        4,
        3,
        9500000,
        'Luxury villa with private garden',
        badya.id
      ),
      createApartment(
        'Sky View',
        'BD-104',
        160,
        2,
        2,
        5800000,
        'High-floor apartment with panoramic views',
        badya.id
      ),
      createApartment(
        'Twin House',
        'BD-105',
        250,
        3,
        3,
        8200000,
        'Semi-attached house with private entrance',
        badya.id
      ),

      
      createApartment(
        'Garden Duplex',
        'BF-101',
        200,
        3,
        2,
        6313000,
        'Ground floor duplex with private garden',
        bloomFields.id
      ),
      createApartment(
        'Smart Home',
        'BF-102',
        150,
        2,
        2,
        5200000,
        'Modern apartment with smart features',
        bloomFields.id
      ),
      createApartment(
        'Family Villa',
        'BF-103',
        270,
        4,
        3,
        8900000,
        'Spacious villa with premium finishing',
        bloomFields.id
      ),
      createApartment(
        'Studio Elite',
        'BF-104',
        65,
        1,
        1,
        2700000,
        'Luxury studio with modern design',
        bloomFields.id
      ),
      createApartment(
        'Sky Penthouse',
        'BF-105',
        230,
        3,
        3,
        7500000,
        'Penthouse with roof access',
        bloomFields.id
      ),

      
      createApartment(
        'Premium Villa',
        'VL-101',
        320,
        4,
        4,
        15227000,
        'Luxury villa with premium amenities',
        villette.id
      ),
      createApartment(
        'Twin House',
        'VL-102',
        280,
        3,
        3,
        13500000,
        'Semi-attached house with garden',
        villette.id
      ),
      createApartment(
        'Townhouse',
        'VL-103',
        250,
        3,
        3,
        12800000,
        'Modern townhouse with private entrance',
        villette.id
      ),
      createApartment(
        'Garden Home',
        'VL-104',
        220,
        3,
        2,
        11500000,
        'Ground floor unit with private garden',
        villette.id
      ),
      createApartment(
        'Sky Villa',
        'VL-105',
        300,
        4,
        3,
        14800000,
        'Luxury villa with roof garden',
        villette.id
      ),
      
      createApartment(
        'Garden Suite',
        'OW-101',
        180,
        3,
        2,
        7232000,
        'Ground floor apartment with garden view',
        oWest.id
      ),
      createApartment(
        'Family Villa',
        'OW-102',
        300,
        4,
        3,
        12500000,
        'Spacious villa with premium finishing',
        oWest.id
      ),
      createApartment(
        'Twin House',
        'OW-103',
        260,
        3,
        3,
        9800000,
        'Semi-attached house with modern design',
        oWest.id
      ),
      createApartment(
        'Sky Loft',
        'OW-104',
        200,
        3,
        2,
        8500000,
        'Duplex apartment with panoramic views',
        oWest.id
      ),
      createApartment(
        'Studio Plus',
        'OW-105',
        70,
        1,
        1,
        4627640,
        'Modern studio with smart features',
        oWest.id
      ),

      
      createApartment(
        'Premium Villa',
        'CG-201',
        350,
        4,
        4,
        16500000,
        'Luxury villa with private pool',
        cairoGate.id
      ),
      createApartment(
        'Twin House Elite',
        'CG-202',
        280,
        3,
        3,
        12500000,
        'Premium twin house with garden',
        cairoGate.id
      ),
      createApartment(
        'Sky Apartment',
        'CG-203',
        190,
        3,
        2,
        9800000,
        'High-floor apartment with city views',
        cairoGate.id
      ),
      createApartment(
        'Garden Home',
        'CG-204',
        220,
        3,
        2,
        10500000,
        'Ground floor unit with private garden',
        cairoGate.id
      ),
      createApartment(
        'Penthouse Suite',
        'CG-205',
        300,
        4,
        3,
        15800000,
        'Luxury penthouse with roof access',
        cairoGate.id
      ),
    ],
  });

  console.log('Database has been seeded with 100 realistic Cairo property listings with images');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
