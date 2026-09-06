<script setup lang="ts">
import { ref } from 'vue';
import siteSettings from '~/data/siteSettings.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

useHead({
  title: 'ติดต่อเรา (Contact Us) - Studywiz ศูนย์แนะแนวศึกษาต่อต่างประเทศ',
  meta: [
    { name: 'description', content: 'ติดต่อสำนักงาน Studywiz กรุงเทพฯ พหลโยธิน 19/1 และสำนักงานเชียงใหม่ โทร 08-1934-9695 หรือส่งข้อความปรึกษาฟรี' }
  ]
});

const bkk = siteSettings.bangkokOffice;
const cnx = siteSettings.chiangmaiOffice;
const communities = siteSettings.lineCommunities;

// Form State
const formData = ref({
  name: '',
  phone: '',
  lineId: '',
  email: '',
  subject: 'ปรึกษาเรียนต่อทั่วไป',
  message: ''
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.phone || !formData.value.email || !formData.value.message) {
    errorMessage.value = 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อ, เบอร์โทร, อีเมล, ข้อความ)';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';
  submitSuccess.value = false;

  try {
    const res: any = await $fetch('/api/contact', {
      method: 'POST',
      body: formData.value
    });

    if (res.success) {
      submitSuccess.value = true;
      formData.value = {
        name: '',
        phone: '',
        lineId: '',
        email: '',
        subject: 'ปรึกษาเรียนต่อทั่วไป',
        message: ''
      };
    }
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง หรือติดต่อทาง Line';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <SectionHeading 
        badge="Contact Studywiz"
        title="ติดต่อเรา และช่องทางการปรึกษา"
        subtitle="ทีมงานแนะแนวพร้อมตอบทุกข้อสงสัย นัดหมายพบปะที่สำนักงาน หรือพูดคุยออนไลน์ได้สะดวกทุกช่องทาง"
        align="center"
      />

      <!-- 2 Offices Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
        
        <!-- Bangkok Office (7 cols) -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl font-bold">
                🏢
              </div>
              <div>
                <h3 class="font-bold text-xl text-slate-900 font-display">
                  {{ bkk.title }}
                </h3>
                <span class="text-xs text-brand-600 font-medium">Headquarter (จตุจักร)</span>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              📍 {{ bkk.address }}
            </p>

            <div class="space-y-2 pt-2">
              <div class="text-xs font-semibold text-slate-700">เบอร์โทรศัพท์สายด่วน:</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a 
                  v-for="p in bkk.phones" 
                  :key="p" 
                  :href="`tel:${p.replace(/[^\d+]/g, '')}`"
                  class="p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-600 text-xs font-semibold text-slate-700 border border-slate-100 flex items-center space-x-2 transition"
                >
                  <span>📞</span>
                  <span>{{ p }}</span>
                </a>
              </div>
            </div>

            <div class="pt-2">
              <span class="text-xs font-semibold text-slate-700">อีเมลแผนกกลาง: </span>
              <a :href="`mailto:${bkk.email}`" class="text-xs font-bold text-brand-600 hover:underline">
                {{ bkk.email }}
              </a>
            </div>
          </div>

          <!-- Google Maps Embed -->
          <div class="rounded-2xl overflow-hidden aspect-[16/7] border border-slate-100 bg-slate-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.5684784409395!2d100.56383637509127!3d13.80489998659858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d0046522c07%3A0x6b4fbfe3c2242177!2sStudywiz!5e0!3m2!1sth!2sth!4v1715000000000!5m2!1sth!2sth" 
              class="w-full h-full border-0" 
              allowfullscreen 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <!-- Chiang Mai Office & Communities (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Chiang Mai Card -->
          <div class="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
                🏔️
              </div>
              <div>
                <h3 class="font-bold text-lg text-slate-900 font-display">
                  {{ cnx.title }}
                </h3>
                <span class="text-xs text-emerald-600 font-medium">ภาคเหนือ</span>
              </div>
            </div>

            <div class="space-y-2 text-xs text-slate-600">
              <a 
                :href="`tel:${cnx.phones[0].replace(/[^\d+]/g, '')}`"
                class="block p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 font-semibold border border-slate-100 transition"
              >
                📞 เบอร์โทรศัพท์: {{ cnx.phones[0] }}
              </a>
              <a 
                :href="`mailto:${cnx.email}`"
                class="block p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 font-semibold border border-slate-100 transition"
              >
                ✉️ อีเมล: {{ cnx.email }}
              </a>
            </div>
          </div>

          <!-- Line OpenChat Communities -->
          <div class="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-7 border border-emerald-100 space-y-4">
            <div class="flex items-center space-x-2">
              <span class="text-2xl">💬</span>
              <h3 class="font-bold text-base text-slate-900 font-display">
                เข้าร่วมกลุ่มพูดคุย Line OpenChat
              </h3>
            </div>
            
            <p class="text-xs text-slate-600 leading-relaxed">
              แลกเปลี่ยนข้อมูล ทุนการศึกษา และอัปเดตข้อสอบจากเพื่อนๆ และรุ่นพี่นักเรียนนอก
            </p>

            <div class="space-y-2.5 pt-1">
              <a 
                v-for="(com, idx) in communities" 
                :key="idx"
                :href="com.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="block p-3 rounded-2xl bg-white hover:bg-emerald-500 hover:text-white border border-emerald-200/80 shadow-sm transition group"
              >
                <div class="font-bold text-xs text-slate-800 group-hover:text-white flex items-center justify-between">
                  <span>{{ com.name }}</span>
                  <span>↗</span>
                </div>
                <div class="text-[11px] text-slate-500 group-hover:text-emerald-100 pt-0.5">
                  {{ com.description }}
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>

      <!-- Contact Inquiry Form -->
      <div class="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
        <div class="text-center mb-8 space-y-2">
          <span class="px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold uppercase tracking-wider">
            Inquiry Form
          </span>
          <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            ฝากข้อความถึงเรา (ปรึกษาฟรี)
          </h3>
          <p class="text-xs sm:text-sm text-slate-600">
            กรอกข้อมูลเบื้องต้นเพื่อให้เจ้าหน้าที่เตรียมข้อมูลหลักสูตรและติดต่อกลับอย่างรวดเร็วที่สุด
          </p>
        </div>

        <!-- Success Alert -->
        <div 
          v-if="submitSuccess" 
          class="p-4 mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start space-x-3"
        >
          <span class="text-xl">✅</span>
          <div class="leading-relaxed">
            <strong>ส่งข้อความสำเร็จแล้ว!</strong> เจ้าหน้าที่ Studywiz ได้รับข้อมูลเรียบร้อยแล้ว และจะติดต่อกลับท่านโดยเร็วที่สุดครับ
          </div>
        </div>

        <!-- Error Alert -->
        <div 
          v-if="errorMessage" 
          class="p-4 mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2"
        >
          <span>⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Name -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-700">
                ชื่อ-นามสกุล <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.name"
                type="text" 
                required
                placeholder="เช่น สมชาย ใจดี"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
              />
            </div>

            <!-- Phone -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-700">
                เบอร์โทรศัพท์ติดต่อ <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.phone"
                type="tel" 
                required
                placeholder="เช่น 081-xxx-xxxx"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
              />
            </div>

            <!-- Line ID -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-700">
                Line ID (สำหรับติดต่อกลับ)
              </label>
              <input 
                v-model="formData.lineId"
                type="text" 
                placeholder="ไอดีไลน์ (ถ้ามี)"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
              />
            </div>

            <!-- Email -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-700">
                อีเมล <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.email"
                type="email" 
                required
                placeholder="เช่น name@email.com"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <!-- Subject -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700">
              เรื่องที่สนใจปรึกษา
            </label>
            <select 
              v-model="formData.subject"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm bg-white"
            >
              <option value="ปรึกษาเรียนต่อทั่วไป">ปรึกษาเรียนต่อทั่วไป</option>
              <option value="หลักสูตรภาษา (Language Programs)">หลักสูตรภาษา (Language Programs)</option>
              <option value="โรงเรียนมัธยมในต่างประเทศ (High School)">โรงเรียนมัธยมในต่างประเทศ (High School)</option>
              <option value="ศึกษาต่อระดับปริญญาตรี/โท/เอก (University)">ศึกษาต่อระดับปริญญาตรี/โท/เอก (University)</option>
              <option value="เรียนแพทย์ในโปแลนด์หรือรัสเซีย">เรียนแพทย์ในโปแลนด์หรือรัสเซีย</option>
              <option value="สอบถามทุนการศึกษา">สอบถามทุนการศึกษา</option>
            </select>
          </div>

          <!-- Message -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700">
              ข้อความหรือคำถามที่ต้องการปรึกษา <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="formData.message"
              rows="4" 
              required
              placeholder="ระบุคำถาม เช่น สอบถามค่าใช้จ่าย, วุฒิการศึกษาปัจจุบัน, ประเทศที่สนใจ..."
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="w-full py-3.5 px-6 rounded-xl bg-btn hover:bg-btn-hover active:bg-btn-active text-white font-bold text-sm shadow-btn hover:shadow-btn-hover transition flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            <span v-if="isSubmitting">กำลังส่งข้อความ...</span>
            <span v-else>ส่งข้อความปรึกษาฟรี</span>
            <span v-if="!isSubmitting">✉️</span>
          </button>
        </form>
      </div>

    </div>
  </div>
</template>
