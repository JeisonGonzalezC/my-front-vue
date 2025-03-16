<script setup lang="ts">
import { toRef } from 'vue'
import { ref, watch } from 'vue'

const props = defineProps<{
  showModal: boolean
  ticker: string | null
  closeModal: () => void
  confirmTransaction: (amount: number | null) => void
}>()

const transactionAmount = ref<number | null>(null)

const showModalRef = toRef(props, 'showModal')

watch(showModalRef, (newValue) => {
  if (!newValue) transactionAmount.value = null
})
</script>

<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-semibold mb-4">Nueva Transacción</h2>

      <p class="mb-2"><strong>Ticker:</strong> {{ ticker }}</p>

      <label class="block mb-2">Monto de Compra:</label>
      <input
        type="number"
        v-model="transactionAmount"
        class="w-full p-2 border rounded"
        placeholder="Ingrese el monto"
      />

      <div class="flex justify-end gap-3 mt-4">
        <button @click="closeModal" class="px-4 py-2 bg-gray-400 text-white rounded-lg">
          Cancelar
        </button>
        <button
          @click="confirmTransaction(transactionAmount)"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>
