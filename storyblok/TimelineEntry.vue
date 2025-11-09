<script setup>
const { blok } = defineProps({ 
  blok: { 
    type: Object, 
    required: true 
  } 
})

</script>
<template>
  <div class="timeline-entry container mx-auto flex px-4">
    <div class="w-0 sm:w-1/2 sm:min-w-1/2 sm:max-w-1/2"/>
    <div class="border-x border-deep-basalt w-0 mx-10 flex-shrink-0">
      <div class="rounded-full bg-deep-basalt w-2 h-2 -translate-x-1/2 mt-3.5"/>
    </div>
    <div class="timeline-text-column sm:w-1/2 sm:min-w-1/2 sm:max-w-1/2 mb-10">
      <h2 class="mb-2 text-zh-green">{{ blok.year }}</h2>
      <span class="text-deep-basalt">{{ blok.text }}</span>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: theme('screens.sm')) {
  .timeline-entry:nth-child(odd) {
    flex-direction: row-reverse;
  }

  .timeline-entry:nth-child(odd) > .timeline-text-column {
    text-align: right;
  }
}
</style>