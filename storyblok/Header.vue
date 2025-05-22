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
  <header class="w-full h-24 ">
    <div class="container h-full mx-auto flex items-center justify-between">
      <NuxtLink to="/">
        <h1 class="text-zh-green text-3xl font-bold font-fraunces">Zeiglhaus Parkstein e.V.</h1>
      </NuxtLink>
      <nav>
        <ul class="flex space-x-8 text-lg font-bold">
          <li v-for="blok in headerMenu" :key="blok._uid">
            <NuxtLink :to="`/${blok.link.story.url}`" class="hover:text-zh-green">
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