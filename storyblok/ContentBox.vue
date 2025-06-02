<script setup>
const { blok } = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(blok.content))
</script>

<template>
<div
    v-editable="blok"
class="container mx-auto my-12 card" :class="{'grid gap-x-4 sm:grid-cols-2': blok.image}">
  <div class="prose p-4" v-html="resolvedRichText"/>
  <div v-if="blok.image.filename">
    <img
        :src="blok.image.filename"
        :alt="blok.image.alt"
        class="rounded-lg"
    >
  </div>
</div>
</template>