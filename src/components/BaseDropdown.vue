<script setup lang="ts">
import { defineProps } from 'vue'

interface Option {
  value: string | number
  label: string
}

const props = defineProps<{
  id: string
  label: string
  modelValue: string | number
  options: Option[]
}>()

const dropdownClasses =
  'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
</script>
<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      :id="id"
      :class="dropdownClasses"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>Select an option</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
