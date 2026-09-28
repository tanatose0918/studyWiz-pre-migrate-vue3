<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: 'admin'
});

const siteName = ref('Studywiz - ศูนย์แนะแนวศึกษาต่อต่างประเทศ');
const metaDescription = ref('Studywiz สถาบันแนะแนวศึกษาต่อต่างประเทศ ก่อตั้งปี 2528 สมาชิก TIECA & FELCA');
const primaryColor = ref('#1A56DB');
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center space-x-2 text-xs text-brand-400 font-mono mb-1">
          <span>CORE CONFIG</span>
          <span>/</span>
          <span>SETTINGS</span>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">ตั้งค่าเว็บไซต์ & SEO กลาง (Site Settings)</h2>
        <p class="text-xs text-slate-400 mt-1">กำหนดชื่อเว็บไซต์ ไอคอน โลโก้ และ Metadata พื้นฐาน</p>
      </div>
    </div>

    <div class="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-5">
      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">ชื่อเว็บไซต์ (Site Name)</label>
        <input v-model="siteName" type="text" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">Meta Description ทั่วไป</label>
        <textarea v-model="metaDescription" rows="3" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"></textarea>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">สีประจำแบรนด์ (Primary Theme Color)</label>
        <div class="flex items-center space-x-3">
          <input v-model="primaryColor" type="color" class="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" />
          <input v-model="primaryColor" type="text" class="w-32 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono" />
        </div>
      </div>
    </div>
  </div>
</template>
