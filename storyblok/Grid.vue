<template>
  <div
      v-editable="blok"
      class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-stretch"
  >
    <StoryblokComponent
        v-for="column in blok.columns"
        :key="column._uid"
        :blok="column"
    />
  </div>
</template>

<script setup>
defineProps({ 
  blok: { 
    type: Object, 
    default: () => ({}) 
  } 
})
</script>
