<script setup lang="ts">
import siteSettings from '~/data/siteSettings.json';

const currentYear = new Date().getFullYear();
const bkk = siteSettings.bangkokOffice;
const cnx = siteSettings.chiangmaiOffice;
const socials = siteSettings.socialLinks;
</script>

<template>
  <footer class="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Grid: 4-5 Columns -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-14">
        
        <!-- Col 1: Brand & Heritage (4 cols) -->
        <div class="lg:col-span-4 space-y-4">
          <div class="inline-block bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl shadow-sm border border-white/20">
            <img 
              src="/images/logo-studyWiz.png" 
              alt="Studywiz Education Consultant" 
              class="h-10 sm:h-12 w-auto object-contain" 
            />
          </div>

          <p class="text-xs text-slate-400 leading-relaxed">
            ศูนย์แนะแนวการศึกษาต่อต่างประเทศครบวงจร ก่อตั้งขึ้นโดยนักการศึกษาตั้งแต่ปี พ.ศ. 2528 
            เรามีทางเลือกให้กับทุกคนไม่ว่าจะมีงบประมาณมากหรือน้อย มุ่งมั่นส่งเสริมโอกาสทางการศึกษาอย่างไร้ขีดจำกัด
          </p>

          <!-- Accreditations -->
          <div class="pt-2">
            <div class="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
              สมาชิกสมาคมวิชาชีพ
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[11px] text-brand-300 font-medium">
                🏅 TIECA Member
              </span>
              <span class="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[11px] text-brand-300 font-medium">
                🌍 FELCA Member
              </span>
            </div>
          </div>
        </div>

        <!-- Col 2: Program Levels (2 cols) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-sm font-bold text-white uppercase tracking-wider font-display">
            ระดับการศึกษา
          </h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li>
              <NuxtLink to="/country" class="hover:text-brand-300 transition">
                ภาษา (Language)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/level/high-school" class="hover:text-brand-300 transition">
                มัธยม (High School)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/country" class="hover:text-brand-300 transition">
                วิทยาลัย / มหาวิทยาลัย
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/level/university/poland" class="hover:text-brand-300 transition">
                เรียนต่อโปแลนด์
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/level/university/china" class="hover:text-brand-300 transition">
                เรียนต่อแพทย์จีน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/level/university/russia" class="hover:text-brand-300 transition">
                เรียนต่อแพทย์รัสเซีย
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Quick Links (2 cols) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-sm font-bold text-white uppercase tracking-wider font-display">
            นำทางด่วน
          </h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li>
              <NuxtLink to="/" class="hover:text-brand-300 transition">หน้าแรก</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/country" class="hover:text-brand-300 transition">ประเทศที่เปิดรับ</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/testimonial" class="hover:text-brand-300 transition">รีวิวจากผู้เรียน</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog/all" class="hover:text-brand-300 transition">บทความ & สาระน่ารู้</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/activities" class="hover:text-brand-300 transition">กิจกรรมและสัมมนา</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-brand-300 transition">เกี่ยวกับเรา</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-brand-300 transition">ติดต่อสอบถาม</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 4: Bangkok & Chiang Mai Offices (4 cols) -->
        <div class="lg:col-span-4 space-y-4">
          <h4 class="text-sm font-bold text-white uppercase tracking-wider font-display">
            สำนักงาน Studywiz
          </h4>

          <!-- Bangkok -->
          <div class="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5 text-xs">
            <div class="font-bold text-slate-100 flex items-center space-x-1.5">
              <span>🏢</span>
              <span>{{ bkk.title }}</span>
            </div>
            <p class="text-slate-400 leading-normal">
              {{ bkk.address }}
            </p>
            <div class="text-[11px] text-slate-300 flex flex-wrap gap-x-3 gap-y-1 pt-1">
              <span v-for="p in bkk.phones" :key="p">
                <a :href="`tel:${p.replace(/[^\d+]/g, '')}`" class="hover:text-brand-400 transition">
                  📞 {{ p }}
                </a>
              </span>
            </div>
            <div class="pt-0.5">
              <a :href="`mailto:${bkk.email}`" class="text-brand-400 hover:underline">
                ✉️ {{ bkk.email }}
              </a>
            </div>
          </div>

          <!-- Chiang Mai -->
          <div class="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-1 text-xs">
            <div class="font-bold text-slate-100 flex items-center space-x-1.5">
              <span>🏔️</span>
              <span>{{ cnx.title }}</span>
            </div>
            <div class="text-[11px] text-slate-300 flex items-center space-x-3">
              <a :href="`tel:${cnx.phones[0].replace(/[^\d+]/g, '')}`" class="hover:text-brand-400 transition">
                📞 {{ cnx.phones[0] }}
              </a>
              <span>|</span>
              <a :href="`mailto:${cnx.email}`" class="text-brand-400 hover:underline">
                ✉️ {{ cnx.email }}
              </a>
            </div>
          </div>

          <!-- Social Icons in Footer -->
          <div class="flex items-center space-x-3 pt-1">
            <a :href="socials.facebook" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm text-slate-300 hover:bg-brand-600 hover:text-white transition">
              📘
            </a>
            <a :href="socials.line" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm text-slate-300 hover:bg-line hover:text-white transition">
              💬
            </a>
            <a :href="socials.instagram" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm text-slate-300 hover:bg-pink-600 hover:text-white transition">
              📷
            </a>
            <a :href="socials.tiktok" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm text-slate-300 hover:bg-cyan-600 hover:text-white transition">
              🎵
            </a>
            <a :href="socials.youtube" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm text-slate-300 hover:bg-red-600 hover:text-white transition">
              ▶️
            </a>
          </div>

        </div>

      </div>

      <!-- Bottom Divider & Copyright -->
      <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © {{ currentYear }} Studywiz Co., Ltd. สงวนลิขสิทธิ์ทุกประการ.
        </div>
        <div class="flex items-center space-x-6 text-[11px]">
          <NuxtLink to="/about" class="hover:text-slate-300 transition">นโยบายความเป็นส่วนตัว</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-slate-300 transition">แผนที่และการติดต่อ</NuxtLink>
          <a href="/admin/" target="_blank" class="text-slate-500 hover:text-slate-300 transition flex items-center space-x-1">
            <span>⚙️</span>
            <span>CMS Backoffice</span>
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>
