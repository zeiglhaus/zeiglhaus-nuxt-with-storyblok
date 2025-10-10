<script setup>
const { blok } = defineProps({ 
  blok: { 
    type: Object, 
    required: true 
  } 
})

const topPadding = computed(() => blok.below_header_padding ? 'pt-28' : '')
</script>

<template>
  <div v-editable="blok" :class="[topPadding]">
    <StoryblokComponent v-for="bodyBlok in blok.body" :key="bodyBlok._uid" :blok="bodyBlok" />
  </div>
</template>
