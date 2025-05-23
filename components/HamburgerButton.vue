<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<template>
  <button
    class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
    @click="$emit('click')"
  >
    <span
      class="block w-6 h-0.5 bg-weathered-basalt transition-transform duration-300"
      :class="{ 'rotate-45 translate-y-1.5': isOpen }"
    />
    <span
      class="block w-6 h-0.5 bg-weathered-basalt transition-opacity duration-300"
      :class="{ 'opacity-0': isOpen }"
    />
    <span
      class="block w-6 h-0.5 bg-weathered-basalt transition-transform duration-300"
      :class="{ '-rotate-45 -translate-y-1.5': isOpen }"
    />
  </button>
</template>