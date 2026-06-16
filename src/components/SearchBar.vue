<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  routeName: string
  placeholder?: string
}>()

const route = useRoute()
const router = useRouter()

const term = ref((route.query.q as string) || '')

function submit() {
  router.push({
    name: props.routeName,
    query: { ...route.query, q: term.value.trim() || undefined, page: undefined },
  })
}

function clear() {
  term.value = ''
  router.push({ name: props.routeName, query: { ...route.query, q: undefined, page: undefined } })
}
</script>

<template>
  <form class="search" @submit.prevent="submit">
    <input v-model="term" type="search" :placeholder="placeholder ?? 'Search…'" />
    <button type="submit">Search</button>
    <button v-if="route.query.q" type="button" class="btn-secondary" @click="clear">Clear</button>
  </form>
</template>
