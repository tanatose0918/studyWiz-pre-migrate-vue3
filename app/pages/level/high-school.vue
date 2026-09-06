<script setup lang="ts">
import institutions from '~/data/institutions.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

useHead({
  title: 'เรียนต่อระดับมัธยมในต่างประเทศ - Studywiz',
  meta: [
    { name: 'description', content: 'แนะแนวการเรียนต่อมัธยมในโรงเรียนประจำและโรงเรียนนานาชาติคุณภาพสูงในแคนาดา สหรัฐอเมริกา จีน และเกาหลี' }
  ]
});

const highSchools = institutions.filter(i => i.level === 'highschool');
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Back Breadcrumb -->
      <div class="mb-6">
        <NuxtLink to="/level" class="inline-flex items-center space-x-1 text-xs font-semibold text-brand-600 hover:underline">
          <span>←</span>
          <span>กลับไปหน้าระดับการศึกษา</span>
        </NuxtLink>
      </div>

      <SectionHeading 
        badge="High School Programs"
        title="โรงเรียนมัธยมศึกษาในต่างประเทศ"
        subtitle="หลักสูตรมาตรฐานสากล ทั้งแบบโรงเรียนประจำ (Boarding School) และโรงเรียนรัฐบาล พร้อมการดูแลอย่างใกล้ชิด"
        align="left"
      />

      <!-- High School Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="school in highSchools"
          :key="school.id"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <div class="relative h-52 overflow-hidden bg-slate-100">
            <img :src="school.image" :alt="school.nameTh" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-semibold backdrop-blur-sm">
                📍 {{ school.city }}, {{ school.country }}
              </span>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-1 justify-between space-y-4">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-slate-900 font-display group-hover:text-brand-600 transition-colors">
                {{ school.nameTh }}
              </h3>
              <p class="text-xs text-brand-700 font-medium">
                {{ school.nameEn }}
              </p>
              <p class="text-xs text-slate-600 leading-relaxed pt-1">
                {{ school.highlights }}
              </p>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              <NuxtLink 
                to="/contact" 
                class="inline-flex items-center space-x-1 text-xs font-bold text-brand-600 hover:text-brand-800"
              >
                <span>ขอข้อมูลและค่าใช้จ่าย</span>
                <span>→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Advisory Box -->
      <div class="bg-gradient-to-r from-brand-900 to-indigo-950 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div class="space-y-2 text-center md:text-left">
          <h4 class="text-xl font-bold font-display">สนใจส่งบุตรหลานเรียนต่อระดับมัธยม?</h4>
          <p class="text-xs sm:text-sm text-brand-200">
            เรามีเจ้าหน้าที่ช่วยประเมินความพร้อม วางแผนงบประมาณ และเตรียมเอกสารวีซ่านักเรียนอย่างครบถ้วน
          </p>
        </div>
        <NuxtLink to="/contact" class="px-6 py-3 rounded-xl bg-white text-brand-900 font-bold text-xs hover:bg-slate-100 shadow-md transition flex-shrink-0">
          นัดหมายปรึกษาผู้เชี่ยวชาญ
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
