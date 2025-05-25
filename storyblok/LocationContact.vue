<script setup>
const { blok } = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(blok.content))


</script>

<template>
<div
    v-editable="blok"
class="container mx-auto my-12 gap-x-4 card flex">
  <div class="prose flex-1 p-4" v-html="resolvedRichText"/>
  <div class="flex-1">
    <img
        :src="blok.map_image?.filename"
        :alt="blok.map_image?.alt"
        class="object-cover rounded-lg"
    >
  </div>
</div>
</template>