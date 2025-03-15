<script setup lang="ts">
import { EyeIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid'

defineProps<{
  stocks: {
    Action: string
    Brokerage: string
    Company: string
    RatingTo: string
    Recommended: boolean
    TargetFrom: string
    TargetTo: string
    Ticker: string
    Time: string
    Transactions:
      | {
          Amount: number
          ID: string
          Ticker: string
        }[]
      | null
  }[]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-[rgb(1,2,46)] text-white">
          <th class="p-3 text-left">Ticker</th>
          <th class="p-3 text-left">Target From</th>
          <th class="p-3 text-left">Target To</th>
          <th class="p-3 text-left">Company</th>
          <th class="p-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="stock in stocks"
          :key="stock.Ticker"
          :class="stock.Recommended ? 'bg-blue-100' : 'bg-red-100'"
          class="border-b border-gray-300 text-[rgb(1,2,46)]"
        >
          <td class="p-3">{{ stock.Ticker }}</td>
          <td class="p-3">{{ stock.TargetFrom }}</td>
          <td class="p-3">{{ stock.TargetTo }}</td>
          <td class="p-3">{{ stock.Company }}</td>
          <td class="p-3 flex justify-center gap-4">
            <RouterLink
              :to="`/stock/detail/${stock.Ticker}`"
              class="text-blue-600 hover:text-blue-800"
            >
              <EyeIcon class="h-6 w-6" />
            </RouterLink>
            <button class="text-green-600 hover:text-green-800">
              <ShoppingCartIcon class="h-6 w-6" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
