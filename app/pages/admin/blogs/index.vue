<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: 'admin'
});

const blogs = ref<any[]>([]);
const isLoading = ref(true);
const selectedContext = ref<string>('all');

const blogContexts = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'china-japan-korea', label: '🇨🇳 จีน เกาหลี ญี่ปุ่น' },
  { id: 'europe-russia', label: '🇪🇺 ยุโรปและรัสเซีย' },
  { id: 'usa-canada', label: '🇺🇸 อเมริกาและแคนาดา' },
  { id: 'scholarships', label: '🎓 ทุนการศึกษา' }
];

const loadBlogs = async () => {
  isLoading.value = true;
  try {
    const url = selectedContext.value === 'all' ? '/api/blogs' : `/api/blogs?context=${selectedContext.value}`;
    const res: any = await $fetch(url);
    if (res && res.data) {
      blogs.value = res.data;
    }
  } catch (err) {
    console.error('Failed to load blogs:', err);
  } finally {
    isLoading.value = false;
  }
};

const onContextChange = (ctxId: string) => {
  selectedContext.value = ctxId;
  loadBlogs();
};

onMounted(() => {
  loadBlogs();
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center space-x-2 text-xs text-brand-400 font-mono mb-1">
          <span>CONTENT MANAGEMENT</span>
          <span>/</span>
          <span>BLOG ARTICLES</span>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">ระบบบทความแยกตามบริบท (5 Blog Contexts)</h2>
        <p class="text-xs text-slate-400 mt-1">คัดกรองบทความและสาระน่ารู้ที่เชื่อมโยงตรงกับหน้า Destination แต่ละประเทศ</p>
      </div>

      <!-- Context Tabs -->
      <div class="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
        <button
          v-for="ctx in blogContexts"
          :key="ctx.id"
          @click="onContextChange(ctx.id)"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          :class="selectedContext === ctx.id ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'"
        >
          {{ ctx.label }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="p-12 text-center text-slate-500">
      <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
      <span class="text-xs">กำลังโหลดบทความจาก Atlas...</span>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="article in blogs" 
        :key="article.slug"
        class="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between"
      >
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-950 text-brand-400 border border-brand-800/40">
              {{ article.blogContext || article.category }}
            </span>
            <span class="text-[10px] text-slate-500 font-mono">{{ article.publishedDate || article.date }}</span>
          </div>

          <h3 class="text-sm font-bold text-white leading-snug">{{ article.title }}</h3>
          <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {{ article.summary || article.excerpt }}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
          <span class="text-[11px] font-mono text-slate-500">/blog/{{ article.slug }}</span>
          <span class="text-[10px] text-emerald-400">Published</span>
        </div>
      </div>
    </div>
  </div>
</template>
