<script setup lang="ts">
import { ref } from 'vue';

const route = useRoute();
const isSidebarOpen = ref(true);

const navSections = [
  {
    title: 'CORE CONFIG',
    items: [
      { name: 'Global Layout (1 Page Control)', path: '/admin/layout', icon: 'globe' },
      { name: 'Site & SEO Settings', path: '/admin/settings', icon: 'settings' }
    ]
  },
  {
    title: 'CONTENT MANAGEMENT',
    items: [
      { name: 'Pages Management', path: '/admin/pages', icon: 'file-text', hasAdd: true },
      { name: 'Destinations (16 ประเทศ)', path: '/admin/destinations', icon: 'map-pin' },
      { name: 'Institutions & Programs', path: '/admin/institutions', icon: 'award' },
      { name: 'Blog Articles (5 Contexts)', path: '/admin/blogs', icon: 'newspaper' }
    ]
  },
  {
    title: 'LEADS & CRM',
    items: [
      { name: 'Student Leads Inbox', path: '/admin/leads', icon: 'users' }
    ]
  }
];
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
    
    <!-- Admin Top Bar -->
    <header class="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div class="flex items-center space-x-4">
        <button 
          @click="isSidebarOpen = !isSidebarOpen"
          class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="สลับแถบเมนูด้านข้าง"
        >
          <AppIcon name="menu" class="w-5 h-5" />
        </button>
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-white shadow-lg shadow-brand-500/20">
            W
          </div>
          <div>
            <h1 class="text-sm font-bold text-white tracking-wide">StudyWiz CMS</h1>
            <p class="text-[10px] text-slate-400 font-mono">Backoffice Control Center v1.0</p>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-medium">MongoDB Atlas Synced</span>
        </div>
        <NuxtLink 
          to="/" 
          target="_blank"
          class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition"
        >
          <span>ดูหน้าบ้าน (Public Site)</span>
          <AppIcon name="arrow-right" class="w-3.5 h-3.5" />
        </NuxtLink>
      </div>
    </header>

    <!-- Main Layout Container -->
    <div class="flex-1 flex overflow-hidden">
      
      <!-- Left Sidebar -->
      <aside 
        v-show="isSidebarOpen"
        class="w-72 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-all shrink-0 select-none"
      >
        <div class="p-4 overflow-y-auto space-y-6">
          <div v-for="section in navSections" :key="section.title" class="space-y-1.5">
            <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              {{ section.title }}
            </h3>
            <div 
              v-for="item in section.items" 
              :key="item.path"
              class="flex items-center justify-between group"
            >
              <NuxtLink 
                :to="item.path"
                class="flex-1 flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition"
                :class="route.path.startsWith(item.path) ? 'bg-brand-600 text-white font-semibold shadow-md shadow-brand-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'"
              >
                <AppIcon :name="item.icon" class="w-4 h-4 shrink-0" />
                <span class="truncate">{{ item.name }}</span>
              </NuxtLink>
              <NuxtLink
                v-if="item.hasAdd"
                to="/admin/pages?action=new"
                class="ml-1 p-1.5 rounded-lg text-slate-500 hover:text-brand-400 hover:bg-slate-900 transition"
                title="สร้างหน้าใหม่ทันที"
              >
                <AppIcon name="plus" class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="p-4 border-t border-slate-800/80 bg-slate-950/60 text-xs text-slate-400 flex items-center justify-between">
          <span class="font-mono text-[11px]">studywiz @ atlas</span>
          <span class="text-[11px] text-brand-400 font-semibold">TIECA & FELCA</span>
        </div>
      </aside>

      <!-- Main Canvas Area -->
      <main class="flex-1 overflow-y-auto bg-slate-900 p-6 lg:p-8">
        <slot />
      </main>

    </div>

  </div>
</template>
