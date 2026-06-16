import http from '@/lib/axios'
import type { Category } from '@/types'

export interface CategorySearchParams {
  q?: string
}

export function search(params?: CategorySearchParams) {
  return http.get<Category[]>('/categories', { params })
}

export function show(id: string | number) {
  return http.get<Category>(`/categories/${id}`)
}
