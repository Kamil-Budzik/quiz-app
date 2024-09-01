import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseButton from '@/components/BaseButton.vue'

describe('BaseButton.vue', () => {
  it('renders with default props', () => {
    const wrapper = shallowMount(BaseButton)
    expect(wrapper.classes()).toContain('font-semibold')
    expect(wrapper.classes()).toContain('rounded-full')
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('applies correct classes for primary variant', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { variant: 'primary' }
    })
    expect(wrapper.classes()).toContain('bg-teal-600')
    expect(wrapper.classes()).toContain('hover:bg-teal-700')
  })

  it('applies correct classes for secondary variant', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { variant: 'secondary' }
    })
    expect(wrapper.classes()).toContain('bg-gray-600')
    expect(wrapper.classes()).toContain('hover:bg-gray-700')
  })

  it('applies correct classes for size props', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('text-lg')
    expect(wrapper.classes()).toContain('py-3')
    expect(wrapper.classes()).toContain('px-6')
  })

  it('renders with the correct type attribute', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { type: 'submit' }
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('applies disabled classes when disabled', () => {
    const wrapper = shallowMount(BaseButton, {
      attrs: { disabled: true }
    })
    expect(wrapper.classes()).toContain('disabled:opacity-50')
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed')
  })
})
