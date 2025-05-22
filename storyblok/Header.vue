<script setup>
const storyblokApi = useStoryblokApi();

const headerMenu = ref(null);

const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url'
})

headerMenu.value = data.story.content.header_menu;

watch(data, (d) => console.log(d))
</script>

<template>
  <header class="w-full h-24 bg-[#f7f6fd]">
    <div class="container h-full mx-auto flex items-center justify-between">
      <NuxtLink to="/">
        <h1 class="text-[#50b0ae] text-3xl font-bold">Storyblok Nuxt</h1>
      </NuxtLink>
      <nav>
        <ul class="flex space-x-8 text-lg font-bold">
          <li v-for="blok in headerMenu" :key="blok._uid">
            <NuxtLink :to="`/${blok.link.story.url}`" class="hover:text-[#50b0ae]">
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
  @apply underline underline-offset-4 decoration-4 decoration-[#50b0ae];
}
</style>