<script setup>
const { blok } = defineProps({ blok: Object })

const imageAlignment = computed(() => blok.alignment || 'left')
const resolvedRichText = computed(() => renderRichText(blok.text))

const imageOrder = computed(() =>
    ({
      'left': 'sm:order-0',
      'right': 'sm:order-1'
    })[imageAlignment.value]
);
const textAlign = computed(() =>
    ({
      'left': 'sm:text-left',
      'right': 'sm:text-right'
    })[imageAlignment.value]
);
const containerJustify = computed(() =>
    ({
      'left': 'sm:justify-start',
      'right': 'sm:justify-end'
    })[imageAlignment.value]
);
</script>

<template>
  <div
      v-editable="blok"
      class="side-feature relative container mx-auto flex flex-col sm:flex-row gap-x-8 align-center my-4 sm:px-1/9"
      :class="[containerJustify]"
  >
    <div class="md:w-1/2 sm:w-1/3 rounded-md overflow-hidden" :class="[imageOrder]">
      <NuxtImg
          :src="blok.image.filename"
          :alt="blok.image.alt"
          width="800"
          height="600"
          class="w-full h-full object-cover"
      />
    </div>
    <div class="flex md:w-1/2 sm:w-2/3 flex-col justify-center" :class="[textAlign]">
      <div class="px-8 py-8">
        <h2 class="text-zh-green mb-2">{{ blok.headline }}</h2>
        <span v-html="resolvedRichText"/>
      </div>
    </div>
  </div>
</template>
