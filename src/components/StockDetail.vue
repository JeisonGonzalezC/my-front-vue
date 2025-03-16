<script setup lang="ts">
import { useTransaction } from '@/composables/useTransaction'
import StockModal from './StockModal.vue'

defineProps<{
  stockDetail: {
    Ticker: string
    Action: string
    Brokerage: string
    RatingFrom: string
    RatingTo: string
    Transactions:
      | {
          Amount: number
          ID: string
          Ticker: string
        }[]
      | null
  }
}>()

const sumTotalTransactions = (transactions: { Amount: number }[]) => {
  return transactions.reduce((acc, transaction) => acc + transaction.Amount, 0)
}

const { showModal, selectedTicker, openModal, closeModal, confirmTransaction, transactionStore } =
  useTransaction()
</script>

<template>
  <p><strong>Acción:</strong> {{ stockDetail.Action }}</p>
  <p><strong>Brokerage:</strong> {{ stockDetail.Brokerage }}</p>
  <p><strong>Rating Desde:</strong> {{ stockDetail.RatingFrom }}</p>
  <p><strong>Rating Hasta:</strong> {{ stockDetail.RatingTo }}</p>
  <p><strong>Compras realizadas:</strong> {{ stockDetail.Transactions?.length }}</p>
  <p>
    <strong>Compras totales:</strong> ${{ sumTotalTransactions(stockDetail.Transactions || []) }}
  </p>

  <button
    class="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    @click="openModal(stockDetail.Ticker)"
  >
    Comprar
  </button>

  <!-- MODAL -->
  <StockModal
    v-if="!transactionStore.loading && !transactionStore.error"
    :showModal="showModal"
    :ticker="selectedTicker"
    :closeModal="closeModal"
    :confirmTransaction="confirmTransaction"
  />
  <p v-else-if="transactionStore.loading" class="text-blue-500">Cargando...</p>
  <p v-else class="text-red-500">{{ transactionStore.error }}</p>
</template>
