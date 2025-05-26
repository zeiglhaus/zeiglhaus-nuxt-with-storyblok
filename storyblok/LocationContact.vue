<script setup>
const { blok } = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(blok.content))


</script>

<template>
<div
    v-editable="blok"
class="container mx-auto my-12 gap-x-4 card grid sm:grid-cols-2">
  <div class="prose p-4" v-html="resolvedRichText"/>
  <div>
    <img
        :src="blok.map_image?.filename"
        :alt="blok.map_image?.alt"
        class="rounded-lg"
    >
  </div>
</div>
</template>