<script setup>
const { blok } = defineProps({ blok: Object })


function colorForIconClass(iconClass) {
  if (iconClass.includes('whatsapp')) {
    return 'bg-green-700/60 hover:bg-green-700'
  } else if (iconClass.includes('instagram')) {
    return 'bg-pink-900/60 hover:bg-pink-900';
  } else {
    return 'bg-zh-green';
  }
}

</script>
<template>
<div
    v-editable="blok"
    class="container mx-auto my-8 card flex place-items-center gap-x-4">
  <Icon name="mdi:information-outline" class="h-20 w-20 bg-black/20 hidden sm:block" />
  <div class="border-l-4 border-deep-basalt/20 pl-4">
    <h3 class="mb-4 text-deep-basalt"> {{ blok.title }}</h3>
    <div class="flex flex-col justify-stretch gap-x-4 gap-y-4 md:flex-row">
      <NuxtLink
          v-for="button in blok.buttons" :to="button.link.url"
          class="flex flex-row flex-grow place-items-center gap-x-2 rounded-xl p-2 text-white"
          :class="colorForIconClass(button.icon)">
        <Icon :name="button.icon" class="w-12 h-12" />
        <div>
          <h3>{{ button.title }}</h3>
          <p>{{ button.subtitle }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>

</div>
</template>