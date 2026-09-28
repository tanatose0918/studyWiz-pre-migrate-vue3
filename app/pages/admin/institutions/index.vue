<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: 'admin'
});

const institutions = ref<any[]>([]);
const isLoading = ref(true);
const filterLevel = ref<string>('all');

const loadInstitutions = async () => {
  isLoading.value = true;
  try {
    const res: any = await $fetch('/api/institutions');
    if (res && res.data) {
      institutions.value = res.data;
    }
  } catch (err) {
    console.error('Failed to load institutions:', err);
  } finally {
    isLoading.value = false;
  }
};

const filteredInstitutions = computed(() => {
  if (filterLevel.value === 'all') return institutions.value;
  return institutions.value.filter(i => i.level === filterLevel.value);
});

onMounted(() => {
  loadInstitutions();
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center space-x-2 text-xs text-brand-400 font-mono mb-1">
          <span>CONTENT MANAGEMENT</span>
          <span>/</span>
          <span>INSTITUTIONS</span>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">มหาวิทยาลัยและโรงเรียนมัธยม (Institutions)</h2>
        <p class="text-xs text-slate-400 mt-1">ฐานข้อมูลสถาบันการศึกษาคู่สัญญา เกณฑ์รับสมัคร และตารางงบประมาณ</p>
      </div>

      <!-- Level Filter -->
      <div class="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button 
          @click="filterLevel = 'all'"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          :class="filterLevel === 'all' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'"
        >
          ทั้งหมด
        </button>
        <button 
          @click="filterLevel = 'university'"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          :class="filterLevel === 'university' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'"
        >
          มหาวิทยาลัย
        </button>
        <button 
          @click="filterLevel = 'highschool'"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          :class="filterLevel === 'highschool' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'"
        >
          มัธยมศึกษา (High School)
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="p-12 text-center text-slate-500">
      <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
      <span class="text-xs">กำลังโหลดรายชื่อสถาบันจาก Atlas...</span>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="inst in filteredInstitutions" 
        :key="inst.slug"
        class="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
              :class="inst.level === 'highschool' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800/40' : 'bg-brand-950 text-brand-400 border border-brand-800/40'"
            >
              {{ inst.level }}
            </span>
            <span class="text-xs text-slate-400 font-mono">{{ inst.city }}, {{ inst.country }}</span>
          </div>

          <div>
            <h3 class="text-sm font-bold text-white">{{ inst.nameTh }}</h3>
            <p class="text-xs text-slate-400 font-medium">{{ inst.nameEn }}</p>
          </div>

          <p class="text-xs text-slate-400 leading-relaxed">
            {{ inst.highlights }}
          </p>

          <!-- China Med / Medical Specific Highlights -->
          <div v-if="inst.costs" class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
            <div class="font-bold text-emerald-400">💰 ตารางงบประมาณ:</div>
            <div class="text-slate-300">ค่าเรียน: {{ inst.costs.tuitionPerYearRmb }} RMB/ปี</div>
            <div class="text-slate-300">รวมตลอดหลักสูตร: ~{{ inst.costs.totalCourseThb?.toLocaleString() }} บาท</div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
          <span class="text-[11px] font-mono text-slate-500">/institution/{{ inst.slug }}</span>
          <span class="text-brand-400 font-semibold text-[11px]">Atlas Synced</span>
        </div>
      </div>
    </div>
  </div>
</template>
