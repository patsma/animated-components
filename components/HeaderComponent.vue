<template>
  <!-- Fixed header with blur effect and semi-transparent background -->
  <div class="fixed w-full top-0 z-50 px-6 py-4 backdrop-blur-sm bg-white/70 dark:bg-black/70">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Left: Name and role -->
      <div class="flex flex-col">
        <h1 class="text-lg font-medium">Morten Christensen</h1>
        <span class="text-sm text-gray-500">UX/UI designer</span>
      </div>

      <!-- Center: Navigation -->
      <nav class="flex items-center gap-8">
        <NuxtLink to="/work" class="hover:text-gray-900 transition-colors">Work</NuxtLink>
        <NuxtLink to="/about" class="hover:text-gray-900 transition-colors">About</NuxtLink>
        
        <!-- Theme toggle button -->
        <button 
          @click="toggleColorMode"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle color mode"
        >
          <Icon
            :name="colorMode.value === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'"
            class="w-5 h-5"
          />
        </button>

        <NuxtLink to="/lab" class="hover:text-gray-900 transition-colors">Lab</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-gray-900 transition-colors">Contact</NuxtLink>
      </nav>

      <!-- Right: Location and time -->
      <div class="text-right">
        <div class="text-sm text-gray-500">Tokyo, JP</div>
        <div class="text-xs text-gray-400">{{ localTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const colorMode = useColorMode()

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
let timeInterval: NodeJS.Timer

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 60000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script> 