<script setup>
defineProps({ 
  article: { 
    type: Object, 
    default: () => ({}) 
  }, 
  slug: { 
    type: String, 
    default: '' 
  } 
})
</script>

<template>
  <NuxtLink
      v-editable="article"
      :to="'/' + slug"
      class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"
  >
    <NuxtImg
        :src="article.image.filename"
        :alt="article.image.alt"
        class="w-full h-48 xl:h-72 object-cover pointer-events-none"
        width="600"
        height="288"
    />
    <div class="p-4">
      <h3 class="text-xl text-[#1d243d] font-bold mb-3">
        {{ article.title }}
      </h3>
      <div class="line-clamp-4">
        {{ article.teaser }}
      </div>
    </div>
  </NuxtLink>
</template>
