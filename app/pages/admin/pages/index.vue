<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: 'admin'
});

const route = useRoute();
const pages = ref<any[]>([]);
const isLoading = ref(true);
const searchQuery = ref('');
const showNewModal = ref(false);

// New Page Form
const newPageForm = ref({
  title: '',
  slug: '',
  templateType: 'custom',
  seo: {
    metaTitle: '',
    metaDescription: ''
  }
});
const isCreating = ref(false);

const loadPages = async () => {
  isLoading.value = true;
  try {
    const res: any = await $fetch('/api/pages');
    if (res && res.data) {
      pages.value = res.data;
    }
  } catch (err) {
    console.error('Failed to load pages:', err);
  } finally {
    isLoading.value = false;
  }
};

const filteredPages = computed(() => {
  if (!searchQuery.value) return pages.value;
  const q = searchQuery.value.toLowerCase();
  return pages.value.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.slug.toLowerCase().includes(q) || 
    p.path.toLowerCase().includes(q)
  );
});

// Auto-derive slug from title
const onTitleChange = () => {
  if (!newPageForm.value.slug) {
    newPageForm.value.slug = newPageForm.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  if (!newPageForm.value.seo.metaTitle) {
    newPageForm.value.seo.metaTitle = `${newPageForm.value.title} - Studywiz`;
  }
};

const createPage = async () => {
  if (!newPageForm.value.title || !newPageForm.value.slug) {
    alert('กรุณากรอกชื่อหน้าและ URL Slug');
    return;
  }

  isCreating.value = true;
  try {
    // Generate initial sections based on template preset
    let sections: any[] = [];
    if (newPageForm.value.templateType === 'institution') {
      sections = [
        {
          id: `sec-${Date.now()}-1`,
          componentType: 'SectionHeading',
          name: 'Institution Header & Cover',
          order: 1,
          isEnabled: true,
          props: { title: newPageForm.value.title, subtitle: 'ข้อมูลสถาบันและหลักสูตรอย่างเป็นทางการ' }
        },
        {
          id: `sec-${Date.now()}-2`,
          componentType: 'CostBreakdownTable',
          name: 'Transparent Cost Table',
          order: 2,
          isEnabled: true,
          props: { currency: 'RMB', note: 'ตารางค่าเล่าเรียนและค่าหอพัก' }
        },
        {
          id: `sec-${Date.now()}-3`,
          componentType: 'CtaFastBooking',
          name: 'Direct Application CTA',
          order: 3,
          isEnabled: true
        }
      ];
    } else if (newPageForm.value.templateType === 'country-hub') {
      sections = [
        {
          id: `sec-${Date.now()}-1`,
          componentType: 'HeroBannerSlider',
          name: 'Country Hub Hero Banner',
          order: 1,
          isEnabled: true
        },
        {
          id: `sec-${Date.now()}-2`,
          componentType: 'ProgramGrid',
          name: 'Partner Universities Grid',
          order: 2,
          isEnabled: true
        }
      ];
    } else {
      sections = [
        {
          id: `sec-${Date.now()}-1`,
          componentType: 'HeroLuxuryCarousel',
          name: 'Hero Section',
          order: 1,
          isEnabled: true
        },
        {
          id: `sec-${Date.now()}-2`,
          componentType: 'CtaFastBooking',
          name: 'Call-to-Action Form',
          order: 2,
          isEnabled: true
        }
      ];
    }

    const payload = {
      ...newPageForm.value,
      sections
    };

    const res: any = await $fetch('/api/pages', {
      method: 'POST',
      body: payload
    });

    if (res && res.success) {
      showNewModal.value = false;
      // Reset form
      newPageForm.value = {
        title: '',
        slug: '',
        templateType: 'custom',
        seo: { metaTitle: '', metaDescription: '' }
      };
      await loadPages();
      alert('สร้างหน้าใหม่สำเร็จแล้ว!');
    }
  } catch (err: any) {
    alert('เกิดข้อผิดพลาด: ' + (err.data?.statusMessage || err.message));
  } finally {
    isCreating.value = false;
  }
};

const deletePage = async (page: any) => {
  if (page.isSystem) {
    alert('หน้าหลักของระบบไม่สามารถลบได้');
    return;
  }
  if (!confirm(`ยืนยันการลบหน้า "${page.title}" (${page.path})?`)) return;

  try {
    await $fetch(`/api/pages/${page._id}`, { method: 'DELETE' });
    await loadPages();
  } catch (err: any) {
    alert('ลบไม่สำเร็จ: ' + err.message);
  }
};

onMounted(() => {
  loadPages();
  if (route.query.action === 'new') {
    showNewModal.value = true;
  }
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    
    <!-- Header & Search / Add -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center space-x-2 text-xs text-brand-400 font-mono mb-1">
          <span>CONTENT MANAGEMENT</span>
          <span>/</span>
          <span>PAGES</span>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">จัดการหน้าเว็บไซต์ (Pages Management)</h2>
        <p class="text-xs text-slate-400 mt-1">
          ควบคุมหน้าหลักและ Landing Pages ทั้งหมด ประกอบ Section บล็อกได้อิสระ
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="ค้นหาตามชื่อหน้า หรือ URL..." 
          class="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 w-48 sm:w-64"
        />
        <button
          @click="showNewModal = true"
          class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-600/30 transition flex items-center space-x-1.5 shrink-0"
        >
          <AppIcon name="plus" class="w-4 h-4" />
          <span>สร้างหน้าใหม่ [+]</span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-12 text-center text-slate-500 space-y-3">
      <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-xs">กำลังดึงรายชื่อหน้าจาก MongoDB Atlas...</p>
    </div>

    <!-- Pages Table / Grid -->
    <div v-else class="grid grid-cols-1 gap-3">
      <div 
        v-for="page in filteredPages" 
        :key="page._id"
        class="bg-slate-950 rounded-2xl border border-slate-800 p-5 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
      >
        <div class="space-y-1.5">
          <div class="flex items-center space-x-2">
            <h3 class="text-sm font-bold text-white">{{ page.title }}</h3>
            <span 
              v-if="page.isSystem" 
              class="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-mono"
            >
              System Page
            </span>
            <span 
              class="px-2 py-0.5 rounded-md text-[10px] font-semibold"
              :class="page.status === 'published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-amber-950 text-amber-400 border border-amber-800/40'"
            >
              {{ page.status === 'published' ? '● เผยแพร่แล้ว' : '○ ฉบับร่าง' }}
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
            <span class="text-brand-400 font-medium">{{ page.path }}</span>
            <span>•</span>
            <span>{{ page.sections?.length || 0 }} Section Blocks</span>
            <span v-if="page.seo?.metaTitle" class="text-slate-500 text-[11px] font-sans truncate max-w-xs">
              SEO: {{ page.seo.metaTitle }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-2 shrink-0">
          <NuxtLink
            :to="`/admin/pages/${page.slug || 'home'}`"
            class="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-brand-500 hover:text-brand-400 text-slate-300 text-xs font-semibold transition flex items-center space-x-1.5"
          >
            <AppIcon name="settings" class="w-3.5 h-3.5" />
            <span>ออกแบบ Sections</span>
          </NuxtLink>

          <NuxtLink
            :to="page.path"
            target="_blank"
            class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            title="ดูหน้าจริงบนเว็บ"
          >
            <AppIcon name="arrow-right" class="w-3.5 h-3.5" />
          </NuxtLink>

          <button
            v-if="!page.isSystem"
            @click="deletePage(page)"
            class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-red-400 hover:bg-red-950/40 transition"
            title="ลบหน้านี้"
          >
            <AppIcon name="trash" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal: Create New Page -->
    <transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showNewModal" 
        class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="showNewModal = false"
      >
        <div class="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white">สร้างหน้าใหม่ (New Custom Page)</h3>
            <button @click="showNewModal = false" class="text-slate-500 hover:text-white">✕</button>
          </div>

          <div class="space-y-4">
            <div class="space-y-1">
              <label class="text-xs font-semibold text-slate-300">ชื่อหน้า (Page Title) *</label>
              <input 
                v-model="newPageForm.title" 
                @input="onTitleChange"
                type="text" 
                placeholder="เช่น ทุนเรียนต่อแพทย์จีน 2026" 
                class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-semibold text-slate-300">URL Slug (Path) *</label>
              <div class="flex items-center">
                <span class="px-3 py-2 bg-slate-950/80 border border-r-0 border-slate-800 rounded-l-xl text-slate-500 text-xs font-mono">/</span>
                <input 
                  v-model="newPageForm.slug" 
                  type="text" 
                  placeholder="scholarship-china-2026" 
                  class="flex-1 px-3 py-2 rounded-r-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-xs font-semibold text-slate-300">แม่แบบเริ่มต้น (Template Preset)</label>
              <select 
                v-model="newPageForm.templateType" 
                class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="custom">Blank Landing Page (ปรับแต่งบล็อกเอง)</option>
                <option value="institution">Single Institution Detail (แม่แบบมหาวิทยาลัย / คณะแพทย์)</option>
                <option value="country-hub">Country / University Hub (แม่แบบรวมสถาบันตามประเทศ)</option>
                <option value="highschool">High School Level Hub (แม่แบบระดับมัธยมศึกษา)</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="text-xs font-semibold text-slate-300">SEO Meta Description</label>
              <textarea 
                v-model="newPageForm.seo.metaDescription" 
                rows="2" 
                placeholder="สรุปข้อมูลหน้าเว็บสั้นๆ สำหรับ Google Search..." 
                class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
              ></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button 
              @click="showNewModal = false" 
              class="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              ยกเลิก
            </button>
            <button 
              @click="createPage" 
              class="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-lg shadow-brand-600/30 flex items-center space-x-2"
              :disabled="isCreating"
            >
              <span v-if="isCreating" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>{{ isCreating ? 'กำลังบันทึกลง Atlas...' : 'สร้างหน้าและบันทึก' }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
