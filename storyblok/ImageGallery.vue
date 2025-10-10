<script setup>
const { blok } = defineProps({ 
  blok: { 
    type: Object, 
    required: true 
  } 
})
</script>

<template>
  <div
    v-editable="blok"
    class="container mx-auto mt-12"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 rounded-md overflow-hidden">
      <div
        v-for="(image, index) in blok.images"
        :key="index"
      >
        <NuxtImg
          v-if="image.filename"
          :src="image.filename"
          :alt="image.alt || `Gallery image ${index + 1}`"
          class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          width="400"
          height="300"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
