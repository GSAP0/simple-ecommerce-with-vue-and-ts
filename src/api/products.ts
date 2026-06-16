import http from '@/lib/axios'
import type { Product } from '@/types'

export interface ProductSearchParams {
  q?: string
  category?: number
}

export function search(params?: ProductSearchParams) {
  return http.get<Product[]>('/products', { params })
}

export function show(id: string | number) {
  return http.get<Product>(`/products/${id}`)
}
