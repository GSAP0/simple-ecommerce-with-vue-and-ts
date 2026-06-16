import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ErrorView from './ErrorView.vue'

function mountError(props: Record<string, unknown>) {
  return mount(ErrorView, {
    props,
    global: { stubs: { RouterLink: RouterLinkStub } },
  })
}

describe('ErrorView (not found)', () => {
  it('renders the 404 not-found message by default', () => {
    const wrapper = mountError({ statusCode: 404 })

    expect(wrapper.text()).toContain('404')
    expect(wrapper.text()).toContain('Page not found')
  })

  it('shows a custom not-found message', () => {
    const wrapper = mountError({
      statusCode: 404,
      message: "This category doesn't exist or is no longer available.",
    })

    expect(wrapper.text()).toContain("This category doesn't exist")
  })
})
