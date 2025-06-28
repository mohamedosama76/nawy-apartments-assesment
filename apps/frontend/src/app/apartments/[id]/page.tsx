'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Apartment, apartmentsApi } from '@/lib/api';
import { ImageGallery } from '@/components/ImageGallery';
import { ApartmentDetails } from '@/components/ApartmentDetails';
import { LoadingState } from '@/components/LoadingState';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { NotFoundMessage } from '@/components/NotFoundMessage';
import { BackLink } from '@/components/BackLink';

export default function ApartmentDetail() {
  const params = useParams();
  const id = Number(params.id);

  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);
        const data = await apartmentsApi.getApartment(id);
        setApartment(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching apartment:', err);
        setError('Failed to load apartment details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApartment();
    }
  }, [id]);

  
  const getAllImages = () => {
    const images: string[] = [];
    if (apartment?.mainImage) {
      images.push(apartment.mainImage);
    }
    if (apartment?.images && apartment.images.length > 0) {
      images.push(...apartment.images);
    }
    return images;
  };

  if (loading) {
    return <LoadingState message="Loading apartment details..." />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!apartment) {
    return <NotFoundMessage message="Apartment not found" />;
  }

  const images = getAllImages();

  return (
    <div>
      <BackLink href="/" label="Back to all apartments" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <ImageGallery images={images} alt={apartment.unitName} />
        <ApartmentDetails apartment={apartment} />
      </div>
    </div>
  );
}
