<script setup>
const props = defineProps({ 
  blok: { 
    type: Object, 
    default: () => ({}) 
  } 
})

const layoutClasses = {
  'full-width': 'h-screen md:min-h-[500px]',
  'constrained': 'h-screen container mx-auto rounded-lg',
  'half-height-full-width': 'min-h-[50vh]'
}

const heroClasses = computed(() => {
  return layoutClasses[props.blok.layout || 'constrained']
})
</script>

<template>
  <div
      v-editable="blok"
      class="flex relative flex-col justify-between overflow-hidden"
      :class="heroClasses"
  >
    <div class="container mx-auto z-[11] flex justify-end">
        <div class="relative animate-swing max-w-screen h-0">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 h-32">
            <div class="flex space-x-16">
              <div class="w-0.5 h-32 bg-gray-600"/>
              <div class="w-0.5 h-32 bg-gray-600"/>
            </div>
          </div>

          <div class="mt-28 max-sm:max-w-[80%] mx-auto">
            <OpenSign>Betrieb jeden Donnerstag ab 18 Uhr geöffnet!</OpenSign>
          </div>
        </div>
    </div>
    <div
        class="relative px-8 pt-20 z-10 w-full py-6"
    >
      <div class="relative z-10 lg:w-2/3">
        <h1 class="text-4xl md:text-6xl font-bold mb-3">
          {{ blok.headline }}
        </h1>
        <h2 class="text-lg md:text-2xl font-sans font-medium">
          {{ blok.subheadline }}
        </h2>
      </div>
      <div class="absolute z-1 -top-20 bottom-0 right-0 left-0 z-0 object-cover bg-white bg-fade-to-top"/>
    </div>
    <NuxtImg
        class="absolute top-0 left-0 z-0 w-full h-full object-cover"
        :src="blok.background_image.filename"
        :alt="blok.background_image.alt"
        width="1920"
        height="1080"
        quality="80"
        priority
        preload
        loading="eager"
        fetchpriority="high"
    />
  </div>
</template>

<style scoped>
@keyframes swing {
/*  0% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }*/
  0% { transform: rotate(2deg); }
  50% { transform: rotate(-2deg); }
  0% { transform: rotate(2deg); }
}

.animate-swing {
  animation: swing 3s ease-in-out infinite;
  transform-origin: top center;
  transform: rotate(2deg);
}
</style>
