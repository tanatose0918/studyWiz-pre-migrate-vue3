<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue';

useHead({
  title: 'เกี่ยวกับเรา (About Studywiz) - สถาบันแนะแนวศึกษาต่อต่างประเทศ',
  meta: [
    { name: 'description', content: 'ทำความรู้จัก Studywiz ก่อตั้งขึ้นโดยนักการศึกษาตั้งแต่ปี พ.ศ. 2528 สมาชิก TIECA & FELCA ที่ปรึกษาการเรียนต่อต่างประเทศที่เชื่อถือได้มากว่า 38 ปี' }
  ]
});

const services = [
  {
    icon: 'target',
    title: 'แนะแนวเลือกหลักสูตรที่เหมาะสม',
    desc: 'ประเมินความสนใจ ความถนัด และงบประมาณ เพื่อแนะนำประเทศและมหาวิทยาลัยที่คุ้มค่าที่สุด'
  },
  {
    icon: 'file-text',
    title: 'ดูแลการสมัครเรียนทุกขั้นตอน',
    desc: 'ช่วยตรวจทานเอกสาร Portfolio, SOP และประสานงานส่งใบสมัครโดยตรงกับฝ่ายรับสมัครของสถาบัน'
  },
  {
    icon: 'shield-check',
    title: 'บริการยื่นวีซ่านักเรียนครบวงจร',
    desc: 'ให้คำแนะนำการเตรียมหลักฐานทางการเงิน ซักซ้อมสัมภาษณ์วีซ่า เพื่อให้อัตราผ่านสูงสุด'
  },
  {
    icon: 'home',
    title: 'ประสานงานที่พักและการเดินทาง',
    desc: 'จัดหาหอพักในมหาวิทยาลัย โฮสต์แฟมิลี่ที่ปลอดภัย ตั๋วเครื่องบิน และบริการรถรับส่งจากสนามบิน'
  },
  {
    icon: 'handshake',
    title: 'ดูแลและติดตามผลตลอดการศึกษา',
    desc: 'คอยเป็นที่ปรึกษาเมื่อมีปัญหาทั้งเรื่องการเรียน การปรับตัว และความช่วยเหลือฉุกเฉินตลอดเวลาที่อยู่ต่างแดน'
  },
  {
    icon: 'coins',
    title: 'ให้คำปรึกษาฟรี ไม่มีค่าบริการ',
    desc: 'Studywiz ได้รับการสนับสนุนจากสถาบันการศึกษาพันธมิตร จึงไม่มีการเก็บค่าธรรมเนียมแนะแนวจากนักเรียน'
  }
];
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <SectionHeading 
        badge="About Studywiz"
        title="เราคือใคร และทำไมต้องเลือก Studywiz"
        subtitle="มากกว่า 38 ปีแห่งความมุ่งมั่น เปิดประตูโอกาสการศึกษาในระดับนานาชาติให้กับเยาวชนไทย"
        align="center"
      />

      <!-- Story Narrative Box -->
      <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
          <h3 class="text-2xl font-bold text-slate-900 font-display">
            สถาบันแนะแนวศึกษาต่อต่างประเทศที่เก่าแก่และไว้วางใจได้ที่สุดแห่งหนึ่งในไทย
          </h3>
          <p>
            <strong>Studywiz</strong> ก่อตั้งขึ้นเมื่อปี <strong>พ.ศ. 2528</strong> โดยกลุ่มนักการศึกษาที่มีวิสัยทัศน์ว่า 
            <em>"โอกาสทางการศึกษาในต่างประเทศไม่ควรถูกจำกัดด้วยปัจจัยเรื่องงบประมาณหรือผลการเรียน"</em> 
            เราจึงเป็นผู้บุกเบิกการส่งนักเรียนไทยไปศึกษาต่อในหลากหลายภูมิภาค ทั้งในยุโรปตะวันออกอย่างโปแลนด์ รัสเซีย สหรัฐอเมริกา แคนาดา สหราชอาณาจักร ออสเตรเลีย ตลอดจนเอเชียอย่างเกาหลีใต้ ญี่ปุ่น และจีน
          </p>
          <p>
            เรามีความภาคภูมิใจที่ได้เป็นสมาชิกอย่างเป็นทางการของ <strong>สมาคมไทยแนะแนวการศึกษานานาชาติ (TIECA)</strong> และ <strong>Federation of Education and Language Consultant Associations (FELCA)</strong> ซึ่งเป็นเครื่องการันตีถึงมาตรฐานจริยธรรม ความโปร่งใส และความเชี่ยวชาญในระดับสากล
          </p>
        </div>

        <div class="lg:col-span-5 space-y-4">
          <div class="p-6 rounded-2xl bg-brand-50 border border-brand-100 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
              <AppIcon name="award" class="w-6 h-6 text-brand-600" />
            </div>
            <h4 class="font-bold text-slate-900 text-base">TIECA Accredited</h4>
            <p class="text-xs text-slate-600 leading-normal">
              ได้รับการรับรองจากสมาคมไทยแนะแนวการศึกษานานาชาติ ปฏิบัติตามมาตรฐานการให้คำปรึกษาที่ถูกต้องตามกฎหมายและจรรยาบรรณวิชาชีพ
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-3">
            <div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <AppIcon name="globe" class="w-6 h-6 text-indigo-600" />
            </div>
            <h4 class="font-bold text-slate-900 text-base">FELCA Global Standards</h4>
            <p class="text-xs text-slate-600 leading-normal">
              เชื่อมโยงกับเครือข่ายสมาคมที่ปรึกษาการศึกษาจากทั่วโลก มั่นใจได้ในความสัมพันธ์โดยตรงกับมหาวิทยาลัยชั้นนำ
            </p>
          </div>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-slate-900 font-display mb-8 text-center">
          บริการทางการศึกษาแบบครบวงจรจากเรา
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(s, idx) in services" 
            :key="idx"
            class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3"
          >
            <div class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2">
              <AppIcon :name="s.icon" class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-slate-900 text-base font-display">{{ s.title }}</h4>
            <p class="text-xs text-slate-600 leading-relaxed">{{ s.desc }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
