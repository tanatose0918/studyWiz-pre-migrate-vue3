<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: 'admin'
});

const route = useRoute();
const pageId = computed(() => route.params.id as string);

const page = ref<any>(null);
const isLoading = ref(true);
const isSaving = ref(false);
const saveMessage = ref('');
const selectedSectionIndex = ref<number>(0);
const previewMode = ref<'desktop' | 'mobile'>('desktop');
const showAddBlockModal = ref(false);

const availableComponents = [
  { type: 'HeroLuxuryCarousel', name: 'Hero Section (Luxury Minimal)', desc: 'สไลเดอร์หัวเว็บสไตล์ลักชัวรี พร้อมริบบอนสถิติ' },
  { type: 'DestinationsGrid', name: 'Destinations Grid (จุดหมายปลายทาง)', desc: 'การ์ด 4 ประเทศ หรือ 16 ประเทศพร้อมธงชาติ' },
  { type: 'BudgetComparison', name: 'Budget Planning (ตารางงบประมาณ)', desc: 'ตารางเปรียบเทียบค่าใช้จ่าย 3 คอลัมน์' },
  { type: 'BentoGridWhyUs', name: 'Why Us (เบนโตะกริด 4 กล่อง)', desc: 'SOP, วีซ่า 100%, ศิษย์เก่า, กล่องรีวิวนักเรียน' },
  { type: 'CtaFastBooking', name: 'Fast Booking CTA (สีแดง Crimson)', desc: 'แบนเนอร์สีแดง Crimson พร้อมฟอร์มและ QR Code' },
  { type: 'ProgramGrid', name: 'Program / School Grid', desc: 'การ์ดแยกหลักสูตรหรือโรงเรียนมัธยม' },
  { type: 'CostBreakdownTable', name: 'Cost Breakdown Table (ตารางค่าใช้จ่าย)', desc: 'ตารางค่าเล่าเรียนและหอพักโปร่งใส (RMB/THB)' },
  { type: 'FeaturedBlogFeed', name: 'Context Blog Feed (บทความ)', desc: 'ฟีดบทความล่าสุดตาม Blog Context' },
  { type: 'PhilosophyVideo', name: 'Philosophy & YouTube Video', desc: 'กล่องเรื่องราวองค์กร + ฝังวิดีโอ YouTube + ตรา TIECA' },
  { type: 'CtaBannerStrip', name: 'Consultation Banner Strip', desc: 'แถบแบนเนอร์ขนาดกะทัดรัดพร้อมปุ่มติดต่อด่วน' },
  { type: 'SectionHeading', name: 'Section Heading (หัวข้อคั่น)', desc: 'บล็อกหัวข้อมาตรฐานพร้อม Badge' }
];

const loadPageData = async () => {
  isLoading.value = true;
  try {
    const slug = pageId.value === 'home' ? '' : pageId.value;
    const res: any = await $fetch(`/api/pages/${slug || 'home'}`);
    if (res && res.data) {
      page.value = res.data;
      if (!page.value.sections) page.value.sections = [];
    }
  } catch (err: any) {
    console.error('Failed to load page:', err);
  } finally {
    isLoading.value = false;
  }
};

const savePage = async () => {
  if (!page.value) return;
  isSaving.value = true;
  saveMessage.value = '';
  try {
    await $fetch(`/api/pages/${page.value._id}`, {
      method: 'PUT',
      body: page.value
    });
    saveMessage.value = '✔ บันทึก Section Blocks ลง Atlas สำเร็จ!';
    setTimeout(() => { saveMessage.value = ''; }, 3500);
  } catch (err: any) {
    alert('เกิดข้อผิดพลาด: ' + err.message);
  } finally {
    isSaving.value = false;
  }
};

const moveSection = (index: number, direction: 'up' | 'down') => {
  const target = direction === 'up' ? index - 1 : index + 1;
  if (!page.value || target < 0 || target >= page.value.sections.length) return;
  const temp = page.value.sections[index];
  page.value.sections[index] = page.value.sections[target];
  page.value.sections[target] = temp;
  selectedSectionIndex.value = target;
};

const removeSection = (index: number) => {
  if (confirm('ยืนยันลบบล็อกนี้ออกจากหน้า?')) {
    page.value.sections.splice(index, 1);
    if (selectedSectionIndex.value >= page.value.sections.length) {
      selectedSectionIndex.value = Math.max(0, page.value.sections.length - 1);
    }
  }
};

