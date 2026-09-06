<script setup lang="ts">
import { ref, computed } from 'vue';
import destinationsData from '~/data/destinations.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

useHead({
  title: 'ประเทศที่เปิดรับสมัครศึกษาต่อ - Studywiz',
  meta: [
    { name: 'description', content: 'เลือกศึกษาต่อในกว่า 15 ประเทศชั้นนำทั่วโลก ทั้งเอเชีย ยุโรป สหราชอาณาจักร สหรัฐอเมริกา แคนาดา ออสเตรเลีย และนิวซีแลนด์' }
  ]
});

const activeRegion = ref('all');
const regions = destinationsData.regions;
const countries = destinationsData.countries;

const filteredCountries = computed(() => {
  if (activeRegion.value === 'all') return countries;
  return countries.filter(c => c.region === activeRegion.value);
});
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <SectionHeading 
        badge="Destinations & Countries"
        title="ประเทศที่เปิดรับสมัครศึกษาต่อต่างประเทศ"
        subtitle="เลือกจุดหมายปลายทางที่ตอบโจทย์ทั้งงบประมาณ เป้าหมายอาชีพ และไลฟ์สไตล์ที่คุณต้องการ"
        align="center"
      />

      <!-- Region Filter Tabs -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button 
          v-for="reg in regions"
          :key="reg.id"
          @click="activeRegion = reg.id"
          class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
          :class="activeRegion === reg.id 
            ? 'bg-btn text-white shadow-btn scale-105' 
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'"
        >
          {{ reg.nameTh }}
        </button>
      </div>

      <!-- Countries Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="country in filteredCountries"
          :key="country.slug"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <!-- Flag & Image Header -->
          <div class="relative h-44 overflow-hidden bg-slate-100">
            <img 
              :src="country.coverImage" 
              :alt="country.nameTh" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
            
            <div class="absolute top-3 left-3 text-3xl drop-shadow-md">
              {{ country.flag }}
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

          <!-- Content & Tag -->
          <div class="p-5 flex flex-col flex-1 justify-between space-y-4">
            <div class="space-y-2">
              <div class="flex items-center space-x-1.5 text-xs text-brand-600 font-semibold">
                <span>🏛️</span>
                <span>เปิดรับกว่า {{ country.institutionsCount }} สถาบัน</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ country.highlight }}
              </p>
            </div>

            <NuxtLink 
              :to="country.link" 
              class="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-50 group-hover:bg-btn text-slate-700 group-hover:text-white text-xs font-semibold transition-colors duration-200"
            >
              <span>ดูข้อมูลสถาบันและหลักสูตร</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
