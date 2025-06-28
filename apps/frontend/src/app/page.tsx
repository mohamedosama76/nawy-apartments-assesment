'use client';

import { useEffect, useState } from 'react';
import { Apartment, PaginationMetadata, apartmentsApi } from '@/lib/api';
import { ApartmentCard } from '@/components/ApartmentCard';
import { FilterForm } from '@/components/FilterForm';
import { Pagination } from '@/components/Pagination';
import { LoadingState } from '@/components/LoadingState';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { NotFoundMessage } from '@/components/NotFoundMessage';

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [pagination, setPagination] = useState<PaginationMetadata>({
    total: 0,
    page: 1,
    limit: 21,
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    unitName: '',
    unitNumber: '',
    projectName: '',
  });

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const response = await apartmentsApi.getApartments(filters, {
          page: pagination.page,
          limit: pagination.limit,
        });
        setApartments(response.data);
        setPagination(response.pagination);
        setError(null);
      } catch (err) {
        console.error('Error fetching apartments:', err);
        setError('Failed to load apartments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [filters, pagination.page, pagination.limit]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Apartments</h1>

      {}
      <FilterForm filters={filters} onFilterChange={handleFilterChange} />

      {}
      {loading && <LoadingState message="Loading apartments..." />}
      {error && <ErrorDisplay message={error} />}

      {}
      {!loading && !error && (
        <>
          {apartments.length === 0 ? (
            <NotFoundMessage message="No apartments found matching your criteria" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apartments.map(apartment => (
                  <ApartmentCard key={apartment.id} apartment={apartment} />
                ))}
              </div>

              <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </>
          )}
        </>
      )}
    </div>
  );
}
