<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import destinationsData from '~/data/destinations.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

const route = useRoute();
const regionParam = computed(() => route.params.region as string);

const regionInfo = computed(() => {
  return destinationsData.regions.find(r => r.id === regionParam.value) || {
    id: regionParam.value,
    nameTh: regionParam.value.toUpperCase(),
    nameEn: regionParam.value
  };
});

const countriesInRegion = computed(() => {
  return destinationsData.countries.filter(c => c.region === regionParam.value);
});

useHead({
  title: computed(() => `ศึกษาต่อโซน ${regionInfo.value.nameTh} - Studywiz`),
  meta: [
    { name: 'description', content: `รายชื่อประเทศและสถาบันการศึกษาในภูมิภาค ${regionInfo.value.nameTh}` }
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
          <span>กลับไปดูทุกประเทศ</span>
        </NuxtLink>
      </div>

      <SectionHeading 
        :badge="`ภูมิภาค: ${regionInfo.nameEn}`"
        :title="`ศึกษาต่อในแถบ ${regionInfo.nameTh}`"
        subtitle="หลักสูตรที่ได้รับการรับรองสากล ค่าครองชีพ และโอกาสทางการศึกษาในภูมิภาคนี้"
        align="left"
      />

      <!-- Country Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="country in countriesInRegion"
          :key="country.slug"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <div class="relative h-44 overflow-hidden bg-slate-100">
            <img 
              :src="country.coverImage" 
              :alt="country.nameTh" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
            
            <div class="absolute top-3 left-3 w-10 h-7 rounded-md overflow-hidden shadow-md border border-white/50 bg-slate-200">
              <img 
                :src="country.flagImage || `/images/flags/${country.slug}.jpg`" 
                :alt="country.nameEn" 
                class="w-full h-full object-cover" 
              />
            </div>

            <div class="absolute bottom-3 left-4 right-4 text-white">
              <div class="text-[10px] uppercase font-bold text-brand-200 tracking-wider">
                {{ country.nameEn }}
              </div>
              <h3 class="text-xl font-bold font-display text-white">
                {{ country.nameTh }}
              </h3>
            </div>
          </div>

          <div class="p-5 flex flex-col flex-1 justify-between space-y-4">
            <div class="space-y-2">
              <div class="flex items-center space-x-1.5 text-xs text-brand-600 font-semibold">
                <AppIcon name="landmark" class="w-3.5 h-3.5 text-brand-600" />
                <span>เปิดรับกว่า {{ country.institutionsCount }} สถาบัน</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ country.highlight }}
              </p>
            </div>

            <NuxtLink 
              :to="country.link" 
              class="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-50 group-hover:bg-brand-600 text-slate-700 group-hover:text-white text-xs font-semibold transition-colors duration-200"
            >
              <span>ดูข้อมูลสถาบัน</span>
              <AppIcon name="arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
