import { defineStore } from 'pinia'
import api from '@/services/api'

export const useStockStore = defineStore('stockStore', {
  state: () => ({
    stocks: { Items: [], NextPage: '' } as Stocks,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchStocks(nextPage: string | null = null) {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/stocks', {
          params: nextPage ? { nextPage } : {},
        })
        this.stocks = response.data
      } catch (error) {
        this.error = 'An error occurred while fetching stocks'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})

interface Transaction {
  Amount: number
  ID: string
  Ticker: string
}

interface Stock {
  Action: string
  Brokerage: string
  Company: string
  RatingFrom: string
  RatingTo: string
  Recommended: boolean
  TargetFrom: string
  TargetTo: string
  Ticker: string
  Time: string
  Transactions: Transaction[] | null
}

export interface Stocks {
  Items: Stock[]
  NextPage: string
}
