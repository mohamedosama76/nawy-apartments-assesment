import { ChangeEvent } from 'react';

interface FilterFormProps {
  filters: {
    unitName: string;
    unitNumber: string;
    projectName: string;
  };
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FilterForm({ filters, onFilterChange }: FilterFormProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 pb-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Filter Apartments</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="unitName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Unit Name
          </label>
          <input
            type="text"
            id="unitName"
            name="unitName"
            value={filters.unitName}
            onChange={onFilterChange}
            className="mt-1 h-8 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="unitNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Unit Number
          </label>
          <input
            type="text"
            id="unitNumber"
            name="unitNumber"
            value={filters.unitNumber}
            onChange={onFilterChange}
            className="mt-1 h-8 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={filters.projectName}
            onChange={onFilterChange}
            className="mt-1 h-8 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
