export interface Product {
  id: string
  slug: string
  name: string
  description?: string
  price: number
  categoryId: string
  image?: string
  category?: Category
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  image?: string
  products?: Product[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface Paginated<T> {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: T[]
}
