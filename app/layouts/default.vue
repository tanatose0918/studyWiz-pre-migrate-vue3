<script setup lang="ts">
import { ref } from 'vue';
import TheTopBar from '~/components/layout/TheTopBar.vue';
import TheNavbar from '~/components/layout/TheNavbar.vue';
import TheMobileDrawer from '~/components/layout/TheMobileDrawer.vue';
import TheFooter from '~/components/layout/TheFooter.vue';
import FloatingContactSpeedDial from '~/components/layout/FloatingContactSpeedDial.vue';

const isDrawerOpen = ref(false);
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
    <!-- Top Bar with phone, email, socials -->
    <TheTopBar />

    <!-- Main Navigation Bar -->
    <TheNavbar @toggle-drawer="isDrawerOpen = true" />

    <!-- Mobile Drawer -->
    <TheMobileDrawer 
      :is-open="isDrawerOpen" 
      @close="isDrawerOpen = false" 
    />

    <!-- Main Content Slot -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Global Footer -->
    <TheFooter />

    <!-- Floating Speed Dial Contact -->
    <FloatingContactSpeedDial />
  </div>
</template>
