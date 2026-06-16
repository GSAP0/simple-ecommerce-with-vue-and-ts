import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
}

const toasts = ref<Toast[]>([])
let counter = 0

export function useToasts() {
  return { toasts }
}

export function showToast(message: string, duration = 2500) {
  const id = ++counter
  toasts.value.push({ id, message })
  setTimeout(() => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }, duration)
}
