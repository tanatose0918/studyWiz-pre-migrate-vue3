<script setup lang="ts">
import { ref } from 'vue';
import siteSettings from '~/data/siteSettings.json';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const isBlogExpanded = ref(true);

const navLinks = [
  { name: 'หน้าแรก', path: '/' },
  { name: 'ค้นหาประเทศ', path: '/country' },
  { name: 'ระดับการศึกษา', path: '/level' },
  { name: 'รีวิวนักเรียน', path: '/testimonial' },
  { 
    name: 'บทความ & PR', 
    path: '/blog',
    hasDropdown: true,
    children: [
      { name: 'บทความทั้งหมด', path: '/blog/all' },
      { name: 'เรียนต่อจีน เกาหลี ญี่ปุ่น', path: '/blog/category/china-korea-japan' },
      { name: 'เรียนต่อยุโรปและรัสเซีย', path: '/blog/category/europe-russia' },
      { name: 'เรียนต่ออเมริกาและแคนาดา', path: '/blog/category/usa-canada' },
    ]
  },
  { name: 'กิจกรรม & สัมมนา', path: '/activities' },
  { name: 'เกี่ยวกับ Studywiz', path: '/about' },
  { name: 'ติดต่อเรา', path: '/contact' },
];

const primaryPhone = siteSettings.hotlinePhones[0] || '08-1934-9695';
const lineUrl = siteSettings.socialLinks.line;
</script>

<template>
  <div>
    <!-- Backdrop -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
        @click="emit('close')"
      ></div>
    </transition>

    <!-- Slide-over Drawer -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div 
        v-if="isOpen"
        class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col lg:hidden"
      >
        <!-- Header -->
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <NuxtLink to="/" @click="emit('close')" class="flex items-center space-x-2">
            <img 
              src="/images/logo-studyWiz.png" 
              alt="Studywiz" 
              class="h-9 w-auto object-contain" 
            />
          </NuxtLink>

          <button 
            @click="emit('close')" 
            class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <!-- Links List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-1">
          <template v-for="item in navLinks" :key="item.path">
            <div v-if="item.hasDropdown" class="space-y-1">
              <div 
                @click="isBlogExpanded = !isBlogExpanded"
                class="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-800 font-medium text-sm hover:bg-slate-50 cursor-pointer"
              >
                <span>{{ item.name }}</span>
                <span class="text-xs text-slate-400 transform transition-transform" :class="{ 'rotate-180': isBlogExpanded }">
                  ▼
                </span>
              </div>

              <!-- Submenu -->
              <div v-show="isBlogExpanded" class="pl-4 space-y-1 border-l-2 border-brand-100 ml-3">
                <NuxtLink 
                  v-for="sub in item.children" 
                  :key="sub.path"
                  :to="sub.path"
                  @click="emit('close')"
                  class="block px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50/50"
                  active-class="text-brand-600 font-semibold bg-brand-50"
                >
                  {{ sub.name }}
                </NuxtLink>
              </div>
            </div>

            <NuxtLink 
              v-else
              :to="item.path"
              @click="emit('close')"
              class="block px-3 py-2.5 rounded-xl text-slate-800 font-medium text-sm hover:bg-brand-50 hover:text-brand-600 transition"
              active-class="bg-brand-50 text-brand-600 font-semibold"
            >
              {{ item.name }}
            </NuxtLink>
          </template>
        </div>

        <!-- Footer / Contact Actions -->
        <div class="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
          <a 
            :href="`tel:${primaryPhone.replace(/-/g, '')}`" 
            class="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-btn hover:bg-btn-hover active:bg-btn-active text-white font-medium text-xs shadow-btn transition"
          >
            <span>📞 โทรสายด่วน: {{ primaryPhone }}</span>
          </a>
          <a 
            :href="lineUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-line text-white font-medium text-xs shadow-sm hover:bg-line-dark transition"
          >
            <span>💬 ทักแชท Line @studywiz</span>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
