<script setup lang="ts">
import { ref } from 'vue';
import siteSettings from '~/data/siteSettings.json';

const lineUrl = siteSettings.socialLinks.line;
const phone = siteSettings.hotlinePhones[0] || '08-1934-9695';

const keyMetrics = [
  { value: '38+', label: 'ปีแห่งประสบการณ์แนะแนว', sub: 'ก่อตั้งตั้งแต่ปี 2528' },
  { value: '1,500+', label: 'นักเรียนประสบความสำเร็จ', sub: 'สู่สถาบันทั่วโลก' },
  { value: '100%', label: 'Visa Approval Track', sub: 'ยื่นวีซ่าผ่านเรียบร้อย' },
  { value: '0 บาท', label: 'ค่าบริการให้คำปรึกษา', sub: 'บริการฟรีทุกขั้นตอน' },
];
</script>

<template>
  <section class="relative bg-slate-950 text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
    <!-- Gradient glow overlays -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/3 -right-32 w-96 h-96 bg-red-800/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <!-- Left: Text & CTAs (7 cols) -->
        <div class="lg:col-span-7 space-y-7 text-center lg:text-left">
          
          <!-- Trust Metric Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/90 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-950/40 backdrop-blur-md border border-red-400/30">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>1,500+ นักเรียนที่ประสบความสำเร็จ | พาร์ตเนอร์กว่า 350 สถาบันทั่วโลก</span>
          </div>

          <!-- Headline (H1) -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] font-display">
            Unlock Your Global Future <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300">
              บันไดสู่มหาวิทยาลัยชั้นนำระดับโลก
            </span>
          </h1>

          <!-- Subheadline -->
          <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            แนะแนวและดูแลเส้นทางเรียนต่อต่างประเทศแบบ One-on-One ตั้งแต่เตรียมเอกสาร ยื่นขอทุน สมัครวีซ่า จนถึงวันสำเร็จการศึกษา โดยทีมงานมืออาชีพมาตรฐาน TIECA & FELCA
          </p>

          <!-- Dual CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a 
              href="#cta-consultation"
              class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
            >
              <span>ประเมินโอกาสและงบประมาณฟรี</span>
              <AppIcon name="arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="#destinations"
              class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-base backdrop-blur-sm transition-all duration-200"
            >
              <span>สำรวจหลักสูตรและทุน</span>
            </a>
          </div>

          <!-- TIECA & FELCA accreditation small note -->
          <div class="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
            <div class="flex items-center gap-1.5">
              <AppIcon name="award" class="w-4 h-4 text-red-500" />
              <span>สมาชิกสมาคมไทยแนะแนวการศึกษาต่อต่างประเทศ (TIECA)</span>
            </div>
            <div class="flex items-center gap-1.5">
              <AppIcon name="globe" class="w-4 h-4 text-red-500" />
              <span>มาตรฐานสากล FELCA Accredited</span>
            </div>
          </div>

        </div>

        <!-- Right: Modern Academy Imagery & Floating Stats Card (5 cols) -->
        <div class="lg:col-span-5 relative">
          <!-- Main Hero Image Frame -->
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-950/50 border border-slate-800 aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] bg-slate-900 group">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80" 
                alt="นักเรียนประสบความสำเร็จกับการเรียนต่อต่างประเทศกับ StudyWiz" 
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <!-- Bottom caption overlay inside image -->
              <div class="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-left">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shrink-0">
                    <AppIcon name="school" class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div class="text-xs text-red-400 font-semibold uppercase tracking-wider">World-Class Mentorship</div>
                    <div class="text-sm font-bold text-white">ให้คำปรึกษาแบบตัวต่อตัวตั้งแต่ปี 2528</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Trust Card -->
            <div class="hidden sm:flex absolute -top-5 -left-6 bg-slate-900/90 backdrop-blur-lg p-3.5 rounded-2xl border border-slate-800 shadow-2xl items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <AppIcon name="shield" class="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div class="text-[11px] text-slate-400 font-medium">ความเชี่ยวชาญการยื่นวีซ่า</div>
                <div class="text-xs font-bold text-white">อัตราสำเร็จ 100%</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Bottom Metric Strip -->
      <div class="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        <div 
          v-for="(metric, idx) in keyMetrics" 
          :key="idx" 
          class="text-center lg:text-left bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 sm:p-5 backdrop-blur-sm hover:border-red-900/60 transition-colors"
        >
          <div class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display text-red-500">
            {{ metric.value }}
          </div>
          <div class="text-xs sm:text-sm font-bold text-slate-200 mt-1">
            {{ metric.label }}
          </div>
          <div class="text-[11px] text-slate-400 mt-0.5">
            {{ metric.sub }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
