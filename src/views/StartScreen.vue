<script setup lang="ts">
import { ref } from 'vue'
import DropdownSelect from '@/components/BaseDropdown.vue'
import { useQuizStore } from '@/stores/quiz'

const quiz = useQuizStore()
const selectedTopic = ref('')
const selectedNumberOfQuestions = ref(10)

// TODO: fetch from API
const topicOptions = [
  { value: 'science', label: 'Science' },
  { value: 'history', label: 'History' }
]

const questionOptions = [
  { value: 10, label: '10 Questions' },
  { value: 15, label: '15 Questions' },
  { value: 20, label: '20 Questions' },
  { value: 25, label: '25 Questions' }
]

const startQuiz = () => {
  if (selectedTopic.value && selectedNumberOfQuestions.value) {
    quiz.startQuiz()
  } else {
    alert('Please select a topic and the number of questions.')
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
      <h1 class="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-6">
        Welcome to the Quiz
      </h1>
      <p class="text-lg text-center mb-6">
        Get ready to test your knowledge across various topics.
      </p>
      <DropdownSelect
        id="topic-select"
        label="Select a topic"
        v-model="selectedTopic"
        :options="topicOptions"
        class="mb-4"
      />
      <DropdownSelect
        id="questions-select"
        label="Number of Questions"
        v-model="selectedNumberOfQuestions"
        :options="questionOptions"
        class="mb-6"
      />
      <button
        @click="startQuiz"
        class="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-200"
      >
        Start Quiz
      </button>
    </div>
  </div>
</template>
