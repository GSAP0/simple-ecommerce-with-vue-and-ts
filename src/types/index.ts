export interface Product {
  id: number
  name: string
  description?: string
  price: number
}

export interface Category {
  id: number
  name: string
  description?: string
  products?: Product[]
}

export interface CartItem extends Product {
  quantity: number
}
