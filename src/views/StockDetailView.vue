<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStockStore } from '@/stores/stockStore'
import StockDetail from '../components/StockDetail.vue'

const route = useRoute()
const ticker = route.params.ticker as string

const stockStore = useStockStore()
const loading = ref<boolean>(true)

watchEffect(() => {
  if (stockStore.stocks.Items?.length) {
    loading.value = false
  }
})

const stockDetail = computed(() => stockStore.stocks.Items.find((stock) => stock.Ticker === ticker))
</script>

<template>
  <div class="p-6 text-[rgb(1,2,46)]">
    <h1 class="text-3xl font-bold mb-4">Detalle del Stock: {{ ticker }}</h1>

    <div v-if="loading" class="text-blue-500">Cargando datos...</div>

    <div v-else-if="stockDetail" class="p-6 bg-gray-100 rounded-lg shadow-md">
      <button
        @click="$router.push({ path: '/stocks' })"
        class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        ⬅ Regresar
      </button>

      <StockDetail :stockDetail="{ ...stockDetail }" />
    </div>
    <div v-else class="text-red-500">Stock no encontrado</div>
  </div>
</template>
