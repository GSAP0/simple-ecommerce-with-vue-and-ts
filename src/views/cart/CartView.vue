<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { items, total } = storeToRefs(cart)
</script>

<template>
  <section>
    <h1>Cart</h1>
    <p v-if="!items.length" class="muted">Your cart is empty.</p>
    <template v-else>
      <TransitionGroup name="cart">
        <div v-for="item in items" :key="item.id" class="cart-row">
          <img v-if="item.image" :src="item.image" :alt="item.name" />
          <span style="flex: 1">{{ item.name }}</span>
          <span class="qty">
            <button type="button" class="btn-secondary" @click="cart.updateQuantity(item.id, item.quantity - 1)">−</button>
            <span>{{ item.quantity }}</span>
            <button type="button" class="btn-secondary" @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
          </span>
          <span class="price">{{ (item.price * item.quantity).toFixed(2) }} €</span>
          <button type="button" class="btn-secondary" @click="cart.removeItem(item.id)">Remove</button>
        </div>
      </TransitionGroup>
      <p style="margin-top: 16px"><strong>Total: {{ total.toFixed(2) }} €</strong></p>
    </template>
  </section>
</template>
