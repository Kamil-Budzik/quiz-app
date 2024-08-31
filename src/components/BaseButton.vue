<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
}

const props = defineProps<Props>()

const baseClasses =
  'font-semibold rounded-full transition duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = computed(() => {
  return props.variant === 'secondary'
    ? 'bg-gray-600 text-white hover:bg-gray-700' // Secondary button style with gray colors
    : 'bg-teal-600 text-white hover:bg-teal-700' // Primary button style with teal colors
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-sm py-1 px-3'
    case 'large':
      return 'text-lg py-3 px-6'
    case 'medium':
    default:
      return 'text-md py-2 px-4'
  }
})
</script>

<template>
  <button :class="[baseClasses, variantClasses, sizeClasses]" :type="props.type || 'button'">
    <slot />
  </button>
</template>
