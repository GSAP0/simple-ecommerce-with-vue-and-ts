import http from '@/lib/axios'
import { createError } from '@/lib/error'
import type { Category, Paginated } from '@/types'

export const PER_PAGE = 12

export interface CategorySearchParams {
  page?: number
  perPage?: number
  q?: string
}

export function search({ page = 1, perPage = PER_PAGE, q }: CategorySearchParams = {}) {
  const params: Record<string, string | number> = {
    _page: page,
    _per_page: perPage,
  }
  if (q) params['name:contains'] = q
  return http.get<Paginated<Category>>('/categories', { params })
}

export async function showBySlug(slug: string): Promise<Category> {
  const { data } = await http.get<Category[]>('/categories', {
    params: { slug, _embed: 'products' },
  })
  const category = data[0]
  if (!category) {
    throw createError(404, 'This category doesn\'t exist or is no longer available.')
  }
  return category
}
