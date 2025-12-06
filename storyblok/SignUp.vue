<script setup>
const { blok } = defineProps({ 
  blok: { 
    type: Object, 
    required: true 
  } 
})

const resolvedRichText = computed(() => renderRichText(blok.text))
</script>
<template>
<div
    v-editable="blok"
    class="container mx-auto flex relative rounded-md min-h-96 overflow-hidden place-items-stretch"
>
  <div class="z-10 md:py-20 md:px-12 py-8 px-8 flex flex-col justify-center place-items-center w-full bg-teal-900/80 text-white">
    <div class="md:max-w-3xl">
      <h2 class="mb-2 text-molten-amber">{{ blok.headline }}</h2>
      <h3 v-if="blok.subheadline" class="text-white">{{ blok.subheadline }}</h3>
      <div
class="mt-2 max-w-full
        prose prose-invert
        prose-li:marker:text-white
        prose-li:text-white
        prose-p:text-white
        prose-p:my-2
        prose-ul:mt-1
        prose-li:my-0"
           v-html="resolvedRichText"
      />
      <div
          class="grid mt-5 sm:grid-cols-3 gap-2 my-2 place-items-stretch"
      >
        <StoryblokComponent
            v-for="subscription in blok.subscriptions"
            :key="subscription._uid"
            :blok="subscription"
        />
      </div>
      <div class="text-center">
        {{ blok.subscriptions_hint }}
      </div>
      <div class="flex flex-col justify-stretch md:place-items-center mt-8">
        <a
          href="/documents/Zeiglhaus_eV_Mitgliedsantrag-2023.pdf"
          class="block text-center px-6 py-3 rounded-md font-handwritten text-2xl bg-molten-amber
       hover:bg-volcanic-red hover:shadow-[0_0_15px] hover:shadow-basalt-highlight transition-all transition-300">
          {{ blok.sign_up_button }}
      </a>
      </div>
    </div>
  </div>
  <NuxtImg
      class="z-0 absolute top-0 left-0 w-full h-full object-cover"
      :src="blok.background_image.filename"
      :alt="blok.background_image.alt"
      width="1200"
      height="800"
  />
</div>
</template>

<style>
.prose li > p {
  margin: 0;
}
</style>
