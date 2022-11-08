import type { Movie } from '@/types/movie';

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface MovieResponse {
  data: Movie[];
  pageInfo: PageInfo;
}
