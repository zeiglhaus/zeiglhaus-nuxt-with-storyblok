<script setup>
const { blok } = defineProps({ blok: Object })

const resolvedRichText = computed(() => renderRichText(blok.subtext))


function classForIcon(icon) {
  if (icon.includes('whatsapp')) {
    return 'bg-[#25D366] hover:bg-[#1da851]'
  } else if (icon.includes('instagram')) {
    return 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:saturate-[1.2]';
  } else {
    return 'bg-zh-green';
  }
}
</script>

<template>
<div
    v-editable="blok"
    class="container mx-auto my-8 card grid md:grid-cols-2 grid-cols-1 gap-x-4">
  <div class="p-4">
    <h2 class="mb-4 text-deep-basalt">{{ blok.title }}</h2>
    <p v-if="resolvedRichText" class="prose" v-html="resolvedRichText"/>
  </div>
  <div class="flex flex-col justify-center gap-2 sm:gap-4">
    <NuxtLink
        v-for="button in blok.buttons"
        :to="button.link.url"
        target="_blank"
        class="group w-full sm:w-auto flex items-center gap-3 px-4 py-2 sm:py-3
                text-white font-medium rounded-lg
               transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]"
        :class="classForIcon(button.icon)"
    >
      <Icon :name="button.icon" class="flex-shrink-0 w-8 h-8" />
      <div class="flex flex-col text-left">
        <span class="text-sm sm:text-base font-bold tracking-wide">{{ button.title }}</span>
        <span class="text-xs sm:text-sm opacity-90">{{ button.subtitle }}</span>
      </div>
    </NuxtLink>
  </div>
</div>
</template>