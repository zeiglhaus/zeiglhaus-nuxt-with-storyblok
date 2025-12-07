<script setup>
const { blok } = defineProps({ 
  blok: { 
    type: Object, 
    required: true 
  } 
})

const resolvedFooterText = computed(() => renderRichText(blok.footer_text))

// Format the date for display
const formattedDate = computed(() => {
  if (!blok.date) return '';
  const date = new Date(blok.date);
  return date.toLocaleDateString('de-DE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
})

// Split menu items by newline and filter out empty lines
const menuItemsList = computed(() => {
  if (!blok.menu_items) return [];
  return blok.menu_items.split('\n').filter(item => item.trim() !== '');
})
</script>

<template>
  <div
      v-editable="blok"
      class="container mx-auto my-12 card">
    <div class="p-4">
      <!-- Date display -->
      
      <!-- Headline -->
      <h2 v-if="blok.headline" class="text-2xl font-bold text-zh-green mb-6">
        {{ blok.headline }}
      </h2>

      <h3 v-if="blok.date" class="mb-4">
        {{ formattedDate }}
      </h3>
      
      <!-- Menu items -->
      <div v-if="menuItemsList.length > 0" class="mb-8 prose text-black">
        <ul class="space-y-3">
          <li 
            v-for="(item, index) in menuItemsList" 
            :key="index"
          >
            <span class="font-medium text-black">{{ item }}</span>
          </li>
        </ul>
      </div>
      
      <!-- Footer text -->
      <p v-if="resolvedFooterText" class="prose" v-html="resolvedFooterText"/>
    </div>
  </div>
</template>
