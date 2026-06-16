<script setup lang="ts">
import { useToasts } from '@/lib/toast'

const { toasts } = useToasts()
</script>

<template>
  <TransitionGroup tag="div" name="toast" class="toast-host">
    <div v-for="toast in toasts" :key="toast.id" class="toast">
      {{ toast.message }}
    </div>
  </TransitionGroup>
</template>
