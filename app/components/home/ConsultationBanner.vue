<script setup lang="ts">
import siteSettings from '~/data/siteSettings.json';

const hotline = siteSettings.hotlinePhones[0] || '08-1934-9695';
const lineUrl = siteSettings.socialLinks.line;
</script>

<template>
  <section class="py-14 bg-gradient-to-r from-brand-950 via-brand-900 to-highlight text-white relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute -right-10 -bottom-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -left-10 -top-10 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
      
      <!-- Text -->
      <div class="space-y-3 text-center lg:text-left max-w-2xl">
        <span class="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/20">
          ✨ นัดหมายปรึกษาฟรี ไม่มีค่าใช้จ่าย
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight text-white">
          พร้อมเริ่มต้นอนาคตการศึกษาในต่างประเทศแล้วหรือยัง?
        </h2>
        <p class="text-brand-100 text-xs sm:text-sm leading-relaxed">
          ทีมงานมืออาชีพของ Studywiz ยินดีให้คำแนะนำการเลือกประเทศ สถาบัน งบประมาณ และการเตรียมเอกสารอย่างตรงไปตรงมา
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap items-center justify-center gap-3.5 flex-shrink-0">
        <a 
          :href="lineUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="px-6 py-3.5 rounded-xl bg-line hover:bg-line-dark text-white font-bold text-sm shadow-xl shadow-black/20 hover:scale-105 transition flex items-center space-x-2"
        >
          <span>💬 ปรึกษาผ่าน Line @studywiz</span>
        </a>

        <NuxtLink 
          to="/contact"
          class="px-6 py-3.5 rounded-xl bg-white text-highlight hover:bg-primary font-bold text-sm shadow-xl transition"
        >
          <span>กรอกแบบฟอร์มนัดหมาย</span>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>
