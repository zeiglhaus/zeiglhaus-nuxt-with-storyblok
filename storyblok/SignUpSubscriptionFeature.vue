<script setup>
const { blok } = defineProps({ 
  blok: { 
    type: Object, 
    required: true 
  } 
})

</script>

<template>
  <div v-editable="blok" class="p-3 bg-white/75 text-deep-basalt rounded-sm flex flex-col gap-1">
    <h4 class="text-cooling-lava text-lg">
      {{ blok.title }}
    </h4>
    <div class="font-bold">
      {{ blok.cost }}
    </div>
    <div>
      {{ blok.notes }}
    </div>
  </div>
</template>
