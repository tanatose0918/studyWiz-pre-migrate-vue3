<script setup lang="ts">
import { ref } from 'vue';

interface BudgetTier {
  id: string;
  badge: string;
  isPopular?: boolean;
  titleTh: string;
  titleEn: string;
  pricePerMonth: string;
  tuitionEst: string;
  livingCostEst: string;
  duration: string;
  visaAndWork: string;
  keyFeatures: string[];
  recommendedCountries: string;
  ctaText: string;
}

const budgetTiers = ref<BudgetTier[]>([
  {
    id: 'language-diploma',
    badge: 'เน้นพัฒนาภาษา & ทักษะทำงาน',
    titleTh: 'หลักสูตรภาษาและวิชาชีพ',
    titleEn: 'Language & Diploma',
    pricePerMonth: 'เริ่มต้น ~35,000 - 48,000 บาท/เดือน',
    tuitionEst: '120,000 - 280,000 บาท / คอร์ส (6 - 12 เดือน)',
    livingCostEst: '25,000 - 38,000 บาท / เดือน',
    duration: 'ระยะเวลา 6 เดือน - 2 ปี',
    visaAndWork: 'สิทธิ์ทำงานพาร์ทไทม์ถูกต้องตามกฎหมาย (ออสเตรเลีย/นิวซีแลนด์ 48 ชม./2 สัปดาห์)',
    keyFeatures: [
      'เริ่มเรียนได้ทุกวันจันทร์ตลอดปี',
      'ไม่จำเป็นต้องมีผลคะแนน IELTS ล่วงหน้า',
      'มีหลักสูตร VET & TAFE พร้อมประกาศนียบัตรวิชาชีพ',
      'โอกาสเปลี่ยนสถานะสู่วีซ่านักศึกษาปริญญาตรี'
    ],
    recommendedCountries: 'ออสเตรเลีย, นิวซีแลนด์, แคนาดา, สหราชอาณาจักร',
    ctaText: 'ปรึกษาหลักสูตรภาษา'
  },
  {
    id: 'undergraduate',
    badge: 'ยอดนิยมสำหรับนักเรียนมัธยม',
    isPopular: true,
    titleTh: 'ปริญญาตรี',
    titleEn: 'Undergraduate Degree',
    pricePerMonth: 'เฉลี่ย ~55,000 - 85,000 บาท/เดือน',
    tuitionEst: '450,000 - 850,000 บาท / ปีการศึกษา',
    livingCostEst: '35,000 - 55,000 บาท / เดือน',
    duration: 'ระยะเวลา 3 - 4 ปี',
    visaAndWork: 'สิทธิ์ทำงานระหว่างเรียน + สิทธิ์ Post-Study Work Visa ทำงานต่อ 2 - 4 ปีหลังจบ',
    keyFeatures: [
      'มีทุนการศึกษาลดหย่อนค่าเล่าเรียน 20% - 50%',
      'หลักสูตร Pathway & Foundation สำหรับผู้มีเกรดเฉลี่ยเริ่มต้น',
      'ระบบการเรียนระดับโลกพร้อมเครือข่ายฝึกงาน (Internship)',
      'โอกาสขอถิ่นที่อยู่ถาวร (PR Pathway) ในบางประเทศ'
    ],
    recommendedCountries: 'สหราชอาณาจักร, ออสเตรเลีย, แคนาดา, สหรัฐอเมริกา',
    ctaText: 'ประเมินคุณสมบัติ ป.ตรี'
  },
  {
    id: 'postgraduate',
    badge: 'คุ้มค่าเวลา & ก้าวหน้าในสายอาชีพ',
    titleTh: 'ปริญญาโท',
    titleEn: 'Postgraduate Degree',
    pricePerMonth: 'เฉลี่ย ~65,000 - 95,000 บาท/เดือน',
    tuitionEst: '550,000 - 980,000 บาท / ตลอดหลักสูตร',
    livingCostEst: '38,000 - 58,000 บาท / เดือน',
    duration: 'ระยะเวลาเพียง 1 ปี (UK) หรือ 1.5 - 2 ปี (AU/USA)',
    visaAndWork: 'สิทธิ์ Post-Study Work Visa 2 - 3 ปีหลังเรียนจบ เพื่อทำงานสะสมประสบการณ์สากล',
    keyFeatures: [
      'UK จบได้ใน 1 ปี ประหยัดค่าครองชีพและเริ่มทำงานได้เร็ว',
      'ทุนการศึกษา Merit-based จากมหาวิทยาลัยชั้นนำ',
      'ไม่ต้องใช้ประสบการณ์ทำงานในหลายสาขาวิชา',
      'เครือข่ายคอนเนคชันระดับผู้บริหารและเพื่อนร่วมชั้นนานาชาติ'
    ],
    recommendedCountries: 'สหราชอาณาจักร, ออสเตรเลีย, สหรัฐอเมริกา, เยอรมนี',
    ctaText: 'วางแผนเรียนต่อ ป.โท'
  }
]);
</script>

