<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Category } from '@/types'

defineProps<{
  category: Category
}>()
</script>

<template>
  <RouterLink :to="{ name: 'category', params: { slug: category.slug } }" class="card">
    <img v-if="category.image" :src="category.image" :alt="category.name" loading="lazy" />
    <h3>{{ category.name }}</h3>
  </RouterLink>
</template>
