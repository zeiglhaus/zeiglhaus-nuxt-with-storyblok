<script setup>
const props = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(props.blok.content))
</script>

<template>
  <div v-editable="blok" class="pt-16 md:pt-24">
    <img
        v-if="blok.image?.filename"
        :src="blok.image.filename + '/m/1600x0'"
        :alt="blok.image.alt"
        class="w-full h-[360px] lg:h-[450px] object-cover"
    >
    <div class="container mx-auto mb-12 p-2">
      <h1 class="text-4xl font-bold mb-4 break-words">{{ blok.title }}</h1>
      <h2 class="text-2xl font-bold mb-4">
        {{ blok.subtitle }}
      </h2>
      <div class="prose max-w-full" v-html="resolvedRichText"/>
    </div>
  </div>
</template>