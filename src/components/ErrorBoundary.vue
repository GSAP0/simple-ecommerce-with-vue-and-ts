<script setup lang="ts">
import { ref, onErrorCaptured, watch } from 'vue'
import { useRoute } from 'vue-router'
import ErrorView from '@/views/ErrorView.vue'
import { isAppError, type AppError } from '@/lib/error'

const route = useRoute()
const error = ref<AppError | Error | null>(null)

onErrorCaptured((err) => {
  error.value = err
  return false
})

watch(
  () => route.fullPath,
  () => {
    error.value = null
  },
)
</script>

<template>
  <ErrorView
    v-if="error"
    :status-code="isAppError(error) ? error.statusCode : 500"
    :message="isAppError(error) ? error.message : undefined"
  />
  <slot v-else />
</template>
