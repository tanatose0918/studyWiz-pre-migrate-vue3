<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import siteSettings from '~/data/siteSettings.json';

interface OverlayProps {
  enableScrollToTop?: boolean;
  enableQuickCall?: boolean;
  enableLineChat?: boolean;
  quickCallPhone?: string;
  lineUrl?: string;
  badgeText?: string;
}

const props = withDefaults(defineProps<OverlayProps>(), {
  enableScrollToTop: true,
  enableQuickCall: true,
  enableLineChat: true,
  quickCallPhone: '',
  lineUrl: '',
  badgeText: 'แอด Line ปรึกษาฟรี'
});

const showBackToTop = ref(false);
const activePhone = props.quickCallPhone || siteSettings.hotlinePhones[0] || '08-1934-9695';
const activeLineUrl = props.lineUrl || siteSettings.socialLinks.line;

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    showBackToTop.value = window.scrollY > 300;
  }
};

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <aside 
    class="fixed bottom-6 right-5 z-50 flex flex-col items-end space-y-3 pointer-events-none"
    aria-label="Floating Action Controls"
  >
    <!-- Back to Top Button -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-4 opacity-0"
    >
      <button 
        v-if="props.enableScrollToTop && showBackToTop"
        @click="scrollToTop"
        class="w-10 h-10 rounded-full bg-white/95 text-slate-700 shadow-md border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition hover:-translate-y-0.5 pointer-events-auto"
        title="เลื่อนขึ้นบนสุด"
        aria-label="Scroll to top"
      >
        <AppIcon name="arrow-up" class="w-3.5 h-3.5 text-slate-700" />
      </button>
    </transition>

    <!-- Quick Call Button -->
    <a 
      v-if="props.enableQuickCall"
      :href="`tel:${activePhone.replace(/[^0-9]/g, '')}`" 
      class="pointer-events-auto flex items-center space-x-2 bg-btn hover:bg-btn-hover active:bg-btn-active text-white px-3.5 py-2.5 rounded-full shadow-btn hover:shadow-btn-hover transition-all duration-200 group hover:-translate-y-0.5"
      title="โทรปรึกษาด่วน"
    >
      <AppIcon name="phone" class="w-3.5 h-3.5 text-white" />
      <span class="text-xs font-semibold hidden md:inline">โทรด่วน</span>
    </a>

    <!-- Main Floating Line Button -->
    <a 
      v-if="props.enableLineChat"
      :href="activeLineUrl" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="pointer-events-auto relative flex items-center space-x-2 bg-line hover:bg-line-dark text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 group hover:scale-105"
      title="แชทคุยกับแอดไวเซอร์ทาง Line"
    >
      <!-- Ping radar indicator -->
      <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
      </span>

      <AppIcon name="line" class="w-5 h-5 text-white" />
      <span class="text-xs font-bold tracking-wide">{{ props.badgeText }}</span>
    </a>
  </aside>
</template>
