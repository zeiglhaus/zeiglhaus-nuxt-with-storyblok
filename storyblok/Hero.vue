<script setup>
const props = defineProps({ blok: Object })

const heroClasses = computed(() => {
  return props.blok.layout === 'constrained' ? 'container mx-auto' : ''
})
</script>

<template>
  <div
      v-editable="blok"
      class="h-screen relative flex items-end justify-center rounded-[5px] overflow-hidden"
      :class="heroClasses"
  >
    <div
        class="relative px-8 z-10 w-full bg-gradient-to-t from-beer-foam/90 via-beer-foam/80 to-transparent py-6 pt-20"
    >
      <div class="container mx-auto">
        <h1 class="text-6xl text-deep-basalt font-bold mb-3">
          {{ blok.headline }}
        </h1>
        <h2 class="text-2xl font-light">
          {{ blok.subheadline }}
        </h2>
      </div>
    </div>
    <img
        :src="blok.background_image.filename"
        :alt="blok.background_image.alt"
        class="absolute top-0 left-0 z-0 w-full h-full object-cover"
    >
  </div>
</template>
