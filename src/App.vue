<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import NavMenu from '@/components/NavMenu.vue'
import ToastHost from '@/components/ToastHost.vue'
import { useTheme } from '@/lib/theme'

const route = useRoute()
const { theme, toggle } = useTheme()
</script>

<template>
  <header class="site-header">
    <div class="container">
      <div class="header-left">
        <button
          type="button"
          class="theme-toggle btn-secondary"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggle"
        >
          {{ theme === 'dark' ? '☀' : '🌙' }}
        </button>
        <RouterLink to="/" class="brand">Infiterra</RouterLink>
      </div>
      <NavMenu />
    </div>
  </header>

  <main>
    <div class="container">
      <ErrorBoundary>
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <Suspense v-if="Component">
              <component :is="Component" :key="route.fullPath" />
              <template #fallback>
                <p class="muted">Loading…</p>
              </template>
            </Suspense>
          </Transition>
        </RouterView>
      </ErrorBoundary>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <span>© 2026 Infiterra</span>
      <span>Built with Vue</span>
    </div>
  </footer>

  <ToastHost />
</template>
