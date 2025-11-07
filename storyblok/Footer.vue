<script setup>
const storyblokApi = useStoryblokApi();

const footerMenu = ref(null);

const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url'
})

footerMenu.value = data.story.content.footer_links;
</script>
<template>
<div class="p-6 bg-deep-basalt/5 mt-20">
  <div class="container mx-auto flex justify-between flex-col md:flex-row place-items-center flex-wrap gap-x-8 px-4 text-sm">
    <img src="assets/images/Zeiglhaus-kein-Stern.svg" class="h-28" >
    <ul class="flex flex-wrap sm:flex-row justify-center gap-x-8 text-center">
      <li v-for="blok in footerMenu" :key="blok._uid">
      <NuxtLink :to="`/${blok.link.story.url}`" class="hover:text-molten-amber">
        {{ blok.link.story.name }}
      </NuxtLink>
    </li>
  </ul>
    <div>&copy; Zeiglhaus Parkstein e.V.</div>
  </div>
</div>
</template>