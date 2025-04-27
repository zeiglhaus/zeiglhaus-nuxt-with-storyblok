<script setup>
const { params } = useRoute();
const { slug } = params;

const story = await useAsyncStoryblok(slug && slug.length > 0 ? slug.join('/') : 'home', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>