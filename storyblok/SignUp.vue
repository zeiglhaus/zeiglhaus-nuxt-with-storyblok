<script setup>
const { blok } = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(blok.text))
</script>
<template>
<div
    v-editable="blok"
    class="container mx-auto flex relative rounded-xl min-h-96 overflow-hidden place-items-stretch"
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
            v-for="blok in blok.subscriptions"
            :key="blok._uid"
            :blok="blok"
        />
      </div>
      <div class="text-center">
        {{ blok.subscriptions_hint }}
      </div>
      <div class="flex flex-col justify-stretch md:place-items-center mt-8">
        <a
href="#" class="block text-center signup-wiggle px-6 py-3 rounded-2xl font-handwritten text-2xl bg-molten-amber
       hover:bg-volcanic-red hover:shadow-[0_0_15px] hover:shadow-basalt-highlight transition-all transition-300">
          {{ blok.sign_up_button }}
        </a>
      </div>
    </div>
  </div>
  <img
      class="z-0 absolute top-0 left-0 z-0 w-full h-full object-cover"
      :src="blok.background_image.filename"
      :alt="blok.background_image.alt"
  >
</div>
</template>

<style>
.prose li > p {
  margin: 0;
}

.signup-wiggle:hover {
  animation: wiggle-bounce-hover 0.7s ease-in-out;
}

@keyframes wiggle-bounce-hover {
  0% { transform: rotate(0deg) scale(1.05); }
  15% { transform: rotate(-3deg) scale(1.07); }
  30% { transform: rotate(3deg) scale(1.10); }
  45% { transform: rotate(-2deg) scale(1.08); }
  60% { transform: rotate(2deg) scale(1.09); }
  75% { transform: rotate(-1deg) scale(1.07); }
  100% { transform: rotate(0deg) scale(1.05); }
}

@media (prefers-reduced-motion) {
  .signup-wiggle:hover {
    animation: none;
  }
}
</style>