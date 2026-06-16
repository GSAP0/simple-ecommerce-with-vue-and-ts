<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { items, total } = storeToRefs(cart)
</script>

<template>
  <section>
    <h1>Cart</h1>
    <p v-if="!items.length">Your cart is empty.</p>
    <template v-else>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} × {{ item.quantity }} — {{ item.price * item.quantity }}
          <button type="button" @click="cart.removeItem(item.id)">Remove</button>
        </li>
      </ul>
      <p><strong>Total: {{ total }}</strong></p>
    </template>
  </section>
</template>
