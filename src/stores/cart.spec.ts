import { beforeEach, describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from './cart'
import type { Product } from '@/types'

function makeProduct(over: Partial<Product> = {}): Product {
  return { id: '1', slug: 'p1', name: 'Product 1', price: 100, categoryId: '1', ...over }
}

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a new item with quantity 1', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct())

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(1)
    expect(cart.count).toBe(1)
    expect(cart.total).toBe(100)
  })

  it('merges quantity when the same product is added again', () => {
    const cart = useCartStore()
    const product = makeProduct()
    cart.addItem(product)
    cart.addItem(product, 2)

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(3)
    expect(cart.count).toBe(3)
    expect(cart.total).toBe(300)
  })

  it('keeps separate lines for different products', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: '1', price: 100 }))
    cart.addItem(makeProduct({ id: '2', price: 50 }))

    expect(cart.items).toHaveLength(2)
    expect(cart.count).toBe(2)
    expect(cart.total).toBe(150)
  })

  it('removes an item by id', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: '1' }))
    cart.addItem(makeProduct({ id: '2' }))
    cart.removeItem('1')

    expect(cart.items.map((item) => item.id)).toEqual(['2'])
  })

  it('updates the quantity of an item', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: '1' }))
    cart.updateQuantity('1', 5)

    expect(cart.items[0].quantity).toBe(5)
    expect(cart.total).toBe(500)
  })

  it('removes the item when quantity is set to 0 or below', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: '1' }))
    cart.updateQuantity('1', 0)

    expect(cart.items).toHaveLength(0)
  })

  it('clears the cart', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: '1' }))
    cart.addItem(makeProduct({ id: '2' }))
    cart.clear()

    expect(cart.items).toHaveLength(0)
    expect(cart.count).toBe(0)
    expect(cart.total).toBe(0)
  })
})
