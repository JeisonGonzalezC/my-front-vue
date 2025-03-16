<script setup lang="ts">
import { onMounted } from 'vue'
import StockTable from '../components/StockTable.vue'
import { useStockStore } from '@/stores/stockStore'

const stockStore = useStockStore()

// Load stocks when the component is mounted
onMounted(() => {
  if (!stockStore.stocks.Items || stockStore.stocks.Items.length === 0) {
    stockStore.fetchStocks({})
  }
})

const loadBeforePage = async () => {
  await stockStore.fetchStocks({
    nextPage: stockStore.stocks.BeforePages[stockStore.stocks.BeforePages.length - 1],
    isBefore: true,
  })
}

const loadNextPage = async () => {
  await stockStore.fetchStocks({
    nextPage: stockStore.stocks.NextPage,
    isNext: true,
  })
}
</script>

<template>
  <div class="p-6">
    <div class="mb-4 p-4 bg-gray-100 rounded-lg">
      <p class="text-lg font-semibold text-[rgb(1,2,46)]">Indicadores:</p>
      <div class="flex items-center mt-2">
        <span class="w-4 h-4 bg-blue-500 rounded-full inline-block mr-2"></span>
        <span class="text-sm">Recomendado para comprar</span>
      </div>
      <div class="flex items-center mt-2">
        <span class="w-4 h-4 bg-red-500 rounded-full inline-block mr-2"></span>
        <span class="text-sm">No recomendado para comprar</span>
      </div>
    </div>

    <StockTable :stocks="stockStore.stocks.Items" v-if="!stockStore.loading && !stockStore.error" />
    <p v-else-if="stockStore.loading" class="text-blue-500">Cargando...</p>
    <p v-else class="text-red-500">{{ stockStore.error }}</p>

    <div class="flex justify-between mt-4" v-if="!stockStore.loading && !stockStore.error">
      <button
        class="px-4 py-2 text-white rounded-lg transition"
        :class="{
          'bg-blue-600 hover:bg-blue-700 cursor-pointer': stockStore.stocks.BeforePages.length > 0,
          'bg-gray-400 cursor-not-allowed opacity-50': stockStore.stocks.BeforePages.length === 0,
        }"
        :disabled="stockStore.stocks.BeforePages.length === 0"
        @click="loadBeforePage"
      >
        Anterior
      </button>

      <button
        class="px-4 py-2 text-white rounded-lg transition"
        :class="{
          'bg-blue-600 hover:bg-blue-700 cursor-pointer': stockStore.stocks.NextPage,
          'bg-gray-400 cursor-not-allowed opacity-50': !stockStore.stocks.NextPage,
        }"
        :disabled="!stockStore.stocks.NextPage"
        @click="loadNextPage"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>
