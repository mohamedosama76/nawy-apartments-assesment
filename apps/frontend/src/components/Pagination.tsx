import { PaginationMetadata } from '@/lib/api';

interface PaginationProps {
  pagination: PaginationMetadata;
  onPageChange: (newPage: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  if (pagination.pages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex justify-between items-center space-x-2">
        <button
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className="w-24 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex space-x-5">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1)
            .filter(
              p =>
                p === 1 ||
                p === pagination.pages ||
                (p >= pagination.page - 1 && p <= pagination.page + 1)
            )
            .map((page, i, arr) => {
              
              if (i > 0 && page - arr[i - 1] > 1) {
                return (
                  <span key={`ellipsis-${page}`} className="px-4 py-2">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-4 py-2 rounded-md ${
                    pagination.page === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              );
            })}
        </div>

        <button
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.pages}
          className="w-24 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Showing {pagination.limit} of {pagination.total} apartments
      </div>
    </div>
  );
}