<template>
  <section class="py-16 lg:py-24 bg-white text-slate-900 border-y border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
          <AppIcon name="shield" class="w-3.5 h-3.5 text-red-600" />
          <span>Transparent Financial Planning</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          วางแผนงบประมาณอย่างโปร่งใส <span class="text-red-600">ไร้ค่าใช้จ่ายแอบแฝง</span>
        </h2>
        <p class="text-base sm:text-lg text-slate-600 font-medium">
          เริ่มต้นเฉลี่ยเพียง <span class="text-red-600 font-extrabold font-display">35,000 บาท/เดือน</span> วางแผนค่าใช้จ่ายได้ชัดเจนทุกมิติ
        </p>
      </div>

      <!-- 3 Columns Comparison Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div 
          v-for="tier in budgetTiers" 
          :key="tier.id"
          class="rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border"
          :class="tier.isPopular 
            ? 'bg-slate-950 text-white border-red-600/80 shadow-2xl shadow-red-950/20 lg:-translate-y-2' 
            : 'bg-white text-slate-900 border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300'"
        >
          <!-- Popular Badge for Card 2 -->
          <div v-if="tier.isPopular" class="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span class="px-4 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-red-900/40">
              หลักสูตรยอดนิยม (Most Popular)
            </span>
          </div>

          <!-- Top Info -->
          <div class="space-y-6">
            <div>
              <span 
                class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                :class="tier.isPopular ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-100'"
              >
                {{ tier.badge }}
              </span>
              <h3 class="text-2xl font-extrabold font-display" :class="tier.isPopular ? 'text-white' : 'text-slate-900'">
                {{ tier.titleTh }}
              </h3>
              <p class="text-xs font-medium" :class="tier.isPopular ? 'text-slate-400' : 'text-slate-500'">
                {{ tier.titleEn }} ({{ tier.duration }})
              </p>
            </div>

            <!-- Price Highlight -->
            <div 
              class="p-4 rounded-2xl border"
              :class="tier.isPopular ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-100'"
            >
              <div class="text-xs font-bold uppercase tracking-wider" :class="tier.isPopular ? 'text-red-400' : 'text-red-600'">
                ประมาณการงบประมาณรวม
              </div>
              <div class="text-lg sm:text-xl font-extrabold mt-1 font-display" :class="tier.isPopular ? 'text-white' : 'text-slate-900'">
                {{ tier.pricePerMonth }}
              </div>
            </div>

            <!-- Cost Breakdown List -->
            <div class="space-y-3 text-xs">
              <div class="flex items-start justify-between gap-2 pb-2 border-b" :class="tier.isPopular ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'">
                <span class="font-semibold shrink-0">ค่าเล่าเรียน:</span>
                <span class="text-right font-medium" :class="tier.isPopular ? 'text-white' : 'text-slate-800'">{{ tier.tuitionEst }}</span>
              </div>
              
              <div class="flex items-start justify-between gap-2 pb-2 border-b" :class="tier.isPopular ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'">
                <span class="font-semibold shrink-0">ค่าครองชีพ:</span>
                <span class="text-right font-medium" :class="tier.isPopular ? 'text-white' : 'text-slate-800'">{{ tier.livingCostEst }}</span>
              </div>

              <div class="pt-1">
                <span class="font-semibold block mb-1" :class="tier.isPopular ? 'text-slate-300' : 'text-slate-700'">สิทธิ์วีซ่า & การทำงาน:</span>
                <p class="leading-relaxed" :class="tier.isPopular ? 'text-slate-400' : 'text-slate-500'">
                  {{ tier.visaAndWork }}
                </p>
              </div>
            </div>

            <!-- Features Checklist -->
            <div class="pt-2 space-y-2 text-xs">
              <div class="font-bold text-[11px] uppercase tracking-wider" :class="tier.isPopular ? 'text-slate-400' : 'text-slate-400'">
                ไฮไลต์ของหลักสูตร:
              </div>
              <ul class="space-y-2">
                <li 
                  v-for="(feat, fIdx) in tier.keyFeatures" 
                  :key="fIdx" 
                  class="flex items-start space-x-2"
                  :class="tier.isPopular ? 'text-slate-300' : 'text-slate-600'"
                >
                  <AppIcon name="check" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <div class="text-[11px] pt-2" :class="tier.isPopular ? 'text-slate-400' : 'text-slate-500'">
              <span class="font-bold">ประเทศแนะนำ:</span> {{ tier.recommendedCountries }}
            </div>
          </div>

          <!-- Bottom Button -->
          <div class="pt-8">
            <a 
              href="#cta-consultation"
              class="w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-200"
              :class="tier.isPopular 
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50 hover:scale-[1.02]' 
                : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-[1.02]'"
            >
              <span>{{ tier.ctaText }}</span>
              <AppIcon name="arrow-right" class="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      <!-- Trust Note at bottom -->
      <div class="mt-12 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center max-w-2xl mx-auto text-xs text-slate-600">
        💡 <strong>หมายเหตุ:</strong> ค่าใช้จ่ายข้างต้นเป็นตัวเลขประมาณการตามอัตราแลกเปลี่ยนและข้อกำหนดของสถาบันแต่ละแห่ง StudyWiz ยินดีทำตารางสรุปงบประมาณเฉพาะบุคคล (Personalized Budget Plan) ให้ฟรี
      </div>

    </div>
  </section>
</template>
