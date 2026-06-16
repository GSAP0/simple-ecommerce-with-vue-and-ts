<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { showToast } from '@/lib/toast'
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

const cart = useCartStore()

function addToCart() {
  cart.addItem(props.product)
  showToast(`Το προϊόν "${props.product.name}" προστέθηκε στο καλάθι`)
}
</script>

<template>
  <div class="card">
    <RouterLink :to="{ name: 'product', params: { slug: product.slug } }" class="card-link">
      <img v-if="product.image" :src="product.image" :alt="product.name" loading="lazy" />
      <p v-if="product.category" class="muted">{{ product.category.name }}</p>
      <h3>{{ product.name }}</h3>
      <p class="price">{{ product.price.toFixed(2) }} €</p>
    </RouterLink>
    <button type="button" class="card-add" @click="addToCart">Add to cart</button>
  </div>
</template>
