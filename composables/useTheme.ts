import { ref, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

// Define theme interface
export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  text: string
  muted: string
}

// Theme tokens
export const lightTheme: ThemeColors = {
  primary: 'var(--color-primary-600)',
  secondary: 'var(--color-secondary-600)',
  background: 'var(--color-neutral-50)',
  text: 'var(--color-neutral-900)',
  muted: 'var(--color-neutral-500)'
}

export const darkTheme: ThemeColors = {
  primary: 'var(--color-primary-400)',
  secondary: 'var(--color-secondary-400)',
  background: 'var(--color-neutral-900)',
  text: 'var(--color-neutral-50)',
  muted: 'var(--color-neutral-400)'
}

export const useTheme = () => {
  const colorMode = useColorMode()
  const currentTheme = ref<'light' | 'dark'>(colorMode.value === 'dark' ? 'dark' : 'light')
  
  // Toggle theme
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    colorMode.value = currentTheme.value
  }

  // Watch for system preference changes
  watch(colorMode, (newValue) => {
    currentTheme.value = newValue === 'dark' ? 'dark' : 'light'
  })

  return {
    currentTheme,
    toggleTheme,
    colors: currentTheme.value === 'light' ? lightTheme : darkTheme
  }
} 