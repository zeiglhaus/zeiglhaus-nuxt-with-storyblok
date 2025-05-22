<script setup>
const storyblokApi = useStoryblokApi();

const headerMenu = ref(null);

const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url'
})

headerMenu.value = data.story.content.header_menu;
</script>

<template>
  <header class="w-full fixed z-20">
    <div
      class="container h-full mx-auto flex
      items-center justify-between
      rounded-full bg-white/80 backdrop-blur-sm
      px-6 py-4 mt-4
      shadow-md"
    >
      <NuxtLink to="/">
        <h1 class="text-zh-green text-4xl font-bold font-fraunces">Zeiglhaus Parkstein e.V.</h1>
      </NuxtLink>
      <nav class="text-weathered-basalt">
        <ul class="flex space-x-8 text-lg">
          <li v-for="blok in headerMenu" :key="blok._uid">
            <NuxtLink :to="`/${blok.link.story.url}`" class="hover:text-molten-amber">
              {{ blok.link.story.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav a.router-link-active {
  @apply underline underline-offset-4 decoration-4 decoration-zh-green;
}
</style>