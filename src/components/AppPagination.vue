<script setup lang="ts">
import { RouterLink, useRoute, type RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  page: number
  pages: number
}>()

const route = useRoute()

function linkTo(target: number): RouteLocationRaw {
  return {
    name: route.name ?? undefined,
    params: route.params,
    query: { ...route.query, page: target },
  }
}
</script>

<template>
  <nav v-if="pages > 1" class="pagination">
    <RouterLink v-if="page > 1" :to="linkTo(page - 1)">← Prev</RouterLink>
    <span v-else class="muted">← Prev</span>

    <span class="muted">Page {{ page }} of {{ pages }}</span>

    <RouterLink v-if="page < pages" :to="linkTo(page + 1)">Next →</RouterLink>
    <span v-else class="muted">Next →</span>
  </nav>
</template>
