<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ChartBarIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <header class="p-6 bg-blue-100 text-[rgb(1,2,46)] flex flex-col items-center shadow-md w-full">
      <ChartBarIcon class="h-12 w-12 text-blue-600" />

      <div class="bg-blue-600 rounded-lg p-4 w-full max-w-xl shadow-lg">
        <nav class="grid grid-cols-2 gap-3">
          <RouterLink to="/" class="card">Inicio</RouterLink>
          <RouterLink to="/stocks" class="card">Stocks</RouterLink>
        </nav>
      </div>
    </header>

    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply bg-blue-600 text-white p-4 rounded-lg text-center font-semibold shadow-md transition-transform
         hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white;
}
</style>
