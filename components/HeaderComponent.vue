<template>
  <!-- Fixed header with blur effect and semi-transparent background -->
  <div
    class="theme-bg theme-border fixed top-0 z-50 w-full border-b px-6 py-4 backdrop-blur-sm transition-colors duration-200"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <!-- Left: Name and role -->
      <div class="flex flex-col">
        <h1 class="theme-text-primary text-lg font-medium">Morten Christensen</h1>
        <span class="theme-text-muted text-sm"> UX/UI designer </span>
      </div>

      <!-- Center: Navigation -->
      <nav class="flex items-center gap-8">
        <!-- First two nav items -->
        <NuxtLink
          v-for="item in ['Work', 'About']"
          :key="item"
          :to="'/' + item.toLowerCase()"
          class="theme-text-nav transition-colors duration-200"
        >
          {{ item }}
        </NuxtLink>

        <!-- Theme toggle button -->
        <button
          class="theme-text-nav theme-hover-bg rounded-full p-2 transition-colors duration-200"
          aria-label="Toggle color mode"
          @click="toggleTheme"
        >
          <Icon :name="currentTheme === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'" class="h-5 w-5" />
        </button>

        <!-- Last two nav items -->
        <NuxtLink
          v-for="item in ['Lab', 'Contact']"
          :key="item"
          :to="'/' + item.toLowerCase()"
          class="theme-text-nav transition-colors duration-200"
        >
          {{ item }}
        </NuxtLink>
      </nav>

      <!-- Right: Location and time -->
      <div class="text-right">
        <div class="theme-text-muted text-sm">Tokyo, JP</div>
        <div class="theme-text-subtle text-xs">
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
