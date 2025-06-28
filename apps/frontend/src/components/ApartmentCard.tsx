import Link from 'next/link';
import Image from 'next/image';
import { Apartment } from '@/lib/api';

interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="bg-gray-200 dark:bg-gray-700 h-48 relative">
        {apartment.mainImage ? (
          <Image
            src={apartment.mainImage}
            alt={apartment.unitName}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 dark:text-gray-500 text-xl">No Image Available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium">{apartment.unitName}</h3>
        <p className="text-gray-500 dark:text-gray-400">Unit #{apartment.unitNumber}</p>
        <div className="mt-2 flex justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <div>
              {apartment.bedrooms} beds • {apartment.bathrooms} baths
            </div>
            <div>{apartment.area} m²</div>
          </div>
          <div className="font-semibold text-primary-600 dark:text-primary-400">
            EGP {apartment.price.toLocaleString()}
          </div>
        </div>
        {apartment.project && (
          <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded inline-block">
            {apartment.project.name}
          </div>
        )}
        <div className="mt-4">
          <Link
            href={`/apartments/${apartment.id}`}
            className="inline-block bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
