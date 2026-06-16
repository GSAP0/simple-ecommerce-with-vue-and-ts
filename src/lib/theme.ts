import { watchEffect } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export type Theme = 'light' | 'dark'

// persisted to localStorage by VueUse; defaults to light on first visit
const theme = useLocalStorage<Theme>('theme', 'light')

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
