import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { Suspense, h } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import ProductsView from './ProductsView.vue'
import { search } from '@/api/products'
import { search as searchCategories } from '@/api/categories'
import type { Product } from '@/types'

vi.mock('@/api/products', () => ({ search: vi.fn() }))
vi.mock('@/api/categories', () => ({ search: vi.fn() }))

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/products', name: 'products', component: { template: '<div />' } },
    { path: '/products/:slug', name: 'product', component: { template: '<div />' } },
  ],
})

function product(over: Partial<Product> = {}): Product {
  return { id: '1', slug: 'p1', name: 'Product 1', price: 100, categoryId: '1', ...over }
}

// search() resolves to an axios-like response: { data: <paginated> }
function pageOf(items: Product[]) {
  return { data: { data: items, items: items.length, pages: 1, first: 1, prev: null, next: null, last: 1 } }
}

async function mountView() {
  await router.push('/products')
  await router.isReady()
  const wrapper = mount(
    { render: () => h(Suspense, null, { default: () => h(ProductsView) }) },
    { global: { plugins: [router, createPinia()] } },
  )
  await flushPromises()
  return wrapper
}

describe('ProductsView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // the category-filter dropdown fetches the categories list
    vi.mocked(searchCategories).mockResolvedValue(pageOf([]) as never)
  })

  it('renders a card for each product', async () => {
    vi.mocked(search).mockResolvedValue(
      pageOf([product({ id: '1', name: 'Alpha' }), product({ id: '2', name: 'Beta' })]) as never,
    )
    const wrapper = await mountView()

    expect(wrapper.findAll('.card')).toHaveLength(2)
    expect(wrapper.text()).toContain('Alpha')
    expect(wrapper.text()).toContain('Beta')
    expect(wrapper.text()).not.toContain('No products found')
  })

  it('shows a message when there are no products', async () => {
    vi.mocked(search).mockResolvedValue(pageOf([]) as never)
    const wrapper = await mountView()

    expect(wrapper.findAll('.card')).toHaveLength(0)
    expect(wrapper.text()).toContain('No products found')
  })
})
