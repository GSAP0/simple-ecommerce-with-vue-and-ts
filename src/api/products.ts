import http from '@/lib/axios'
import { createError } from '@/lib/error'
import type { Product, Paginated } from '@/types'

export const PER_PAGE = 12

export interface ProductSearchParams {
  page?: number
  perPage?: number
  q?: string
  sort?: string
  category?: string
}

export function search({ page = 1, perPage = PER_PAGE, q, sort, category }: ProductSearchParams = {}) {
  const params: Record<string, string | number> = {
    _page: page,
    _per_page: perPage,
    _embed: 'category',
  }
  if (q) params['name:contains'] = q
  if (sort) params._sort = sort
  if (category) params.categoryRef = category
  return http.get<Paginated<Product>>('/products', { params })
}

export async function showBySlug(slug: string): Promise<Product> {
  const { data } = await http.get<Product[]>('/products', {
    params: { slug, _embed: 'category' },
  })
  const product = data[0]
  if (!product) {
    throw createError(404, 'This product doesn\'t exist or is no longer available.')
  }
  return product
}
