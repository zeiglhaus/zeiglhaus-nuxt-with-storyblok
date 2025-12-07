<script setup lang="ts">
const { isAuthenticated, storedPassword, error: authError, loading: authLoading, validatePassword, logout } = useAuth()

// Form state
const password = ref('')
const menuText = ref('')
const menuDate = ref('')
const loading = ref(false)
const fetchLoading = ref(false)
const statusMessage = ref('')
const statusType = ref<'success' | 'error' | ''>('')
const hasUnsavedChanges = ref(false)

// Track original values to detect changes
const originalMenuText = ref('')
const originalMenuDate = ref('')

// Format date for German locale
const formatGermanDate = (dateString: string): string => {
  if (!dateString) return ''
  
  try {
    // Parse the date string "2025-12-09 00:00"
    const [datePart] = dateString.split(' ')
    const date = new Date(datePart)
    
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Convert date for date input
const convertToDateInput = (dateString: string): string => {
  if (!dateString) return ''
  
  try {
    const [datePart] = dateString.split(' ')
    return datePart
  } catch {
    return ''
  }
}

// Convert from date input to Storyblok format
const convertFromDateInput = (dateString: string): string => {
  if (!dateString) return ''
  
  try {
    return `${dateString} 00:00`
  } catch {
    return dateString
  }
}

// Computed formatted date for preview
const formattedDate = computed(() => {
  if (!menuDate.value) return ''
  const storyblokFormat = convertFromDateInput(menuDate.value)
  return formatGermanDate(storyblokFormat)
})

// Check for unsaved changes
watch([menuText, menuDate], () => {
  hasUnsavedChanges.value = 
    menuText.value !== originalMenuText.value || 
    convertFromDateInput(menuDate.value) !== originalMenuDate.value
})

// Fetch current menu data
const fetchCurrentMenu = async () => {
  fetchLoading.value = true
  statusMessage.value = ''
  
  try {
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories/speisekarte', {
      version: 'published'
    })
    
    if (data.story && data.story.content) {
      // Find MenuContentBox in the body array
      const menuBox = data.story.content.body?.find(
        (block: any) => block.component === 'MenuContentBox'
      )
      
      if (menuBox) {
        menuText.value = menuBox.menu_items || ''
        const dateValue = menuBox.date || ''
        menuDate.value = convertToDateInput(dateValue)
        
        // Store originals
        originalMenuText.value = menuText.value
        originalMenuDate.value = dateValue
        
        statusMessage.value = 'Aktuelles Menü geladen'
        statusType.value = 'success'
        
        setTimeout(() => {
          statusMessage.value = ''
          statusType.value = ''
        }, 3000)
      } else {
        statusMessage.value = 'MenuContentBox nicht gefunden'
        statusType.value = 'error'
      }
    }
  } catch (err) {
    statusMessage.value = 'Fehler beim Laden des Menüs'
    statusType.value = 'error'
  } finally {
    fetchLoading.value = false
  }
}

// Handle password submission
const handlePasswordSubmit = async () => {
  const success = await validatePassword(password.value)
  if (success) {
    password.value = ''
    await fetchCurrentMenu()
  }
}

// Handle save
const handleSave = async () => {
  if (!hasUnsavedChanges.value) {
    statusMessage.value = 'Keine Änderungen zum Speichern'
    statusType.value = 'error'
    return
  }
  
  if (!confirm('Möchten Sie die Änderungen wirklich speichern und veröffentlichen?')) {
    return
  }
  
  loading.value = true
  statusMessage.value = ''
  
  try {
    const response = await $fetch<{ success: boolean; message: string }>('/api/update-menu', {
      method: 'POST',
      body: {
        password: storedPassword.value,
        menu_text: menuText.value,
        date: convertFromDateInput(menuDate.value)
      }
    })
    
    if (response.success) {
      statusMessage.value = response.message
      statusType.value = 'success'
      hasUnsavedChanges.value = false
      
      // Update originals
      originalMenuText.value = menuText.value
      originalMenuDate.value = convertFromDateInput(menuDate.value)
    }
  } catch (err: any) {
    statusMessage.value = err.data?.message || 'Fehler beim Speichern'
    statusType.value = 'error'
  } finally {
    loading.value = false
  }
}

