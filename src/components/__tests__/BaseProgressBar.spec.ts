import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseProgressBar from '@/components/BaseProgressBar.vue'

describe('BaseProgressBar.vue', () => {
  it('renders the progress bar correctly', () => {
    const wrapper = shallowMount(BaseProgressBar, {
      props: {
        answeredQuestions: 5,
        totalQuestions: 10
      }
    })
    expect(wrapper.find('.bg-teal-500').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
  })

  it('calculates the progress percentage correctly', () => {
    const wrapper = shallowMount(BaseProgressBar, {
      props: {
        answeredQuestions: 3,
        totalQuestions: 10
      }
    })
    const progressBar = wrapper.find('.bg-teal-500')
    expect(progressBar.attributes('style')).toContain('width: 30%')
  })

  it('updates the width when answeredQuestions changes', async () => {
    const wrapper = shallowMount(BaseProgressBar, {
      props: {
        answeredQuestions: 2,
        totalQuestions: 10
      }
    })
    let progressBar = wrapper.find('.bg-teal-500')
    expect(progressBar.attributes('style')).toContain('width: 20%')

    await wrapper.setProps({ answeredQuestions: 5 })
    progressBar = wrapper.find('.bg-teal-500')
    expect(progressBar.attributes('style')).toContain('width: 50%')
  })

  it('calculates 100% progress when all questions are answered', () => {
    const wrapper = shallowMount(BaseProgressBar, {
      props: {
        answeredQuestions: 10,
        totalQuestions: 10
      }
    })
    const progressBar = wrapper.find('.bg-teal-500')
    expect(progressBar.attributes('style')).toContain('width: 100%')
  })

  it('calculates 0% progress when no questions are answered', () => {
    const wrapper = shallowMount(BaseProgressBar, {
      props: {
        answeredQuestions: 0,
        totalQuestions: 10
      }
    })
    const progressBar = wrapper.find('.bg-teal-500')
    expect(progressBar.attributes('style')).toContain('width: 0%')
  })
})
