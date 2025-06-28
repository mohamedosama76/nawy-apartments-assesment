import axios from 'axios';

const baseURL =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    : 'http://localhost:4000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Project {
  id: number;
  name: string;
  location: string;
  description?: string;
}

export interface Apartment {
  id: number;
  unitName: string;
  unitNumber: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  description?: string;
  status: string;
  mainImage?: string;
  images?: string[];
  projectId: number;
  project?: Project;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMetadata {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMetadata;
}

export const apartmentsApi = {
  getApartments: async (
    filters?: {
      unitName?: string;
      unitNumber?: string;
      projectName?: string;
    },
    pagination?: PaginationParams
  ) => {
    const params = {
      ...filters,
      ...pagination,
    };

    const response = await api.get<PaginatedResponse<Apartment>>('/apartments', { params });
    return response.data;
  },

  getApartment: async (id: number) => {
    const response = await api.get<Apartment>(`/apartments/${id}`);
    return response.data;
  },

  createApartment: async (
    apartment: Omit<Apartment, 'id' | 'createdAt' | 'updatedAt' | 'project' | 'images'>
  ) => {
    const response = await api.post<Apartment>('/apartments', apartment);
    return response.data;
  },
};

export default api;
