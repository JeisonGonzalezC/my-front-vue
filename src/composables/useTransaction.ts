import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

export function useTransaction() {
  const transactionStore = useTransactionStore()
  const showModal = ref(false)
  const selectedTicker = ref<string | null>(null)

  const openModal = (ticker: string) => {
    selectedTicker.value = ticker
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    selectedTicker.value = null
  }

  const confirmTransaction = async (amount: number | null) => {
    if (!amount || amount <= 0) {
      alert('Ingrese un monto válido.')
      return
    }

    await transactionStore.fetchTransaction({
      ticker: selectedTicker.value as string,
      amount,
    })

    closeModal()
  }

  return {
    transactionStore,
    showModal,
    selectedTicker,
    openModal,
    closeModal,
    confirmTransaction,
  }
}
