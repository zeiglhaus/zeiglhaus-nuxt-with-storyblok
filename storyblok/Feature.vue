<script setup>
const { blok } = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(blok.text))

</script>

<template>
  <div
      v-editable="blok"
      class="w-full card text-center flex flex-col gap-y-4 p-0 rounded-lg overflow-hidden"
  >
    <NuxtImg v-if="blok.image" :src="blok.image?.filename" :alt="blok.image?.alt" class="w-full h-48 xl:h-72 object-cover " width="400" height="300" />
    <div p-4>
      <h3 class="text-2xl text-zh-green font-bold mb-2">
        {{ blok.name }}
      </h3>
      <div v-if="blok.text" class="prose p-4 pt-0" v-html="resolvedRichText"/>
    </div>
  </div>
</template>