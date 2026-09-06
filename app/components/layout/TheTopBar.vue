<script setup lang="ts">
import siteSettings from '~/data/siteSettings.json';

const primaryPhone = siteSettings.hotlinePhones[0] || '08-1934-9695';
const primaryEmail = siteSettings.primaryEmail || 'info@studywiz.net';
const socials = siteSettings.socialLinks;
</script>

<template>
  <div class="bg-brand-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
    <div class="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
      <!-- Left: Contact Hotlines -->
      <div class="flex items-center space-x-4">
        <a 
          :href="`tel:${primaryPhone.replace(/-/g, '')}`" 
          class="flex items-center space-x-1.5 hover:text-white transition group"
        >
          <AppIcon name="phone" class="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
          <span class="font-medium text-slate-200">สายด่วน:</span>
          <span>{{ primaryPhone }}</span>
        </a>
        <span class="text-slate-600 hidden sm:inline">|</span>
        <a 
          :href="`mailto:${primaryEmail}`" 
          class="hidden sm:flex items-center space-x-1.5 hover:text-white transition group"
        >
          <AppIcon name="mail" class="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
          <span>{{ primaryEmail }}</span>
        </a>
      </div>

      <!-- Right: Socials & Trust Badge -->
      <div class="flex items-center space-x-3 ml-auto">
        <div class="flex items-center space-x-2">
          <a 
            :href="socials.facebook" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-blue-400 transition p-1"
            title="Facebook Studywiz"
          >
            <AppIcon name="facebook" class="w-3.5 h-3.5" />
          </a>
          <a 
            :href="socials.line" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-green-400 transition p-1"
            title="Line Official @studywiz"
          >
            <AppIcon name="line" class="w-3.5 h-3.5" />
          </a>
          <a 
            :href="socials.instagram" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-pink-400 transition p-1"
            title="Instagram Studywiz"
          >
            <AppIcon name="instagram" class="w-3.5 h-3.5" />
          </a>
          <a 
            :href="socials.tiktok" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-cyan-400 transition p-1"
            title="TikTok Studywiz"
          >
            <AppIcon name="tiktok" class="w-3.5 h-3.5" />
          </a>
          <a 
            :href="socials.youtube" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-red-400 transition p-1"
            title="YouTube Studywiz"
          >
            <AppIcon name="youtube" class="w-3.5 h-3.5" />
          </a>
        </div>

        <div class="h-3 w-px bg-slate-700"></div>

        <div class="flex items-center space-x-1 text-[11px] font-semibold text-slate-400">
          <span class="text-emerald-400 font-bold">TH</span>
          <span>/</span>
          <span class="text-slate-500 hover:text-slate-300 cursor-pointer">EN</span>
        </div>
      </div>
    </div>
  </div>
</template>
