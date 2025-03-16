import { defineStore } from 'pinia'
import api from '@/services/api'

export const useTransactionStore = defineStore('transactionStore', {
  state: () => ({
    transaction: { Amount: 0, ID: '', Ticker: '' } as ITransaction,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTransaction(params: ITransactionRequest) {
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/transaction', params)
        this.transaction = response.data
      } catch (error) {
        this.error = 'An error occurred while fetching transactions'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})

interface ITransactionRequest {
  ticker: string
  amount: number
}

export interface ITransaction {
  Amount: number
  ID: string
  Ticker: string
}
