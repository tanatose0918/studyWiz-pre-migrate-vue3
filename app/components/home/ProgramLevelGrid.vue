<script setup lang="ts">
import homeData from '~/data/homeContent.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

const programs = homeData.programs;
</script>

<template>
  <section class="py-16 lg:py-24 bg-slate-50 border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Heading -->
      <SectionHeading 
        badge="หลักสูตรการศึกษา"
        title="หลักสูตรที่เราแนะแนวศึกษาต่อในต่างประเทศ"
        subtitle="ครอบคลุมทุกระดับการศึกษา ตั้งแต่คอร์สพัฒนาภาษา โรงเรียนมัธยม ไปจนถึงสถาบันอุดมศึกษาระดับโลก"
        align="center"
      />

      <!-- Grid 3 Columns -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="prog in programs" 
          :key="prog.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group hover:-translate-y-1"
        >
          <!-- Image Container -->
          <div class="relative h-56 overflow-hidden bg-slate-100">
            <img 
              :src="prog.image" 
              :alt="prog.titleTh" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
            
            <div class="absolute top-3.5 right-3.5">
              <span class="px-3 py-1 rounded-full bg-brand-600/90 text-white text-[11px] font-semibold backdrop-blur-sm shadow-sm">
                {{ prog.badge }}
              </span>
            </div>

            <div class="absolute bottom-3.5 left-4 right-4 text-white">
              <span class="text-xs uppercase font-medium text-brand-200 tracking-wider">
                {{ prog.titleEn }}
              </span>
              <h3 class="text-xl font-bold font-display text-white">
                {{ prog.titleTh }}
              </h3>
            </div>
          </div>

          <!-- Description & CTA -->
          <div class="p-6 flex flex-col flex-1 justify-between space-y-5">
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {{ prog.description }}
            </p>

            <NuxtLink 
              :to="prog.link" 
              class="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-brand-600 text-slate-700 group-hover:text-white text-xs font-semibold transition-colors duration-200"
            >
              <span>ดูรายละเอียดหลักสูตร</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
