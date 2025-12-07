export const useAuth = () => {
  const isAuthenticated = useState<boolean>('auth-status', () => {
    // Check sessionStorage on initialization
    if (process.client) {
      return sessionStorage.getItem('menu-auth') === 'true'
    }
    return false
  })

  const storedPassword = useState<string>('auth-password', () => {
    // Retrieve password from sessionStorage on initialization
    if (process.client) {
      return sessionStorage.getItem('menu-password') || ''
    }
    return ''
  })

  const error = useState<string>('auth-error', () => '')
  const loading = useState<boolean>('auth-loading', () => false)

  const validatePassword = async (password: string): Promise<boolean> => {
    loading.value = true
    error.value = ''

    try {
      const response = await $fetch<{ success: boolean }>('/api/auth/validate', {
        method: 'POST',
        body: { password }
      })

      if (response.success) {
        isAuthenticated.value = true
        storedPassword.value = password
        if (process.client) {
          sessionStorage.setItem('menu-auth', 'true')
          sessionStorage.setItem('menu-password', password)
        }
        return true
      } else {
        error.value = 'Falsches Passwort'
        return false
      }
    } catch (err) {
      error.value = 'Verbindungsfehler. Bitte versuchen Sie es erneut.'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    storedPassword.value = ''
    if (process.client) {
      sessionStorage.removeItem('menu-auth')
      sessionStorage.removeItem('menu-password')
    }
  }

  return {
    isAuthenticated,
    storedPassword,
    error,
    loading,
    validatePassword,
    logout
  }
}
