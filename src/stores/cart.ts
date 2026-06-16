import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CartItem } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function addItem(product: Product, quantity = 1) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function updateQuantity(id: string, quantity: number) {
    const item = items.value.find((item) => item.id === id)
    if (!item) return
    if (quantity <= 0) {
      removeItem(id)
    } else {
      item.quantity = quantity
    }
  }

  function clear() {
    items.value = []
  }

  return { items, count, total, addItem, removeItem, updateQuantity, clear }
}, {
  persist: true,
})
