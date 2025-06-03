<script setup>
const props = defineProps({ blok: Object })

const layoutClasses = {
  'full-width': 'h-screen',
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
        <div class="relative animate-swing">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 h-32">
            <div class="flex space-x-16">
              <div class="w-0.5 h-32 bg-gray-600"/>
              <div class="w-0.5 h-32 bg-gray-600"/>
            </div>
          </div>

          <div class="mt-28">
            <OpenSign>Betrieb jeden Donnerstag ab 18 Uhr geöffnet!</OpenSign>
          </div>
        </div>
    </div>
    <div
        class="relative px-8 pt-20 z-10 w-full py-6"
    >
      <div class="relative z-10 md:w-2/3">
        <h1 class="text-6xl text-deep-basalt font-bold mb-3">
          {{ blok.headline }}
        </h1>
        <h2 class="text-2xl font-light">
          {{ blok.subheadline }}
        </h2>
      </div>
      <div class="absolute z-1 -top-20 bottom-0 right-0 left-0 z-0 object-cover bg-beer-foam bg-fade-to-top"/>
    </div>
    <img
        class="absolute top-0 left-0 z-0 w-full h-full object-cover"
        :src="blok.background_image.filename"
        :alt="blok.background_image.alt"
    >
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
