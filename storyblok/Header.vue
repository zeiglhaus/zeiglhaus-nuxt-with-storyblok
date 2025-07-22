<script setup>
const storyblokApi = useStoryblokApi();

const headerMenu = ref(null);
const headerMenuIcons = ref(null);
const isMobileMenuOpen = ref(false);

const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url'
})

headerMenu.value = data.story.content.header_menu;
headerMenuIcons.value = data.story.content.header_menu_icons;

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="w-full fixed z-20">
    <div
      class="container sm:max-md:max-w-full mx-auto flex flex-col
       justify-between
      md:rounded-full bg-white/80 backdrop-blur-sm
      px-6 py-3 md:mt-4
      shadow-md"
    >
      <div class="flex justify-between items-center">
        <NuxtLink to="/">
          <h1 class="text-zh-green sm:text-4xl text-xl font-bold font-antic-slab">Zeiglhaus Parkstein e.V.</h1>
        </NuxtLink>

        <nav class="hidden md:flex text-weathered-basalt flex-col justify-center">
          <ul class="flex gap-x-4 text-lg">
            <li v-for="blok in headerMenu" :key="blok._uid">
              <NuxtLink :to="`/${blok.link.story.url}`" class="hover:text-molten-amber">
                {{ blok.link.story.name }}
              </NuxtLink>
            </li>
            <li v-if="headerMenuIcons?.length" class="flex gap-x-2">
              <NuxtLink
                v-for="blok in headerMenuIcons"
                :key="blok._uid"
                :to="blok.link.url"
                class="hover:text-molten-amber flex items-center"
                target="_blank"
              >
                <Icon :name="blok.icon" class="w-6 h-6" />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <HamburgerButton
          :is-open="isMobileMenuOpen"
          @click="toggleMobileMenu"
        />
      </div>

      <div
          class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          :class="isMobileMenuOpen ? 'max-h-96' : 'max-h-0'"
      >
        <nav>
          <ul class="py-4">
            <li v-for="blok in headerMenu" :key="blok._uid">
              <NuxtLink
                  :to="`/${blok.link.story.url}`"
                  class="block text-weathered-basalt hover:text-molten-amber text-lg py-2"
                  @click="closeMobileMenu"
              >
                {{ blok.link.story.name }}
              </NuxtLink>
            </li>
            <li class="py-2"><hr class="border-volcanic-red"></li>
            <li v-for="blok in headerMenuIcons" :key="blok._uid">
              <NuxtLink
                :href="blok.link.url"
                class="flex items-center text-weathered-basalt hover:text-molten-amber text-lg py-2"
                @click="closeMobileMenu"
              >
                <Icon :name="blok.icon" class="w-6 h-6 mr-1" /> {{ blok.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>


  </header>
</template>

<style scoped>
nav a.router-link-active {
  @apply underline underline-offset-4 decoration-4 decoration-zh-green;
}
</style>
