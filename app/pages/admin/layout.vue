<script setup lang="ts">
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'admin'
});

const activeTab = ref<'topbar' | 'nav' | 'overlay' | 'footer'>('nav');
const isLoading = ref(true);
const isSaving = ref(false);
const saveSuccessMessage = ref('');

// State matching Global Layout schema
const form = ref<any>({
  topBar: {
    enabled: true,
    announcementText: '',
    hotlinePhones: [],
    primaryEmail: '',
    socials: { facebook: '', line: '', instagram: '', tiktok: '', youtube: '' }
  },
  navigation: [],
  overlayButton: {
    enableScrollToTop: true,
    enableQuickCall: true,
    enableLineChat: true,
    quickCallPhone: '',
    lineUrl: '',
    badgeText: ''
  },
  footer: {
    aboutText: '',
    offices: {
      bangkok: { title: '', address: '', phones: [], email: '' },
      chiangmai: { title: '', address: '', phones: [], email: '' }
    },
    copyrightYear: 2026
  }
});

const loadLayoutData = async () => {
  isLoading.value = true;
  try {
    const res: any = await $fetch('/api/layout');
    if (res && res.data) {
      form.value = JSON.parse(JSON.stringify(res.data));
    }
  } catch (err) {
    console.error('Failed to load layout from API:', err);
  } finally {
    isLoading.value = false;
  }
};

const saveLayout = async () => {
  isSaving.value = true;
  saveSuccessMessage.value = '';
  try {
    await $fetch('/api/layout', {
      method: 'POST',
      body: form.value
    });
    saveSuccessMessage.value = '✔ บันทึกข้อมูลและซิงค์ขึ้น MongoDB Atlas สำเร็จแล้ว!';
    setTimeout(() => {
      saveSuccessMessage.value = '';
    }, 4000);
  } catch (err: any) {
    alert('เกิดข้อผิดพลาดในการบันทึก: ' + err.message);
  } finally {
    isSaving.value = false;
  }
};

// Navigation item helpers
const addNavItem = () => {
  const newId = `nav-${Date.now()}`;
  form.value.navigation.push({
    id: newId,
    name: 'เมนูใหม่',
    path: '/new-page',
    hasDropdown: false,
    children: []
  });
};

const removeNavItem = (index: number) => {
  if (confirm('ยืนยันลบเมนูนี้?')) {
    form.value.navigation.splice(index, 1);
  }
};

const moveNav = (index: number, direction: 'up' | 'down') => {
  const target = direction === 'up' ? index - 1 : index + 1;
  if (target < 0 || target >= form.value.navigation.length) return;
  const temp = form.value.navigation[index];
  form.value.navigation[index] = form.value.navigation[target];
  form.value.navigation[target] = temp;
};

const addSubItem = (navItem: any) => {
  if (!navItem.children) navItem.children = [];
  navItem.hasDropdown = true;
  navItem.children.push({
    name: 'เมนูย่อยใหม่',
    path: '/sub-page'
  });
};

const removeSubItem = (navItem: any, subIndex: number) => {
  navItem.children.splice(subIndex, 1);
  if (navItem.children.length === 0) {
    navItem.hasDropdown = false;
  }
};

