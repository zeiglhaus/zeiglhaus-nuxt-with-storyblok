<script setup>
const { blok } = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(blok.text))

</script>

<template>
  <div
      v-editable="blok"
      class="w-full card text-center overflow-hidden flex flex-col gap-y-4"
  >
    <NuxtImg v-if="blok.image" :src="blok.image?.filename" :alt="blok.image?.alt" class="w-full h-48 xl:h-72 object-cover rounded-lg" width="400" height="300" />
    <div>
      <h3 class="text-2xl text-cooling-lava font-bold mb-2">
        {{ blok.name }}
      </h3>
      <div v-if="blok.text" class="prose" v-html="resolvedRichText"/>
    </div>
  </div>
</template>