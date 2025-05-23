<script setup>
const { blok } = defineProps({ blok: Object })

const topPadding = computed(() => blok.below_header_padding ? 'pt-28' : '')
</script>

<template>
  <div v-editable="blok" :class="[topPadding]">
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>