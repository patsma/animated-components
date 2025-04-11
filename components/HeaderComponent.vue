<template>
  <!-- Fixed header with blur effect and semi-transparent background -->
  <div 
  class="fixed w-full top-0 z-50 px-6 py-4 backdrop-blur-sm border-b transition-colors duration-200"
       :class="[
         currentTheme === 'dark' 
           ? 'bg-neutral-900/70 border-neutral-800' 
           : 'bg-white/70 border-neutral-200'
       ]">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Left: Name and role -->
      <div class="flex flex-col">
        <h1 class="text-lg font-medium" :class="currentTheme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'">
          Morten Christensen
        </h1>
        <span class="text-sm" :class="currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'">
          UX/UI designer
        </span>
      </div>

      <!-- Center: Navigation -->
      <nav class="flex items-center gap-8">
        <NuxtLink 
          v-for="item in ['Work', 'About', 'Lab', 'Contact']" 
          :key="item"
          :to="'/' + item.toLowerCase()"
          class="transition-colors duration-200"
          :class="[
            currentTheme === 'dark' 
              ? 'text-neutral-400 hover:text-neutral-50' 
              : 'text-neutral-600 hover:text-neutral-900'
          ]"
        >
          {{ item }}
        </NuxtLink>

        <!-- Theme toggle button -->
        <button 
        class="p-2 rounded-full transition-colors duration-200"
        :class="[
          currentTheme === 'dark'
          ? 'hover:bg-neutral-800 text-neutral-400 hover:text-neutral-50'
          : 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900'
        ]"
            aria-label="Toggle color mode"
          @click="toggleTheme"
        >
          <Icon
            :name="currentTheme === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'"
            class="w-5 h-5"
          />
        </button>
      </nav>

      <!-- Right: Location and time -->
      <div class="text-right">
        <div class="text-sm" :class="currentTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'">
          Tokyo, JP
        </div>
        <div class="text-xs" :class="currentTheme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'">
          {{ localTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '~/composables/useTheme'

const { currentTheme, toggleTheme } = useTheme()
const localTime = ref('')

// Format time in HH:mm format for Tokyo timezone
const updateTime = () => {
  const now = new Date()
  localTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Tokyo'
  })
}

// Update time every minute
let timeInterval: ReturnType<typeof setInterval>

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 60000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})
</script> 