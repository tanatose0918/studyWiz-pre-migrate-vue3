<script setup lang="ts">
import { ref } from 'vue';
import navigationData from '~/data/navigation.json';

const emit = defineEmits<{
  (e: 'toggleDrawer'): void;
}>();

const activeDropdownId = ref<string | null>(null);
const navLinks = navigationData;
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center space-x-3 group py-1.5">
        <img 
          src="/images/logo-studyWiz.png" 
          alt="Studywiz Education Consultant" 
          class="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200" 
        />
      </NuxtLink>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden lg:flex items-center space-x-1">
        <template v-for="item in navLinks" :key="item.path">
          
          <!-- Dropdown item -->
          <div 
            v-if="item.hasDropdown" 
            class="relative"
            @mouseenter="activeDropdownId = item.id"
            @mouseleave="activeDropdownId = null"
          >
            <NuxtLink 
              :to="item.path"
              class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition flex items-center space-x-1"
              active-class="text-brand-600 bg-brand-50/60 font-semibold"
            >
              <span>{{ item.name }}</span>
              <AppIcon name="chevron-down" class="w-3 h-3 text-slate-400" />
            </NuxtLink>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="transform scale-95 opacity-0 -translate-y-1"
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0"
              leave-to-class="transform scale-95 opacity-0 -translate-y-1"
            >
              <div 
                v-show="activeDropdownId === item.id" 
                class="absolute left-0 top-full pt-1 w-64 z-50"
              >
                <div class="bg-white rounded-xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                  <NuxtLink 
                    v-for="sub in item.children" 
                    :key="sub.path"
                    :to="sub.path"
                    class="block px-3 py-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50/70 transition"
                    active-class="text-brand-600 bg-brand-50 font-semibold"
                  >
                    {{ sub.name }}
                  </NuxtLink>
                </div>
              </div>
            </transition>
          </div>

          <!-- Standard Nav Item -->
          <NuxtLink 
            v-else
            :to="item.path"
            class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition"
            active-class="text-brand-600 bg-brand-50/60 font-semibold"
          >
            {{ item.name }}
          </NuxtLink>
        </template>
      </nav>

      <!-- Right Action & Mobile Toggle -->
      <div class="flex items-center space-x-3">
        <NuxtLink 
          to="/contact" 
          class="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-btn hover:bg-btn-hover active:bg-btn-active text-white text-xs font-semibold shadow-btn hover:shadow-btn-hover transition-all space-x-1.5"
        >
          <span>ปรึกษาเรียนต่อฟรี</span>
          <AppIcon name="arrow-right" class="w-3.5 h-3.5" />
        </NuxtLink>

        <!-- Mobile Hamburger Button -->
        <button 
          @click="emit('toggleDrawer')" 
          type="button" 
          class="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none transition flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <AppIcon name="menu" class="w-5 h-5" />
        </button>
      </div>

    </div>
  </header>
</template>
