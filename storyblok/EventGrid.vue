<template>
  <div v-editable="blok" class="container mx-auto card">
    <div v-for="yearData in eventsByYearAndMonth" :key="yearData.yearKey" class="mb-8 mx-6">
      <h2 class="text-6xl font-bold mb-4 text-volcanic-red pb-4 border-b border-volcanic-red">{{ yearData.yearKey }}</h2>
      <section class="px-4">
        <div v-for="monthData in yearData.months" :key="monthData.monthKey" class="mb-6">
          <h2 class="text-2xl font-semibold mb-2" :class="{ 'text-gray-500': monthData.isOld }">{{ getGermanMonthName(monthData.monthKey) }}</h2>
          <div class="space-y-2 bg-deep-basalt/5 p-2 border-l-2 border-deep-basalt ml-3 pl-3 rounded-r-lg">
            <StoryblokComponent
                v-for="event in monthData.events"
                :key="event._uid"
                :blok="event"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })

const germanMonths = {
  0: 'Januar',
  1: 'Februar', 
  2: 'März',
  3: 'April',
  4: 'Mai',
  5: 'Juni',
  6: 'Juli',
  7: 'August',
  8: 'September',
  9: 'Oktober',
  10: 'November',
  11: 'Dezember'
}

const eventsByYearAndMonth = computed(() => {
  if (!props.blok?.events) return {}
  
  const grouped = {}

  // categorizing
  props.blok.events.forEach(event => {
    const date = new Date(event.date || 0)
    const year = date.getFullYear()
    const month = date.getMonth()
    
    if (!grouped[year]) {
      grouped[year] = {}
    }
    if (!grouped[year][month]) {
      grouped[year][month] = []
    }
    grouped[year][month].push(event)
  })

  // sorting
  const sortedYearsArr = []
  Object.keys(grouped)
      .toSorted((a, b) => Number(b) - Number(a))
      .forEach((yearKey) => {
    const sortedMonthsWithinYearArr = [];

    // sort months and add to array
    Object.keys(grouped[yearKey])
        .toSorted((a, b) => Number(b) - Number(a))
        .forEach(monthKey => {
      sortedMonthsWithinYearArr.push({
        monthKey,
        events: grouped[yearKey][monthKey].sort((a, b) => {
          const dateA = new Date(a.date || 0)
          const dateB = new Date(b.date || 0)
          return dateA - dateB
        })
      })
    })

    // add sorted months to their year
    sortedYearsArr.push({
      yearKey,
      months: sortedMonthsWithinYearArr
    })
  })

  // enriching
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  
  for (const yearData of sortedYearsArr) {
    // set yearData.isOld
    yearData.isOld = Number(yearData.yearKey) < currentYear
    
    for (const monthData of yearData.months) {
      // set monthData.isOld
      const monthYear = Number(yearData.yearKey)
      const month = Number(monthData.monthKey)
      monthData.isOld = monthYear < currentYear || (monthYear === currentYear && month < currentMonth)
    }
  }

  return sortedYearsArr
})

const getGermanMonthName = (month) => {
  return germanMonths[Number(month)]
}
</script>