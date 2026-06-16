import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { Suspense, h } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import CategoriesView from './CategoriesView.vue'
import { search } from '@/api/categories'
import type { Category } from '@/types'

vi.mock('@/api/categories', () => ({ search: vi.fn() }))

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/categories', name: 'categories', component: { template: '<div />' } },
    { path: '/categories/:slug', name: 'category', component: { template: '<div />' } },
  ],
})

function category(over: Partial<Category> = {}): Category {
  return { id: '1', slug: 'c1', name: 'Category 1', ...over }
}

function pageOf(items: Category[]) {
  return { data: { data: items, items: items.length, pages: 1, first: 1, prev: null, next: null, last: 1 } }
}

async function mountView() {
  await router.push('/categories')
  await router.isReady()
  const wrapper = mount(
    { render: () => h(Suspense, null, { default: () => h(CategoriesView) }) },
    { global: { plugins: [router] } },
  )
  await flushPromises()
  return wrapper
}

describe('CategoriesView', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders a card for each category', async () => {
    vi.mocked(search).mockResolvedValue(
      pageOf([category({ id: '1', name: 'Phones' }), category({ id: '2', name: 'Laptops' })]) as never,
    )
    const wrapper = await mountView()

    expect(wrapper.findAll('.card')).toHaveLength(2)
    expect(wrapper.text()).toContain('Phones')
    expect(wrapper.text()).toContain('Laptops')
    expect(wrapper.text()).not.toContain('No categories found')
  })

  it('shows a message when there are no categories', async () => {
    vi.mocked(search).mockResolvedValue(pageOf([]) as never)
    const wrapper = await mountView()

    expect(wrapper.findAll('.card')).toHaveLength(0)
    expect(wrapper.text()).toContain('No categories found')
  })
})
