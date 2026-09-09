<script setup lang="ts">
import { ref } from 'vue';

interface DestinationCard {
  id: string;
  nameTh: string;
  nameEn: string;
  flagImg: string;
  flagEmoji: string;
  coverImage: string;
  popularPrograms: string[];
  scholarshipTag: string;
  highlightText: string;
  link: string;
}

const topDestinations = ref<DestinationCard[]>([
  {
    id: 'uk',
    nameTh: 'สหราชอาณาจักร (UK)',
    nameEn: 'United Kingdom',
    flagImg: '/images/flags/uk.jpg',
    flagEmoji: '🇬🇧',
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    popularPrograms: ['ปริญญาโท 1 ปีจบ', 'มหาวิทยาลัยกลุ่ม Russell Group', 'หลักสูตร Business & Law'],
    scholarshipTag: 'ทุนการศึกษาสูงสุด 50%',
    highlightText: 'หลักสูตรเข้มข้น ประหยัดเวลาและค่าใช้จ่าย พร้อมสิทธิ์ Post-Study Work Visa 2 ปี',
    link: '/country'
  },
  {
    id: 'australia',
    nameTh: 'ออสเตรเลีย (AU)',
    nameEn: 'Australia',
    flagImg: '/images/flags/australia.jpg',
    flagEmoji: '🇦🇺',
    coverImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    popularPrograms: ['มหาวิทยาลัย Group of Eight (Go8)', 'หลักสูตรภาษา & Vocational', 'STEM & Data Science'],
    scholarshipTag: 'ทุนการศึกษาสูงสุด 50%',
    highlightText: 'ทำงานพาร์ทไทม์ได้ถูกต้องตามกฎหมาย 48 ชม./2 สัปดาห์ สภาพแวดล้อมน่าอยู่และปลอดภัย',
    link: '/country'
  },
  {
    id: 'usa',
    nameTh: 'สหรัฐอเมริกา (USA)',
    nameEn: 'United States',
    flagImg: '/images/flags/usa.jpg',
    flagEmoji: '🇺🇸',
    coverImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
    popularPrograms: ['Top World Ranking Universities', 'Community College Pathways', 'STEM OPT สูงสุด 3 ปี'],
    scholarshipTag: 'ทุนการศึกษาสูงสุด 50%',
    highlightText: 'เปิดโอกาสทำงานในบริษัทเทคโนโลยีระดับโลกด้วยสิทธิ์ STEM Extension สูงสุด 3 ปี',
    link: '/country'
  },
  {
    id: 'nz-canada',
    nameTh: 'นิวซีแลนด์ & แคนาดา (NZ & CA)',
    nameEn: 'New Zealand & Canada',
    flagImg: '/images/flags/canada.jpg',
    flagEmoji: '🇳🇿 🇨🇦',
    coverImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
    popularPrograms: ['โรงเรียนมัธยมมาตรฐานรัฐบาล', 'หลักสูตร Co-op เรียนพร้อมฝึกงาน', 'Post-Graduation Work Permit (PGWP)'],
    scholarshipTag: 'ทุนการศึกษาสูงสุด 50%',
    highlightText: 'เส้นทางการทำงานและการขอถิ่นที่อยู่ถาวร (PR Pathway) ที่เปิดกว้างและมีคุณภาพชีวิตระดับโลก',
    link: '/country'
  }
]);
</script>

<template>
  <section id="destinations" class="py-16 lg:py-24 bg-slate-50 text-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <AppIcon name="globe" class="w-3.5 h-3.5 text-red-600" />
            <span>Global Destinations</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            จุดหมายปลายทางยอดนิยม <span class="text-red-600">(Top Destinations)</span>
          </h2>
          <p class="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            เลือกเรียนต่อในประเทศชั้นนำที่มีมาตรฐานการศึกษาสากล พร้อมโอกาสทำงานและขอทุนการศึกษา
          </p>
        </div>

        <div class="mt-4 md:mt-0">
          <NuxtLink 
            to="/country" 
            class="inline-flex items-center space-x-2 text-sm font-bold text-red-600 hover:text-red-700 group transition"
          >
            <span>สำรวจทั้งหมด 16 ประเทศ</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </NuxtLink>
        </div>
      </div>

      <!-- 4 Responsive Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div 
          v-for="dest in topDestinations" 
          :key="dest.id"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <!-- Landmark Photo + Tag Overlays -->
          <div class="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
            <img 
              :src="dest.coverImage" 
              :alt="dest.nameTh" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

            <!-- Flag badge on image top left -->
            <div class="absolute top-3.5 left-3.5 flex items-center space-x-2 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
              <img 
                :src="dest.flagImg" 
                :alt="dest.nameEn" 
                class="w-4 h-3 object-cover rounded-sm border border-slate-700"
              />
              <span class="text-xs font-bold text-white">{{ dest.nameEn }}</span>
            </div>

            <!-- Scholarship Highlight Tag on bottom right -->
            <div class="absolute bottom-3 right-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold shadow-md shadow-red-950/30">
                <AppIcon name="award" class="w-3 h-3 text-white" />
                <span>{{ dest.scholarshipTag }}</span>
              </span>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
            
            <div class="space-y-3">
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors font-display">
                {{ dest.nameTh }}
              </h3>

              <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {{ dest.highlightText }}
              </p>

              <!-- Popular Programs List -->
              <div class="pt-2 border-t border-slate-100 space-y-1.5">
                <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  หลักสูตรยอดนิยม:
                </div>
                <ul class="space-y-1 text-xs text-slate-700">
                  <li v-for="(prog, pIdx) in dest.popularPrograms" :key="pIdx" class="flex items-start space-x-1.5">
                    <span class="text-red-500 font-bold">•</span>
                    <span>{{ prog }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Card Action Footer -->
            <div class="pt-3 border-t border-slate-100">
              <NuxtLink 
                :to="dest.link" 
                class="inline-flex items-center space-x-1.5 text-xs font-bold text-red-600 group-hover:text-red-700"
              >
                <span>ดูรายละเอียดสถาบัน</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>
