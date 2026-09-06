<script setup lang="ts">
import activities from '~/data/activities.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

useHead({
  title: 'กิจกรรม & สัมมนาศึกษาต่อต่างประเทศ - Studywiz',
  meta: [
    { name: 'description', content: 'งานสัมมนาออนไลน์ สัมมนาสด และกิจกรรมแนะแนวการศึกษาต่อแพทย์ การบริหารธุรกิจ และมัธยมในต่างประเทศ' }
  ]
});
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <SectionHeading 
        badge="Activities & Webinars"
        title="กิจกรรมและงานสัมมนาแนะแนวการศึกษา"
        subtitle="พบกับตัวแทนคณาจารย์จากต่างประเทศ ศิษย์เก่า และผู้เชี่ยวชาญ เจาะลึกข้อมูลสดๆ ทุกเดือน"
        align="center"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="act in activities" 
          :key="act.id"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <div class="relative h-52 overflow-hidden bg-slate-100">
            <img :src="act.image" :alt="act.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-3 left-3">
              <span 
                class="px-3 py-1 rounded-full text-white text-[11px] font-semibold backdrop-blur-sm shadow-sm"
                :class="act.status === 'เปิดรับลงทะเบียน' ? 'bg-emerald-600/90' : 'bg-slate-900/80'"
              >
                {{ act.status }}
              </span>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-1 justify-between space-y-4">
            <div class="space-y-2.5">
              <div class="flex items-center space-x-2 text-[11px] text-slate-500 font-medium">
                <span>🗓️ {{ act.date }}</span>
                <span>•</span>
                <span>💻 {{ act.platform }}</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors">
                {{ act.title }}
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ act.description }}
              </p>
            </div>

            <div class="pt-3 border-t border-slate-100">
              <NuxtLink 
                to="/contact" 
                class="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-brand-600 text-slate-700 group-hover:text-white text-xs font-semibold transition-colors duration-200"
              >
                <span>{{ act.status === 'เปิดรับลงทะเบียน' ? 'ลงทะเบียนเข้าร่วมฟรี' : 'สอบถามบันทึกย้อนหลัง' }}</span>
                <span>→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
