<script setup lang="ts">
import homeData from '~/data/homeContent.json';

const philosophy = homeData.philosophy;
</script>

<template>
  <section class="py-16 lg:py-24 bg-white border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        <!-- Left Column: Video Embed Area (5 cols) -->
        <div class="lg:col-span-6">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-100 aspect-video bg-slate-900 group">
            <iframe 
              :src="philosophy.videoUrl" 
              title="แนะนำ Studywiz ศูนย์แนะแนวศึกษาต่อต่างประเทศ"
              class="w-full h-full object-cover"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <!-- Quick Trust Badges below video -->
          <div class="mt-4 grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
              <div class="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                <AppIcon name="award" class="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <div class="font-bold text-xs text-slate-800">TIECA Member</div>
                <div class="text-[10px] text-slate-500">สมาคมไทยแนะแนวการศึกษา</div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
              <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <AppIcon name="globe" class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div class="font-bold text-xs text-slate-800">FELCA Member</div>
                <div class="text-[10px] text-slate-500">มาตรฐานที่ปรึกษาสากล</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Philosophy Narrative (7 cols) -->
        <div class="lg:col-span-6 space-y-6">
          <div>
            <span class="inline-block px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-2.5">
              ปรัชญาและความมุ่งมั่น
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-display">
              {{ philosophy.headline }}
            </h2>
          </div>

          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            {{ philosophy.description }}
          </p>

          <!-- Key Pillars -->
          <div class="space-y-3 pt-2">
            <div 
              v-for="(item, idx) in philosophy.highlights" 
              :key="idx"
              class="flex items-start space-x-3 text-xs sm:text-sm text-slate-700"
            >
              <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AppIcon name="check" class="w-3 h-3 text-emerald-600" />
              </div>
              <span class="font-medium">{{ item }}</span>
            </div>
          </div>

          <!-- Milestone Counter -->
          <div class="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
            <div>
              <div class="text-2xl lg:text-3xl font-black text-brand-600 font-display">
                {{ philosophy.yearsOfTrust }}
              </div>
              <div class="text-[11px] text-slate-500 font-medium">ปีแห่งความไว้วางใจ</div>
            </div>
            <div>
              <div class="text-2xl lg:text-3xl font-black text-brand-600 font-display">
                15+
              </div>
              <div class="text-[11px] text-slate-500 font-medium">ประเทศพันธมิตร</div>
            </div>
            <div>
              <div class="text-2xl lg:text-3xl font-black text-brand-600 font-display">
                100%
              </div>
              <div class="text-[11px] text-slate-500 font-medium">แนะแนวฟรีไม่มีค่าใช้จ่าย</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
