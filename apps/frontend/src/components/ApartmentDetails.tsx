import { Apartment } from '@/lib/api';

interface ApartmentDetailsProps {
  apartment: Apartment;
}

export function ApartmentDetails({ apartment }: ApartmentDetailsProps) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{apartment.unitName}</h1>
          <p className="text-gray-500 dark:text-gray-400">Unit #{apartment.unitNumber}</p>
        </div>
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          EGP {apartment.price.toLocaleString()}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 mr-2">Area:</span>
            <span className="font-medium">{apartment.area} m²</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 mr-2">Bedrooms:</span>
            <span className="font-medium">{apartment.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 mr-2">Bathrooms:</span>
            <span className="font-medium">{apartment.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 mr-2">Status:</span>
            <span
              className={`font-medium ${apartment.status === 'available' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}
            >
              {apartment.status.charAt(0).toUpperCase() + apartment.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {apartment.description && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 dark:text-gray-300">{apartment.description}</p>
        </div>
      )}

      {apartment.project && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Project Information</h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-primary-700 dark:text-primary-400">
              {apartment.project.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{apartment.project.location}</p>
            {apartment.project.description && (
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {apartment.project.description}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
        <button className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-6 py-3 rounded-md text-lg font-medium w-full sm:w-auto">
          Contact Agent
        </button>
      </div>
    </div>
  );
}
