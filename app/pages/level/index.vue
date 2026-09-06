<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue';
import homeData from '~/data/homeContent.json';

useHead({
  title: 'ระดับการศึกษาที่เปิดรับสมัคร - Studywiz',
  meta: [
    { name: 'description', content: 'แนะแนวหลักสูตรภาษา โรงเรียนมัธยมศึกษา และระดับปริญญาตรี โท เอก ในต่างประเทศ' }
  ]
});

const programs = homeData.programs;
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <SectionHeading 
        badge="Educational Levels"
        title="เลือกระดับการศึกษาที่คุณสนใจ"
        subtitle="เรามีหลักสูตรที่เหมาะสมกับทุกระดับพื้นฐานการเรียน งบประมาณ และความฝันของคุณ"
        align="center"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="prog in programs" 
          :key="prog.id"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <div class="relative h-56 overflow-hidden bg-slate-100">
            <img :src="prog.image" :alt="prog.titleTh" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
            <div class="absolute bottom-3 left-4 right-4 text-white">
              <span class="text-xs uppercase font-medium text-brand-200">{{ prog.titleEn }}</span>
              <h3 class="text-xl font-bold font-display text-white">{{ prog.titleTh }}</h3>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-1 justify-between space-y-4">
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">{{ prog.description }}</p>
            <NuxtLink :to="prog.link" class="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-brand-600 text-slate-700 group-hover:text-white text-xs font-semibold transition-colors duration-200">
              <span>สำรวจหลักสูตร</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
