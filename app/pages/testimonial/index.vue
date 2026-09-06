<script setup lang="ts">
import testimonials from '~/data/testimonials.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

useHead({
  title: 'รีวิวและความประทับใจจากนักเรียน - Studywiz',
  meta: [
    { name: 'description', content: 'เสียงตอบรับและเรื่องเล่าประสบการณ์จริงจากนักเรียนไทยที่ไปศึกษาต่อในต่างประเทศกับศูนย์แนะแนว Studywiz' }
  ]
});
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <SectionHeading 
        badge="Student Testimonials"
        title="ความประทับใจจากนักเรียนและผู้ปกครอง"
        subtitle="เรื่องเล่าประสบการณ์ตรงจากศิษย์เก่าและนักเรียนทุนที่ประสบความสำเร็จในรั้วมหาวิทยาลัยทั่วโลก"
        align="center"
      />

      <!-- Testimonial Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div 
          v-for="item in testimonials" 
          :key="item.id"
          class="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
        >
          <!-- Quote -->
          <div class="space-y-4">
            <div class="text-3xl text-brand-400">“</div>
            <p class="text-sm sm:text-base text-slate-700 leading-relaxed font-normal italic">
              {{ item.quote }}
            </p>
          </div>

          <!-- Student Profile -->
          <div class="flex items-center space-x-4 pt-4 border-t border-slate-100">
            <img 
              :src="item.avatar" 
              :alt="item.studentName"
              class="w-12 h-12 rounded-full object-cover border-2 border-brand-100 shadow-sm"
            />
            <div>
              <div class="font-bold text-slate-900 text-sm font-display">
                {{ item.studentName }}
              </div>
              <div class="text-xs text-brand-600 font-medium">
                {{ item.program }}
              </div>
              <div class="text-[11px] text-slate-400">
                🏛️ {{ item.institution }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Banner -->
      <div class="bg-brand-50 border border-brand-100/80 rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-4">
        <span class="text-3xl">🌟</span>
        <h3 class="text-xl font-bold text-slate-900 font-display">
          พร้อมสร้างเรื่องราวความสำเร็จของคุณแล้วหรือยัง?
        </h3>
        <p class="text-xs sm:text-sm text-slate-600">
          ทีมงาน Studywiz ยินดีร่วมเป็นส่วนหนึ่งในก้าวสำคัญ สานฝันการเรียนต่อต่างประเทศของคุณให้เป็นจริง
        </p>
        <NuxtLink 
          to="/contact" 
          class="inline-block px-6 py-3 rounded-xl bg-btn hover:bg-btn-hover active:bg-btn-active text-white text-xs font-bold shadow-btn hover:shadow-btn-hover transition"
        >
          นัดหมายปรึกษาฟรีกับทีมงาน
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
