<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

interface Props {
  id: string
  label: string
  modelValue: string | number
  options: Option[]
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}

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
      @input="onChange"
      :disabled="disabled"
    >
      <option value="" disabled>Select an option</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
