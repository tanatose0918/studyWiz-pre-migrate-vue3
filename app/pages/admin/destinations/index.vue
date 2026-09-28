<script setup lang="ts">
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'admin'
});

const destinations = ref<any[]>([]);
const isLoading = ref(true);

const loadDestinations = async () => {
  isLoading.value = true;
  try {
    const res: any = await $fetch('/api/destinations');
    if (res && res.data) {
      destinations.value = res.data;
    }
  } catch (err) {
    console.error('Failed to load destinations:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadDestinations();
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="flex items-center justify-between pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center space-x-2 text-xs text-brand-400 font-mono mb-1">
          <span>CONTENT MANAGEMENT</span>
          <span>/</span>
          <span>DESTINATIONS</span>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">จุดหมายปลายทาง 16 ประเทศ (Destinations)</h2>
        <p class="text-xs text-slate-400 mt-1">จัดการข้อมูลประเทศ ธงชาติ ภูมิภาค และไฮไลต์สำคัญ</p>
      </div>

      <div class="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/40">
        {{ destinations.length }} ประเทศในฐานข้อมูล Atlas
      </div>
    </div>

    <div v-if="isLoading" class="p-12 text-center text-slate-500">
      <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
      <span class="text-xs">กำลังโหลดจุดหมายปลายทางจาก Atlas...</span>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="dest in destinations" 
        :key="dest.slug"
        class="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3 hover:border-slate-700 transition flex flex-col justify-between"
      >
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-2xl">{{ dest.flag || '🌍' }}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
              {{ dest.region }}
            </span>
          </div>

          <div>
            <h3 class="text-sm font-bold text-white">{{ dest.nameTh }}</h3>
            <p class="text-xs text-slate-400 font-medium">{{ dest.nameEn }}</p>
          </div>

          <p class="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
            {{ dest.highlight }}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
          <span class="text-[11px] font-mono text-brand-400">/country/{{ dest.slug }}</span>
          <span class="text-[10px] text-slate-500">{{ dest.institutionsCount || 0 }} สถาบัน</span>
        </div>
      </div>
    </div>
  </div>
</template>
