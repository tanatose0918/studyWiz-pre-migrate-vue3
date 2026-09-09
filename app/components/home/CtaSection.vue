<script setup lang="ts">
import { ref } from 'vue';
import siteSettings from '~/data/siteSettings.json';

const lineUrl = siteSettings.socialLinks.line;
const phones = siteSettings.hotlinePhones;

// Form state
const formState = ref({
  fullName: '',
  phoneOrLine: '',
  destination: 'uk',
  studyLevel: 'master',
  notes: ''
});

const isSubmitted = ref(false);
const isSubmitting = ref(false);

const submitForm = () => {
  if (!formState.value.fullName || !formState.value.phoneOrLine) {
    alert('กรุณากรอกชื่อและเบอร์โทร/LINE เพื่อให้เจ้าหน้าที่ติดต่อกลับครับ');
    return;
  }
  
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    isSubmitted.value = true;
  }, 600);
};

const resetForm = () => {
  formState.value = {
    fullName: '',
    phoneOrLine: '',
    destination: 'uk',
    studyLevel: 'master',
    notes: ''
  };
  isSubmitted.value = false;
};
</script>

<template>
  <section id="cta-consultation" class="py-16 lg:py-24 bg-slate-950 text-white relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Full-Width Crimson Red Banner with rounded-3xl -->
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-rose-700 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-red-950/60 border border-red-500/40">
        
        <!-- Decorative Glow Patterns -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left: Headline & LINE QR Container (6 cols) -->
          <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
              <AppIcon name="sparkles" class="w-3.5 h-3.5 text-amber-300" />
              <span>One-on-One Free Consultation</span>
            </div>

            <!-- Headline -->
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              จองเวลาปรึกษาวางแผนเรียนต่อฟรี <br class="hidden sm:inline" />
              กับผู้เชี่ยวชาญวันนี้
            </h2>

            <!-- Subtext -->
            <p class="text-base sm:text-lg text-red-100 font-medium max-w-xl leading-relaxed">
              ไม่มีค่าใช้จ่ายในการให้คำปรึกษาเบื้องต้น พร้อมประเมินโอกาสขอทุนฟรีและวางแผนงบประมาณเฉพาะบุคคล
            </p>

            <!-- Quick Direct Contact Links -->
            <div class="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                :href="lineUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-red-700 hover:bg-slate-100 font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-105"
              >
                <AppIcon name="line" class="w-5 h-5 text-emerald-500" />
                <span>แอดไลน์ @studywiz เพื่อปรึกษาด่วน</span>
              </a>

              <a 
                :href="`tel:${phones[0]?.replace(/[^\d+]/g, '') || '0819349695'}`"
                class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-900/40 hover:bg-red-900/60 text-white border border-white/30 font-semibold text-sm flex items-center justify-center space-x-2 transition"
              >
                <AppIcon name="phone" class="w-4 h-4 text-white" />
                <span>โทร {{ phones[0] || '08-1934-9695' }}</span>
              </a>
            </div>

            <!-- Designated Container for LINE Official QR Code -->
            <div class="pt-4 flex items-center justify-center lg:justify-start space-x-4">
              <div class="p-2.5 bg-white rounded-2xl shadow-xl flex-shrink-0 border-2 border-white/80">
                <!-- SVG simulated QR or official QR frame -->
                <div class="w-24 h-24 bg-slate-900 rounded-xl p-2 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  <AppIcon name="line" class="w-8 h-8 text-emerald-400 mb-1" />
                  <span class="text-[9px] font-bold text-white tracking-tighter">@studywiz</span>
                  <div class="absolute inset-0 bg-emerald-600/90 text-white flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Scan Line
                  </div>
                </div>
              </div>
              <div class="text-xs text-red-100 text-left space-y-1">
                <div class="font-bold text-white text-sm">สแกน LINE QR Code</div>
                <div>แชตคุยกับพี่ๆ ที่ปรึกษาได้ทันที</div>
                <div class="text-[11px] text-red-200">เปิดทำการ จันทร์-เสาร์ 09:00 - 18:00 น.</div>
              </div>
            </div>

          </div>

          <!-- Right: Fast Contact Form Card (6 cols) -->
          <div class="lg:col-span-6">
            <div class="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40">
              
              <!-- Success State -->
              <div v-if="isSubmitted" class="py-8 text-center space-y-4">
                <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <AppIcon name="check" class="w-8 h-8 text-emerald-600" />
                </div>
                <h3 class="text-2xl font-bold text-slate-900 font-display">
                  ได้รับข้อมูลเรียบร้อยแล้วครับ!
                </h3>
                <p class="text-sm text-slate-600 max-w-sm mx-auto">
                  เจ้าหน้าที่ผู้เชี่ยวชาญของ StudyWiz จะติดต่อกลับเพื่อให้ข้อมูลและแนะนำแนวทางเรียนต่อโดยเร็วที่สุด
                </p>
                <div class="pt-2">
                  <button 
                    @click="resetForm" 
                    class="text-xs font-bold text-red-600 hover:text-red-700 underline"
                  >
                    ส่งข้อมูลเพิ่มเติมอีกครั้ง
                  </button>
                </div>
              </div>

              <!-- Form State -->
              <form v-else @submit.prevent="submitForm" class="space-y-4">
                <div class="border-b border-slate-100 pb-3 mb-4">
                  <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                    กรอกแบบฟอร์มนัดหมายให้คำปรึกษา
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5">
                    กรอกข้อมูลเพื่อให้เจ้าหน้าที่เตรียมข้อมูลหลักสูตรและทุนที่ตรงกับคุณ
                  </p>
                </div>

                <!-- Full Name -->
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">
                    ชื่อ - นามสกุล หรือ ชื่อเล่น <span class="text-red-600">*</span>
                  </label>
                  <input 
                    v-model="formState.fullName" 
                    type="text" 
                    required 
                    placeholder="เช่น น้องมุก / นายธนภัทร"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <!-- Phone or LINE ID -->
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">
                    เบอร์โทรศัพท์ หรือ LINE ID <span class="text-red-600">*</span>
                  </label>
                  <input 
                    v-model="formState.phoneOrLine" 
                    type="text" 
                    required 
                    placeholder="เช่น 081-xxx-xxxx หรือ Line ID"
                    class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <!-- Destination & Level in 2 columns -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">
                      ประเทศที่สนใจ
                    </label>
                    <select 
                      v-model="formState.destination" 
                      class="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    >
                      <option value="uk">สหราชอาณาจักร (UK)</option>
                      <option value="australia">ออสเตรเลีย (AU)</option>
                      <option value="usa">สหรัฐอเมริกา (USA)</option>
                      <option value="canada">แคนาดา (CA)</option>
                      <option value="new-zealand">นิวซีแลนด์ (NZ)</option>
                      <option value="europe">ยุโรป (เยอรมนี/สวิต/ฝรั่งเศส)</option>
                      <option value="asia">เอเชีย (ญี่ปุ่น/จีน/สิงคโปร์)</option>
                      <option value="undecided">ยังไม่ได้ระบุ / ขอคำแนะนำ</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">
                      ระดับการศึกษา
                    </label>
                    <select 
                      v-model="formState.studyLevel" 
                      class="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    >
                      <option value="language">เรียนภาษา & คอร์สระยะสั้น</option>
                      <option value="highschool">มัธยมศึกษา (High School)</option>
                      <option value="diploma">อนุปริญญา / วิชาชีพ (VET)</option>
                      <option value="bachelor">ปริญญาตรี (Undergraduate)</option>
                      <option value="master">ปริญญาโท (Master's Degree)</option>
                      <option value="phd">ปริญญาเอก (Doctoral Degree)</option>
                    </select>
                  </div>
                </div>

                <!-- Optional Notes -->
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">
                    เป้าหมาย / สาขาที่สนใจ / ข้อสอบถามเพิ่มเติม (ถ้ามี)
                  </label>
                  <textarea 
                    v-model="formState.notes" 
                    rows="2"
                    placeholder="เช่น อยากได้ทุน ป.โท ด้าน Data หรือวางแผนไปเรียนปีหน้าครับ"
                    class="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  :disabled="isSubmitting"
                  class="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center space-x-2"
                >
                  <span v-if="isSubmitting">กำลังส่งข้อมูล...</span>
                  <span v-else>ส่งข้อมูลเพื่อนัดหมายเวลาปรึกษาฟรี</span>
                  <AppIcon name="arrow-right" class="w-4 h-4" />
                </button>

                <p class="text-[11px] text-slate-400 text-center">
                  🔒 ข้อมูลของคุณจะถูกเก็บเป็นความลับตามนโยบาย PDPA สำหรับการแนะแนวการศึกษาเท่านั้น
                </p>
              </form>

            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
