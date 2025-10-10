<script setup>
defineProps({ 
  blok: { 
    type: Object, 
    default: () => ({}) 
  } 
})

const isPreview = useRuntimeConfig().public.NODE_ENV !== 'production'

const story = await useAsyncStoryblok('termine', {
  version: isPreview ? 'draft' : 'published'
}, {})

console.log(story)

const events = computed(() => story.value.content.body.find(blok => blok.component === 'event-grid')?.events)

const nextThreeEvents = computed(() => {
  if (!events.value) return []
  
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)

  return events.value
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)
    .map((event) => ({
      ...event,
      formatted_date: new Date(event.date).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      short_date: new Date(event.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric' })
    }))
})
</script>

<template>
  <div v-editable="blok" class="container mx-auto my-12 card">
    <h2 class="text-zh-green mb-4 flex items-center gap-2">
      <Icon name="mdi:calendar" />
      {{ blok.title }}
    </h2>
<div class="grid grid-cols-2 lg:flex gap-x-4 gap-y-6 flex-wrap">
      <NuxtLink
v-for="event in nextThreeEvents"
                :key="event._uid"
                :to="`/${story.full_slug}`"
                class="grow shrink card p-3 flex basis-20 gap-x-4 bg-white hover:text-iron-basalt group border-1 border-weathered-basalt hover:shadow-md">
        <div>
          <h3
              class="text-2xl p-1 py-0.5 border rounded-md bg-volcanic-red/5 text-volcanic-red border-volcanic-red/30">
            {{ event.short_date }}
          </h3>
        </div>
        <div class="flex-grow">
          <h3>{{ event.title }}</h3>
          <p class="text-gray-600 mt-2 group-hover:text-iron-basalt">am {{ event.formatted_date }}</p>
        </div>
      </NuxtLink>
      <div class="flex basis-20 md:basis-0 grow lg:grow-0 shrink flex-col justify-center place-items-center">
        <NuxtLink href="/termine" class="text-zh-green hover:underline whitespace-nowrap">
          <Icon name="mdi:page-next" class="align-text-bottom text-xl" /> Alle Termine
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