const addComponentBlock = (comp: any) => {
  const newBlock = {
    id: `sec-${Date.now()}`,
    componentType: comp.type,
    name: comp.name,
    order: (page.value.sections?.length || 0) + 1,
    isEnabled: true,
    props: {
      title: comp.name,
      subtitle: comp.desc
    }
  };
  page.value.sections.push(newBlock);
  selectedSectionIndex.value = page.value.sections.length - 1;
  showAddBlockModal.value = false;
};

const currentSelectedSection = computed(() => {
  if (!page.value || !page.value.sections) return null;
  return page.value.sections[selectedSectionIndex.value] || null;
});

onMounted(() => {
  loadPageData();
});
</script>

<template>
  <div class="h-[calc(100vh-5rem)] flex flex-col space-y-4">
    
    <!-- Top Action Bar -->
    <div class="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
      <div class="flex items-center space-x-3">
        <NuxtLink to="/admin/pages" class="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition">
          ←
        </NuxtLink>
        <div>
          <div class="flex items-center space-x-2 text-[11px] text-brand-400 font-mono">
            <span>PAGES</span>
            <span>/</span>
            <span>BUILDER</span>
          </div>
          <h2 class="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <span>{{ page?.title || 'กำลังโหลด...' }}</span>
            <span class="text-xs text-slate-500 font-mono font-normal">({{ page?.path }})</span>
          </h2>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <!-- Viewport Switcher -->
        <div class="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button 
            @click="previewMode = 'desktop'"
            class="px-2.5 py-1 rounded-lg text-xs font-semibold transition"
            :class="previewMode === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
          >
            🖥 Desktop
          </button>
          <button 
            @click="previewMode = 'mobile'"
            class="px-2.5 py-1 rounded-lg text-xs font-semibold transition"
            :class="previewMode === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
          >
            📱 Mobile
          </button>
        </div>

        <button
          @click="savePage"
          class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-600/30 transition flex items-center space-x-2"
          :disabled="isLoading || isSaving"
        >
          <span v-if="isSaving" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ isSaving ? 'กำลังบันทึก...' : '💾 บันทึก Sections' }}</span>
        </button>
      </div>
    </div>

    <!-- Alert / Toast -->
    <div v-if="saveMessage" class="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between shrink-0">
      <span>{{ saveMessage }}</span>
      <span class="text-[10px] font-mono text-emerald-400">SYNCED</span>
    </div>

    <!-- Main Workspace (Left Canvas + Right Live Preview) -->
    <div v-if="!isLoading && page" class="flex-1 flex overflow-hidden gap-4">
      
      <!-- LEFT COLUMN: Section Blocks List & Inspector -->
      <div class="w-80 lg:w-96 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shrink-0">
        
        <!-- Blocks Header -->
        <div class="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <span class="text-xs font-bold text-white">Section Blocks ({{ page.sections?.length || 0 }})</span>
          <button 
            @click="showAddBlockModal = true"
            class="px-2.5 py-1 rounded-lg bg-brand-600 text-white text-[11px] font-bold hover:bg-brand-500 transition flex items-center space-x-1"
          >
            <span>+ เพิ่มบล็อก</span>
          </button>
        </div>

        <!-- Blocks Drag/Reorder List -->
        <div class="flex-1 overflow-y-auto p-3 space-y-2">
          <div 
            v-for="(sec, idx) in page.sections" 
            :key="sec.id || idx"
            @click="selectedSectionIndex = idx"
            class="p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between"
            :class="selectedSectionIndex === idx ? 'bg-slate-900 border-brand-500 text-white shadow-md' : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'"
          >
            <div class="flex items-center space-x-2.5 truncate">
              <span class="font-mono text-slate-600 text-[10px]">#{{ idx + 1 }}</span>
              <div class="truncate">
                <div class="font-bold truncate text-slate-200">{{ sec.name || sec.componentType }}</div>
                <div class="text-[10px] text-slate-500 font-mono truncate">{{ sec.componentType }}</div>
              </div>
            </div>

            <!-- Controls -->
            <div class="flex items-center space-x-1 shrink-0">
              <input 
                type="checkbox" 
                v-model="sec.isEnabled" 
                class="rounded bg-slate-800 border-slate-700 text-brand-600"
                title="เปิด/ปิดการแสดงผล"
                @click.stop
              />
              <button 
                @click.stop="moveSection(idx, 'up')" 
                :disabled="idx === 0" 
                class="p-1 text-slate-500 hover:text-white disabled:opacity-20"
              >
                ▲
              </button>
              <button 
                @click.stop="moveSection(idx, 'down')" 
                :disabled="idx === page.sections.length - 1" 
                class="p-1 text-slate-500 hover:text-white disabled:opacity-20"
              >
                ▼
              </button>
              <button 
                @click.stop="removeSection(idx)" 
                class="p-1 text-red-500 hover:text-red-400"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Selected Block Props Editor -->
        <div v-if="currentSelectedSection" class="p-4 border-t border-slate-800 bg-slate-900/50 space-y-3 shrink-0 max-h-64 overflow-y-auto">
          <div class="text-[11px] font-bold text-slate-300">
            แก้ไขบล็อก: <span class="text-brand-400">{{ currentSelectedSection.componentType }}</span>
          </div>

          <div class="space-y-1">
            <span class="text-[10px] text-slate-400">ชื่อเรียกของบล็อก:</span>
            <input 
              v-model="currentSelectedSection.name" 
              type="text" 
              class="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div v-if="currentSelectedSection.props" class="space-y-2">
            <div v-if="'title' in currentSelectedSection.props" class="space-y-1">
              <span class="text-[10px] text-slate-400">หัวข้อ (Title):</span>
              <input 
                v-model="currentSelectedSection.props.title" 
                type="text" 
                class="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
            <div v-if="'subtitle' in currentSelectedSection.props" class="space-y-1">
              <span class="text-[10px] text-slate-400">คำบรรยายย่อย (Subtitle):</span>
              <textarea 
                v-model="currentSelectedSection.props.subtitle" 
                rows="2"
                class="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white"
              ></textarea>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN: Interactive Live Preview Canvas -->
      <div class="flex-1 flex flex-col items-center bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative p-4">
        <div class="w-full flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 mb-3">
          <span class="font-mono text-[11px]">LIVE INTERACTIVE PREVIEW CANVAS</span>
          <span class="text-[11px] text-emerald-400">Rendering Mode: {{ previewMode.toUpperCase() }}</span>
        </div>

        <div 
          class="flex-1 w-full overflow-y-auto bg-slate-900 rounded-xl border border-slate-800 transition-all p-4 space-y-4"
          :class="previewMode === 'mobile' ? 'max-w-sm border-2 border-slate-700 shadow-2xl' : 'w-full'"
        >
          <!-- Mock Component Previews -->
          <div 
            v-for="(sec, idx) in page.sections" 
            :key="sec.id || idx"
            class="rounded-xl border p-4 transition"
            :class="[
              sec.isEnabled ? 'bg-slate-950' : 'bg-slate-950/40 opacity-40',
              selectedSectionIndex === idx ? 'border-brand-500 shadow-md ring-1 ring-brand-500/30' : 'border-slate-800'
            ]"
          >
            <div class="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-2">
              <span class="font-bold text-slate-300">[{{ sec.componentType }}]</span>
              <span>{{ sec.isEnabled ? 'Active' : 'Hidden' }}</span>
            </div>

            <!-- Preview Mock Render -->
            <div class="space-y-1.5">
              <h4 class="text-sm font-bold text-white">{{ sec.props?.title || sec.name }}</h4>
              <p class="text-xs text-slate-400 leading-relaxed">{{ sec.props?.subtitle || 'รายละเอียดบล็อกคอมโพเนนต์พร้อมรับการเรนเดอร์ในหน้าบ้าน' }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal: Add Component Block Palette -->
    <transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showAddBlockModal" 
        class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="showAddBlockModal = false"
      >
        <div class="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white">เลือกคอมโพเนนต์บล็อก (Block Palette)</h3>
            <button @click="showAddBlockModal = false" class="text-slate-500 hover:text-white">✕</button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
            <button
              v-for="comp in availableComponents"
              :key="comp.type"
              @click="addComponentBlock(comp)"
              class="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-500 hover:bg-slate-900 text-left transition group space-y-1"
            >
              <div class="text-xs font-bold text-white group-hover:text-brand-400 transition">{{ comp.name }}</div>
              <div class="text-[10px] text-slate-400 leading-relaxed">{{ comp.desc }}</div>
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