// Handle reset
const handleReset = () => {
  if (hasUnsavedChanges.value && !confirm('Möchten Sie alle Änderungen verwerfen?')) {
    return
  }
  
  menuText.value = originalMenuText.value
  menuDate.value = convertToDateInput(originalMenuDate.value)
  statusMessage.value = 'Änderungen zurückgesetzt'
  statusType.value = 'success'
  
  setTimeout(() => {
    statusMessage.value = ''
    statusType.value = ''
  }, 2000)
}

// Prevent navigation with unsaved changes
onBeforeRouteLeave((to, from, next) => {
  if (hasUnsavedChanges.value) {
    const answer = confirm('Sie haben ungespeicherte Änderungen. Möchten Sie die Seite wirklich verlassen?')
    next(answer)
  } else {
    next()
  }
})

// Page meta
definePageMeta({
  layout: false
})

useHead({
  title: 'Menü bearbeiten - Zeiglhaus Parkstein e.V.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Password Gate -->
    <div v-if="!isAuthenticated" class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Menü bearbeiten
          </h1>
          
          <form @submit.prevent="handlePasswordSubmit" class="space-y-4">
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Passwort eingeben"
                required
              />
            </div>
            
            <div v-if="authError" class="text-red-600 text-sm">
              {{ authError }}
            </div>
            
            <button
              type="submit"
              :disabled="authLoading"
              class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {{ authLoading ? 'Wird überprüft...' : 'Anmelden' }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Editor Interface -->
    <div v-else class="max-w-6xl mx-auto p-4 py-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Menü bearbeiten</h1>
          <button
            @click="logout"
            class="text-gray-600 hover:text-gray-900 text-sm underline"
          >
            Abmelden
          </button>
        </div>
      </div>

      <!-- Status Message -->
      <div
        v-if="statusMessage"
        :class="[
          'rounded-lg p-4 mb-6',
          statusType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        ]"
      >
        {{ statusMessage }}
      </div>

      <!-- Loading State -->
      <div v-if="fetchLoading" class="bg-white rounded-lg shadow-md p-12 text-center">
        <div class="text-gray-600">Lade aktuelles Menü...</div>
      </div>

      <!-- Edit Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left: Editor -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Editor</h2>
          
          <form @submit.prevent="handleSave" class="space-y-6">
            <!-- Date Picker -->
            <div>
              <label for="date" class="block text-sm font-medium text-gray-700 mb-2">
                Datum
              </label>
              <input
                id="date"
                v-model="menuDate"
                type="date"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <!-- Menu Text -->
            <div>
              <label for="menu-text" class="block text-sm font-medium text-gray-700 mb-2">
                Menütext
              </label>
              <textarea
                id="menu-text"
                v-model="menuText"
                rows="12"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Menütext eingeben..."
                required
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">
                Jede Zeile wird als separater Punkt angezeigt
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button
                type="submit"
                :disabled="loading || !hasUnsavedChanges"
                class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {{ loading ? 'Wird gespeichert...' : 'Speichern & Veröffentlichen' }}
              </button>
              
              <button
                type="button"
                @click="handleReset"
                :disabled="loading || !hasUnsavedChanges"
                class="px-6 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                Zurücksetzen
              </button>
            </div>

            <div v-if="hasUnsavedChanges" class="text-sm text-orange-600">
              ⚠️ Du hast ungespeicherte Änderungen
            </div>
          </form>
        </div>

        <!-- Right: Live Preview -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Vorschau</h2>
          
          <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <!-- Preview Date -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Datum:</h3>
              <div class="text-lg font-semibold text-gray-900">
                {{ formattedDate || 'Kein Datum ausgewählt' }}
              </div>
            </div>

            <!-- Preview Menu Text -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Menü:</h3>
              <div class="text-gray-900 leading-relaxed">
                <ul v-if="menuText.trim()" class="list-disc list-inside space-y-1">
                  <li v-for="(line, index) in menuText.split('\n').filter(line => line.trim())" :key="index">
                    {{ line.trim() }}
                  </li>
                </ul>
                <div v-else class="text-gray-500">
                  Kein Menütext eingegeben
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 text-xs text-gray-500">
            Die Vorschau aktualisiert sich automatisch beim Tippen
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
