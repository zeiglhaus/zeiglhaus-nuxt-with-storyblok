<script setup>
const props = defineProps({ blok: Object })

const date = computed(() => {
  if (!props.blok.date) return null;
  
  const dateObj = new Date(props.blok.date);
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate(),
    full: dateObj
  };
});

const oldTextColorClass = computed(() => {
  if (!props.blok.date) return '';
  return new Date(props.blok.date) <= Date.now() ? 'text-basalt-highlight' : '';
})

const isOld = computed(() => {
  if (!props.blok.date) return false;
  return new Date(props.blok.date) <= Date.now();
})

const isSoon = computed(() => {
  if (!props.blok.date) return false;
  const eventDate = new Date(props.blok.date);
  const now = new Date();
  const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  return eventDate > now && eventDate <= twoWeeksFromNow;
})

const resolvedRichDescription = computed(() => renderRichText(props.blok.description))
</script>
<template>
<div v-editable="blok" class="w-full flex justify-stretch space-x-3" :class="[oldTextColorClass]">
  <div class="w-20 min-w-20 max-w-20">
    <h3
class="text-4xl text-center p-2 border rounded-lg bg-white"
        :class="[{'text-volcanic-red border-weathered-basalt': !isOld}, { 'border-basalt-highlight text-basalt-highlight': isOld }]">
      {{ date.day }}
    </h3>
  </div>
  <div class="grow">
    <div class="flex justify-start flex-wrap place-items-baseline gap-x-2">
      <h3 class="font-normal">{{ blok.title }}</h3>
      <div class="text-sm text-iron-basalt">{{ date.day }}.{{ date.month }}.{{ date.year }}</div>
      <div v-if="isSoon" class="px-2 text-sm rounded-full bg-molten-amber text-white">Bald!</div>
    </div>
    <div>
      <span class="text-md font-bold" :class="{'text-volcanic-red': !isOld, 'text-basalt-highlight': isOld}">{{ blok.time }}</span>
    </div>
    <div class="prose" v-html="resolvedRichDescription"/>
  </div>
</div>
</template>