onMounted(() => {
  loadLayoutData();
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    
    <!-- Page Header & Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center space-x-2 text-xs text-brand-400 font-mono mb-1">
          <span>CORE CONFIG</span>
          <span>/</span>
          <span>GLOBAL LAYOUT</span>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">ศูนย์ควบคุมเลย์เอาต์รวม (1-Page Control Center)</h2>
        <p class="text-xs text-slate-400 mt-1">
          จัดการส่วนหัว (TopBar & Navbar), ปุ่มลอย (TheOverlayButton), และส่วนท้าย (Footer) ที่ส่งผลต่อทุกหน้าเว็บ
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <button
          @click="loadLayoutData"
          class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          :disabled="isLoading || isSaving"
        >
          รีเฟรชข้อมูล
        </button>
        <button
          @click="saveLayout"
          class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-600/30 transition flex items-center space-x-2"
          :disabled="isLoading || isSaving"
        >
          <span v-if="isSaving" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ isSaving ? 'กำลังบันทึกลง Atlas...' : '💾 บันทึกการเปลี่ยนแปลง' }}</span>
        </button>
      </div>
    </div>

    <!-- Alert / Toast Banner -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="saveSuccessMessage" class="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-lg">
        <span>{{ saveSuccessMessage }}</span>
        <span class="text-emerald-400 text-[10px] font-mono">MONGODB ATLAS LIVE SYNC</span>
      </div>
    </transition>

    <!-- Tab Selector -->
    <div class="flex items-center space-x-2 border-b border-slate-800 pb-2">
      <button
        @click="activeTab = 'nav'"
        class="px-4 py-2 rounded-xl text-xs font-semibold transition"
        :class="activeTab === 'nav' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
      >
        🧭 เมนูนำทาง (Navbar & Mobile Drawer)
      </button>
      <button
        @click="activeTab = 'topbar'"
        class="px-4 py-2 rounded-xl text-xs font-semibold transition"
        :class="activeTab === 'topbar' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
      >
        📞 แถบบนสุด (TopBar & โซเชียล)
      </button>
      <button
        @click="activeTab = 'overlay'"
        class="px-4 py-2 rounded-xl text-xs font-semibold transition"
        :class="activeTab === 'overlay' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
      >
        💬 ปุ่มลอยขวาล่าง (TheOverlayButton)
      </button>
      <button
        @click="activeTab = 'footer'"
        class="px-4 py-2 rounded-xl text-xs font-semibold transition"
        :class="activeTab === 'footer' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
      >
        🏢 ส่วนท้าย & สาขา (Footer & Offices)
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="p-12 text-center text-slate-500 space-y-3">
      <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-xs">กำลังเชื่อมต่อและโหลดข้อมูลจาก MongoDB Atlas...</p>
    </div>

    <!-- TAB 1: Navigation Menu Manager (Single Source of Truth) -->
    <div v-else-if="activeTab === 'nav'" class="space-y-4">
      <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-bold text-white">โครงสร้างเมนูนำทาง (Single Source of Truth)</h3>
          <p class="text-xs text-slate-400">
            Navbar บนเดสก์ท็อป และ Mobile Drawer บนมือถือ จะดึงข้อมูลชุดนี้ร่วมกันแบบ 100%
          </p>
        </div>
        <button
          @click="addNavItem"
          class="px-3.5 py-2 rounded-xl bg-brand-600/20 border border-brand-500/40 text-brand-400 hover:bg-brand-600 hover:text-white text-xs font-bold transition flex items-center space-x-1.5"
        >
          <AppIcon name="plus" class="w-3.5 h-3.5" />
          <span>เพิ่มเมนูหลัก</span>
        </button>
      </div>

      <!-- Navigation Tree Items -->
      <div class="space-y-3">
        <div 
          v-for="(item, idx) in form.navigation" 
          :key="item.id || idx"
          class="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3 shadow-sm hover:border-slate-700 transition"
        >
          <!-- Main Item Row -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center space-x-2 flex-1">
              <span class="text-xs font-mono text-slate-500 w-6 text-center">#{{ idx + 1 }}</span>
              <input 
                v-model="item.name" 
                type="text" 
                placeholder="ชื่อเมนู" 
                class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:border-brand-500 focus:outline-none flex-1 max-w-xs"
              />
              <input 
                v-model="item.path" 
                type="text" 
                placeholder="URL Path เช่น /country" 
                class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono focus:border-brand-500 focus:outline-none flex-1 max-w-xs"
              />
            </div>

            <!-- Item Controls -->
            <div class="flex items-center space-x-2 self-end sm:self-auto">
              <button 
                @click="moveNav(idx, 'up')" 
                :disabled="idx === 0"
                class="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="เลื่อนขึ้น"
              >
                ▲
              </button>
              <button 
                @click="moveNav(idx, 'down')" 
                :disabled="idx === form.navigation.length - 1"
                class="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="เลื่อนลง"
              >
                ▼
              </button>
              <button 
                @click="addSubItem(item)"
                class="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-brand-400 hover:bg-brand-900/30 text-xs font-medium transition"
                title="เพิ่มเมนูย่อย Dropdown"
              >
                + เมนูย่อย
              </button>
              <button 
                @click="removeNavItem(idx)"
                class="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-red-400 hover:bg-red-950/40 transition"
                title="ลบเมนูนี้"
              >
                <AppIcon name="trash" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <!-- Sub Items List (Dropdown Children) -->
          <div v-if="item.children && item.children.length > 0" class="pl-8 pt-2 border-t border-slate-900 space-y-2">
            <div class="text-[11px] font-semibold text-slate-400 flex items-center space-x-1">
              <span>↳ เมนูย่อยใน Dropdown ({{ item.children.length }} รายการ):</span>
            </div>
            <div 
              v-for="(sub, subIdx) in item.children" 
              :key="sub.path || subIdx"
              class="flex items-center space-x-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80"
            >
              <span class="text-[10px] text-slate-600 font-mono">{{ subIdx + 1 }}.</span>
              <input 
                v-model="sub.name" 
                type="text" 
                placeholder="ชื่อเมนูย่อย" 
                class="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none flex-1 max-w-xs"
              />
              <input 
                v-model="sub.path" 
                type="text" 
                placeholder="URL เช่น /high-school" 
                class="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono focus:border-brand-500 focus:outline-none flex-1 max-w-xs"
              />
              <button 
                @click="removeSubItem(item, subIdx)"
                class="p-1 text-slate-500 hover:text-red-400 transition"
                title="ลบเมนูย่อย"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: TopBar & Socials -->
    <div v-else-if="activeTab === 'topbar'" class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 class="text-sm font-bold text-white">แถบข้อมูลด้านบนสุด (TheTopBar)</h3>
          <p class="text-xs text-slate-400">ควบคุมการแสดงผลและข้อมูลติดต่อด่วนบนสุดของเว็บ</p>
        </div>
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" v-model="form.topBar.enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0" />
          <span class="text-xs font-semibold text-slate-300">เปิดใช้งานแถบ TopBar</span>
        </label>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-300">ข้อความประกาศด่วน (Announcement)</label>
          <input 
            v-model="form.topBar.announcementText" 
            type="text" 
            class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-300">อีเมลหลัก (Primary Email)</label>
          <input 
            v-model="form.topBar.primaryEmail" 
            type="email" 
            class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-brand-500 focus:outline-none"
          />
        </div>
      </div>

      <div class="space-y-2 border-t border-slate-800 pt-4">
        <h4 class="text-xs font-bold text-slate-300">ลิงก์โซเชียลมีเดีย (Social Media Links)</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">Facebook URL:</span>
            <input v-model="form.topBar.socials.facebook" type="text" class="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono" />
          </div>
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">LINE Official URL:</span>
            <input v-model="form.topBar.socials.line" type="text" class="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono" />
          </div>
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">Instagram URL:</span>
            <input v-model="form.topBar.socials.instagram" type="text" class="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono" />
          </div>
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">TikTok URL:</span>
            <input v-model="form.topBar.socials.tiktok" type="text" class="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono" />
          </div>
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">YouTube Channel URL:</span>
            <input v-model="form.topBar.socials.youtube" type="text" class="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono" />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: TheOverlayButton -->
    <div v-else-if="activeTab === 'overlay'" class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div class="border-b border-slate-800 pb-4">
        <h3 class="text-sm font-bold text-white">ปุ่มลอยควบคุมหน้าจอ (TheOverlayButton)</h3>
        <p class="text-xs text-slate-400">ปุ่มติดต่อด่วนและปุ่มเลื่อนขึ้นบนสุดที่ลอยอยู่มุมขวาล่างของหน้าจอ</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" v-model="form.overlayButton.enableScrollToTop" class="rounded bg-slate-800 border-slate-700 text-brand-600" />
          <div>
            <div class="text-xs font-bold text-white">ปุ่ม Back to Top</div>
            <div class="text-[10px] text-slate-400">เลื่อนหน้าจอกลับขึ้นบนสุดเมื่อ Scroll เกิน 300px</div>
          </div>
        </label>
        <label class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" v-model="form.overlayButton.enableQuickCall" class="rounded bg-slate-800 border-slate-700 text-brand-600" />
          <div>
            <div class="text-xs font-bold text-white">ปุ่มโทรด่วน</div>
            <div class="text-[10px] text-slate-400">คลิกเพื่อโทรออกหาสายด่วนทันที</div>
          </div>
        </label>
        <label class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" v-model="form.overlayButton.enableLineChat" class="rounded bg-slate-800 border-slate-700 text-brand-600" />
          <div>
            <div class="text-xs font-bold text-white">ปุ่มทักแชท LINE</div>
            <div class="text-[10px] text-slate-400">เปิดห้องแชท LINE Official</div>
          </div>
        </label>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800 pt-4">
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-300">เบอร์โทรสายด่วนสำหรับปุ่มโทรด่วน</label>
          <input v-model="form.overlayButton.quickCallPhone" type="text" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
        </div>
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-300">ข้อความป้ายกำกับปุ่ม LINE (Badge Text)</label>
          <input v-model="form.overlayButton.badgeText" type="text" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
        </div>
      </div>
    </div>

    <!-- TAB 4: Footer & Office Branches -->
    <div v-else-if="activeTab === 'footer'" class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div class="border-b border-slate-800 pb-4">
        <h3 class="text-sm font-bold text-white">ส่วนท้ายเว็บไซต์และสาขาองค์กร (TheFooter)</h3>
        <p class="text-xs text-slate-400">จัดการข้อมูลสาขากรุงเทพฯ เชียงใหม่ ข้อความเกี่ยวกับเรา และตราสมาคม</p>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">ข้อความแนะนำองค์กรใน Footer (About Text)</label>
        <textarea 
          v-model="form.footer.aboutText" 
          rows="3" 
          class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-800 pt-4">
        <!-- Bangkok Office -->
        <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <h4 class="text-xs font-bold text-white flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-brand-500"></span>
            <span>สำนักงานใหญ่กรุงเทพฯ</span>
          </h4>
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">ที่อยู่:</span>
            <input v-model="form.footer.offices.bangkok.address" type="text" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200" />
          </div>
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">อีเมลสาขา:</span>
            <input v-model="form.footer.offices.bangkok.email" type="text" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200" />
          </div>
        </div>

        <!-- Chiang Mai Office -->
        <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <h4 class="text-xs font-bold text-white flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>สำนักงานสาขาเชียงใหม่</span>
          </h4>
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">ที่อยู่:</span>
            <input v-model="form.footer.offices.chiangmai.address" type="text" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200" />
          </div>
          <div class="space-y-1">
            <span class="text-[11px] text-slate-400">อีเมลสาขา:</span>
            <input v-model="form.footer.offices.chiangmai.email" type="text" class="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
