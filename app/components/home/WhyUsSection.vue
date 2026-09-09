<script setup lang="ts">
import testimonials from '~/data/testimonials.json';

// Use first testimonial as primary quote, or a curated high-impact profile
const featuredStudent = testimonials[0] || {
  name: 'น.ส. พิมพ์ชนก รัตนวิชัย (พี่เมย์)',
  university: 'University of Manchester, UK',
  course: 'MSc International Fashion Marketing',
  year: 'Graduated 2024',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  quote: 'พี่ๆ StudyWiz ดูแลดีมากตั้งแต่ช่วยเกลา SOP ยื่นใบสมัคร จนถึงการยื่นวีซ่าที่ผ่านฉลุยในรอบเดียว มีรุ่นพี่คอยให้คำแนะนำเรื่องการหาที่พักและการใช้ชีวิตในแมนเชสเตอร์ ทำให้การไปเรียนต่อต่างประเทศครั้งแรกไม่น่ากลัวอย่างที่คิดค่ะ'
};
</script>

<template>
  <section class="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
    <!-- Subtle glow backgrounds -->
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-red-900/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
          <AppIcon name="award" class="w-3.5 h-3.5 text-red-400" />
          <span>Why Choose StudyWiz</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          ทำไมผู้ปกครองและนักเรียนกว่า 1,500 คน <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-300">
            จึงไว้วางใจเรามาตลอด 38 ปี
          </span>
        </h2>
        <p class="text-sm sm:text-base text-slate-400 leading-relaxed">
          ความใส่ใจในทุกรายละเอียดคือหัวใจของเรา เราคัดสรรสิ่งที่ดีและเหมาะสมที่สุดสำหรับเป้าหมายของแต่ละบุคคล
        </p>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        <!-- Pillar 1: Dedicated Counselor (Span 7 cols) -->
        <div class="md:col-span-7 bg-slate-950/80 rounded-3xl p-7 sm:p-8 border border-slate-800 backdrop-blur-sm flex flex-col justify-between hover:border-red-600/60 transition-colors group">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 text-red-400 flex items-center justify-center">
              <AppIcon name="user" class="w-6 h-6 text-red-500" />
            </div>
            
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-red-400">Pillar 01 • Mentorship</span>
              <h3 class="text-xl sm:text-2xl font-bold text-white mt-1 font-display">
                Dedicated Counselor: ช่วยตรวจ SOP และ Portfolio แบบ One-on-One
              </h3>
            </div>

            <p class="text-sm text-slate-300 leading-relaxed">
              ที่ปรึกษาส่วนตัวที่มีประสบการณ์ตรงจะร่วมวางแผนการเขียน Statement of Purpose (SOP), ตรวจ Recommendation Letters และช่วยเตรียม Portfolio ให้โดดเด่นสะดุดตาคณะกรรมการรับสมัครของมหาวิทยาลัยระดับโลก
            </p>
          </div>

          <!-- Feature check tags -->
          <div class="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
            <span class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <AppIcon name="check" class="w-3.5 h-3.5 text-emerald-400" />
              <span>เกลาภาษาโดย Native Proofreaders</span>
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <AppIcon name="check" class="w-3.5 h-3.5 text-emerald-400" />
              <span>ซ้อมสัมภาษณ์วีซ่า & ทุน (Mock Interview)</span>
            </span>
          </div>
        </div>

        <!-- Pillar 2: Visa Success Rate (Span 5 cols) -->
        <div class="md:col-span-5 bg-gradient-to-br from-red-950/60 via-slate-950/90 to-slate-950 rounded-3xl p-7 sm:p-8 border border-red-900/40 backdrop-blur-sm flex flex-col justify-between hover:border-red-500/60 transition-colors">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <AppIcon name="shield" class="w-6 h-6 text-emerald-400" />
            </div>

            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400">Pillar 02 • High Precision</span>
              <h3 class="text-xl sm:text-2xl font-bold text-white mt-1 font-display">
                Visa Success Rate: อัตราการอนุมัติวีซ่า 100%
              </h3>
            </div>

            <p class="text-sm text-slate-300 leading-relaxed">
              เราตรวจสอบเอกสารการเงิน เอกสารส่วนตัว และเจตนารมณ์ในการศึกษา (GTE / Genuine Student Requirement) อย่างเคร่งครัดตามกฎระเบียบของสถานทูต เพื่อให้ยื่นผ่านรอบแรกอย่างมั่นใจ
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <div class="text-3xl font-extrabold text-emerald-400 font-display">100%</div>
              <div class="text-[11px] text-slate-400">อัตราการผ่านวีซ่าอย่างเป็นทางการ</div>
            </div>
            <div class="text-right">
              <div class="text-xs font-bold text-white">TIECA & FELCA</div>
              <div class="text-[11px] text-slate-400">มาตรฐานที่ปรึกษาสากล</div>
            </div>
          </div>
        </div>

        <!-- Pillar 3: Alumni & On-ground Support (Span 5 cols) -->
        <div class="md:col-span-5 bg-slate-950/80 rounded-3xl p-7 sm:p-8 border border-slate-800 backdrop-blur-sm flex flex-col justify-between hover:border-red-600/60 transition-colors">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <AppIcon name="globe" class="w-6 h-6 text-blue-400" />
            </div>

            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-blue-400">Pillar 03 • Community Care</span>
              <h3 class="text-xl sm:text-2xl font-bold text-white mt-1 font-display">
                Alumni & On-ground Support
              </h3>
            </div>

            <p class="text-sm text-slate-300 leading-relaxed">
              เครือข่ายศิษย์เก่าและคอมมูนิตี้ดูแลตั้งแต่วันที่เดินทางถึง ประสานงานรถรับส่งสนามบิน จองหอพัก เปิดบัญชีธนาคาร และมีกลุ่มรุ่นพี่ในแต่ละเมืองคอยให้ความช่วยเหลืออบอุ่นเหมือนครอบครัว
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center space-x-3 text-xs text-slate-400">
            <AppIcon name="chat" class="w-4 h-4 text-blue-400" />
            <span>มีเครือข่ายรุ่นพี่ในอังกฤษ ออสเตรเลีย แคนาดา และสหรัฐฯ</span>
          </div>
        </div>

        <!-- Pillar 4: Alumni Testimonial Box (Span 7 cols) -->
        <div class="md:col-span-7 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-7 sm:p-8 border border-slate-800 backdrop-blur-sm flex flex-col justify-between hover:border-slate-700 transition-colors relative">
          
          <!-- Decorative Quote Icon -->
          <div class="text-5xl font-serif text-red-500/20 absolute top-4 right-6 pointer-events-none select-none">
            “
          </div>

          <div class="space-y-4 relative z-10">
            <!-- Rating stars -->
            <div class="flex items-center space-x-1 text-amber-400">
              <AppIcon v-for="i in 5" :key="i" name="star" class="w-4 h-4 text-amber-400" />
              <span class="text-xs font-bold text-slate-300 ml-2">5.0 Star Student Experience</span>
            </div>

            <blockquote class="text-sm sm:text-base text-slate-200 italic leading-relaxed">
              "{{ featuredStudent.quote }}"
            </blockquote>
          </div>

          <!-- Student Profile details -->
          <div class="mt-6 pt-6 border-t border-slate-800/80 flex items-center space-x-4">
            <img 
              :src="featuredStudent.image" 
              :alt="featuredStudent.name"
              class="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-md shrink-0" 
            />
            <div class="min-w-0">
              <div class="font-bold text-sm text-white truncate">
                {{ featuredStudent.name }}
              </div>
              <div class="text-xs text-red-400 truncate font-medium">
                {{ featuredStudent.university }}
              </div>
              <div class="text-[11px] text-slate-400 truncate">
                {{ featuredStudent.course }} • {{ featuredStudent.year }}
              </div>
            </div>

            <div class="ml-auto shrink-0 hidden sm:block">
              <NuxtLink 
                to="/testimonial" 
                class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                อ่านรีวิวทั้งหมด →
              </NuxtLink>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
