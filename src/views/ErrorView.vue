<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    statusCode?: number
    title?: string
    message?: string
  }>(),
  { statusCode: 404 },
)

const heading = computed(
  () => props.title ?? (props.statusCode === 404 ? 'Page not found' : 'Something went wrong'),
)

const detail = computed(
  () =>
    props.message ??
    (props.statusCode === 404
      ? "The page you're looking for doesn't exist or has been moved."
      : 'An unexpected error occurred. Please try again.'),
)
</script>

<template>
  <section>
    <h1>{{ statusCode }} — {{ heading }}</h1>
    <p class="muted">{{ detail }}</p>
    <p><RouterLink to="/products">← Back to products</RouterLink></p>
  </section>
</template>
