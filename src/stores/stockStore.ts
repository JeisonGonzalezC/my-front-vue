import { defineStore } from 'pinia'
import api from '@/services/api'
import type { ITransaction } from './transactionStore'

interface IFetchStocks {
  nextPage?: string | null
  isNext?: boolean
  isBefore?: boolean
}

export const useStockStore = defineStore('stockStore', {
  state: () => ({
    stocks: { Items: [], BeforePages: [], CurrentPage: '', NextPage: '' } as IStocks,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchStocks(params: IFetchStocks) {
      const { nextPage = '', isNext = false, isBefore = false } = params ?? {}

      this.loading = true
      this.error = null

      try {
        const response = await api.get('/stocks', {
          params: nextPage ? { nextPage } : {},
        })

        if (isNext) {
          this.handleNextPage(response.data, nextPage)
        } else if (isBefore) {
          this.handleBeforePage(response.data, nextPage)
        } else {
          this.stocks = {
            ...response.data,
            BeforePages: this.stocks.BeforePages,
            CurrentPage: this.stocks.CurrentPage,
          }
        }
      } catch (error) {
        this.error = 'An error occurred while fetching stocks'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    handleNextPage(data: IStocks, nextPage: string | null) {
      if (!nextPage) return

      this.stocks = {
        ...data,
        BeforePages: [...this.stocks.BeforePages, this.stocks.CurrentPage],
        CurrentPage: nextPage,
      }
    },
    handleBeforePage(data: IStocks, nextPage: string | null) {
      if (nextPage === null) return

      this.stocks = {
        ...data,
        CurrentPage: nextPage,
        BeforePages: this.stocks.BeforePages.slice(0, -1),
      }
    },
  },
})

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
  Transactions: ITransaction[] | null
}

interface IStocks {
  Items: Stock[]
  BeforePages: string[]
  CurrentPage: string
  NextPage: string
}
