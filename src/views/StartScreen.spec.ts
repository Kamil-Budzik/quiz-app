import { shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useQuizStore } from '@/stores/quiz'
import StartScreen from '@/views/StartScreen.vue'
import DropdownSelect from '@/components/BaseDropdown.vue'
import { vi, describe, beforeEach, expect, it } from 'vitest'

vi.mock('@/components/BaseDropdown.vue', () => ({
  default: {
    name: 'DropdownSelect',
    template: '<div></div>',
    props: ['id', 'label', 'modelValue', 'options']
  }
}))

describe('StartScreen.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly with all elements', () => {
    const wrapper = shallowMount(StartScreen)
    expect(wrapper.find('h1').text()).toBe('Welcome to the Quiz')
    expect(wrapper.findAllComponents(DropdownSelect).length).toBe(2)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('starts the quiz when both dropdowns are selected and button is clicked', async () => {
    const wrapper = shallowMount(StartScreen)
    const quizStore = useQuizStore()
    const startQuizSpy = vi.spyOn(quizStore, 'startQuiz')

    wrapper.findAllComponents(DropdownSelect)[0].vm.$emit('update:modelValue', 'easy')
    wrapper.findAllComponents(DropdownSelect)[1].vm.$emit('update:modelValue', 10)

    await wrapper.find('button').trigger('click')

    expect(startQuizSpy).toHaveBeenCalled()
  })

  it('restarts the quiz on mount', () => {
    const quizStore = useQuizStore()
    const restartQuizSpy = vi.spyOn(quizStore, 'restartQuiz')

    shallowMount(StartScreen)

    expect(restartQuizSpy).toHaveBeenCalled()
  })
})
