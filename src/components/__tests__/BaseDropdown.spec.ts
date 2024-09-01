import { shallowMount } from '@vue/test-utils'
import BaseDropdown from '@/components/BaseDropdown.vue'
import { describe, it, expect } from 'vitest'

describe('BaseDropdown.vue', () => {
  const options = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]

  it('renders the dropdown with correct label', () => {
    const wrapper = shallowMount(BaseDropdown, {
      props: {
        id: 'difficulty',
        label: 'Select Difficulty',
        modelValue: '',
        options
      }
    })
    expect(wrapper.find('label').text()).toBe('Select Difficulty')
  })

  it('renders the correct number of options', () => {
    const wrapper = shallowMount(BaseDropdown, {
      props: {
        id: 'difficulty',
        label: 'Select Difficulty',
        modelValue: '',
        options
      }
    })
    expect(wrapper.findAll('option').length).toBe(options.length + 1) // +1 for the default disabled option
  })

  it('sets the correct default value', () => {
    const wrapper = shallowMount(BaseDropdown, {
      props: {
        id: 'difficulty',
        label: 'Select Difficulty',
        modelValue: 'medium',
        options
      }
    })
    expect(wrapper.find('select').element.value).toBe('medium')
  })

  it('emits update:modelValue event on change', async () => {
    const wrapper = shallowMount(BaseDropdown, {
      props: {
        id: 'difficulty',
        label: 'Select Difficulty',
        modelValue: '',
        options
      }
    })
    await wrapper.find('select').setValue('hard')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['hard'])
  })

  it('disables the dropdown when disabled prop is true', () => {
    const wrapper = shallowMount(BaseDropdown, {
      props: {
        id: 'difficulty',
        label: 'Select Difficulty',
        modelValue: '',
        options,
        disabled: true
      }
    })
    expect(wrapper.find('select').attributes('disabled')).toBeDefined()
  })
})
