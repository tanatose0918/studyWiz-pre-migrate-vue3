<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import institutions from '~/data/institutions.json';
import destinationsData from '~/data/destinations.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

const route = useRoute();
const countryParam = computed(() => (route.params.country as string).toLowerCase());

const countryInfo = computed(() => {
  return destinationsData.countries.find(c => c.slug === countryParam.value) || {
    nameTh: countryParam.value.toUpperCase(),
    nameEn: countryParam.value,
    flag: '🌍',
    highlight: 'สถาบันการศึกษาระดับอุดมศึกษา'
  };
});

const uniList = computed(() => {
  return institutions.filter(i => i.countrySlug === countryParam.value && i.level === 'university');
});

useHead({
  title: computed(() => `มหาวิทยาลัยในประเทศ${countryInfo.value.nameTh} - Studywiz`),
  meta: [
    { name: 'description', content: `รายชื่อมหาวิทยาลัย หลักสูตรแพทย์ บริหารธุรกิจ และทุนการศึกษาในประเทศ${countryInfo.value.nameTh}` }
  ]
});
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Back Link -->
      <div class="mb-6">
        <NuxtLink to="/country" class="inline-flex items-center space-x-1 text-xs font-semibold text-brand-600 hover:underline">
          <span>←</span>
          <span>กลับไปเลือกประเทศ</span>
        </NuxtLink>
      </div>

      <!-- Header with Flag -->
      <div class="flex items-center space-x-3 mb-2">
        <span class="text-4xl">{{ countryInfo.flag }}</span>
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-brand-600">Higher Education</span>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">
            มหาวิทยาลัยในประเทศ{{ countryInfo.nameTh }} ({{ countryInfo.nameEn }})
          </h1>
        </div>
      </div>
      <p class="text-xs sm:text-sm text-slate-600 mb-10 max-w-3xl">
        {{ countryInfo.highlight }}
      </p>

      <!-- Institutions Grid -->
      <div v-if="uniList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="uni in uniList"
          :key="uni.id"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <div class="relative h-52 overflow-hidden bg-slate-100">
            <img :src="uni.image" :alt="uni.nameTh" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-semibold backdrop-blur-sm">
                📍 {{ uni.city }}, {{ uni.country }}
              </span>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-1 justify-between space-y-4">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-slate-900 font-display group-hover:text-brand-600 transition-colors">
                {{ uni.nameTh }}
              </h3>
              <p class="text-xs text-brand-700 font-medium">
                {{ uni.nameEn }}
              </p>
              <p class="text-xs text-slate-600 leading-relaxed pt-1">
                {{ uni.highlights }}
              </p>

              <!-- Program tags -->
              <div class="pt-2 flex flex-wrap gap-1.5">
                <span 
                  v-for="(prog, idx) in uni.programs" 
                  :key="idx"
                  class="px-2 py-0.5 rounded bg-brand-50 text-brand-700 text-[10px] font-semibold"
                >
                  🎓 {{ prog }}
                </span>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              <NuxtLink 
                to="/contact" 
                class="inline-flex items-center space-x-1 text-xs font-bold text-brand-600 hover:text-brand-800"
              >
                <span>สอบถามเกณฑ์รับสมัคร & ทุน</span>
                <span>→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- If none found in sample list, show general advisory -->
      <div v-else class="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4 mb-12">
        <span class="text-4xl">🎓</span>
        <h3 class="text-lg font-bold text-slate-800">กำลังอัปเดตรายชื่อสถาบันเพิ่มเติมใน{{ countryInfo.nameTh }}</h3>
        <p class="text-xs text-slate-500 max-w-md mx-auto">
          Studywiz มีพันธมิตรมหาวิทยาลัยใน{{ countryInfo.nameTh }}หลากหลายแห่ง สามารถติดต่อเจ้าหน้าที่เพื่อขอรายชื่อหลักสูตรทั้งหมดได้ทันที
        </p>
        <NuxtLink to="/contact" class="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs">
          ติดต่อสอบถามรายชื่อสถาบัน
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
