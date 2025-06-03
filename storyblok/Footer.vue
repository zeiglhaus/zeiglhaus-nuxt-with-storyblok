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
<div class="p-6">
  <ul class="flex justify-center flex-wrap gap-x-8 px-4 text-sm">
    <li>Zeiglhaus Parkstein e.V.</li>
    <li v-for="blok in footerMenu" :key="blok._uid">
      <NuxtLink :to="`/${blok.link.story.url}`" class="hover:text-molten-amber">
        {{ blok.link.story.name }}
      </NuxtLink>
    </li>
  </ul>
</div>
</template>