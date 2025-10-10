<template>
  <div
      v-editable="blok"
      class="container mx-auto py-12"
  >
    <div
        v-if="blok.headline"
        class="py-14 text-6xl text-deep-basalt text-center"
    >
      {{ blok.headline }}
    </div>
    <div v-if="blok.body" class="text-2xl md:px-36 text-center text-handwritten">
      {{ blok.body }}
    </div>
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
