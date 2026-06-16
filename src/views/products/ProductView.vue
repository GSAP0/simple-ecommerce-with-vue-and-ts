<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { showBySlug } from '@/api/products'
import { useCartStore } from '@/stores/cart'
import { showToast } from '@/lib/toast'

const route = useRoute()
const cart = useCartStore()

const product = await showBySlug(route.params.slug as string)

function addToCart() {
  cart.addItem(product)
  showToast(`Το προϊόν "${product.name}" προστέθηκε στο καλάθι`)
}
</script>

<template>
  <section>
    <p><RouterLink to="/products">← Back to products</RouterLink></p>

    <div class="product">
      <div>
        <img v-if="product.image" :src="product.image" :alt="product.name" />
      </div>

      <div>
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price.toFixed(2) }} €</p>

        <p v-if="product.description">{{ product.description }}</p>

        <p v-if="product.category" class="muted">
          Category:
          <RouterLink :to="{ name: 'category', params: { slug: product.category.slug } }">
            {{ product.category.name }}
          </RouterLink>
        </p>

        <p><button type="button" @click="addToCart">Add to cart</button></p>
      </div>
    </div>
  </section>
</template>
