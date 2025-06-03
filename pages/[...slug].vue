<script setup>
const { params } = useRoute();
const { slug } = params;

const url = slug && slug.length > 0 ? slug.join('/') : 'home'
const isPreview = useRuntimeConfig().public.NODE_ENV !== 'production'
const resolveRelations = ['popular-articles.articles'];

const story = await useAsyncStoryblok(url, {
  version: isPreview ? 'draft' : 'published',
  resolve_relations: resolveRelations
}, {
  resolveRelations
})

if (!isPreview) {
  if (!story.value) {
    showError({ statusCode: 404, statusMessage: "Page Not Found" })
  }
}

onMounted(() => {
  if (isPreview && story.value && story.value.id) {
    useStoryblokBridge(
        story.value.id,
        (evStory) => story.value = evStory,
        {
          resolveRelations,
        }
    )
  }
})
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>