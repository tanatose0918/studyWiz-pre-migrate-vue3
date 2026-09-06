<script setup lang="ts">
import { ref, computed } from 'vue';
import blogs from '~/data/blogs.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

useHead({
  title: 'บทความ & ข่าวสารประชาสัมพันธ์ - Studywiz',
  meta: [
    { name: 'description', content: 'รวบรวมสาระน่ารู้ ทุนการศึกษา รีวิวประสบการณ์ตรง และการเตรียมตัวศึกษาต่อต่างประเทศ' }
  ]
});

const selectedCategory = ref('all');

const categories = [
  { id: 'all', name: 'ทั้งหมด' },
  { id: 'china-korea-japan', name: 'จีน เกาหลี ญี่ปุ่น' },
  { id: 'europe-russia', name: 'ยุโรปและรัสเซีย' },
  { id: 'usa-canada', name: 'อเมริกาและแคนาดา' }
];

const filteredBlogs = computed(() => {
  if (selectedCategory.value === 'all') return blogs;
  return blogs.filter(b => b.categorySlug === selectedCategory.value);
});
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <SectionHeading 
        badge="Studywiz PR & Blog"
        title="คลังบทความและสาระน่ารู้การศึกษาต่อ"
        subtitle="อัปเดตข้อมูลเจาะลึก ทุนการศึกษา และประสบการณ์ตรงจากรุ่นพี่ในสถาบันชั้นนำ"
        align="center"
      />

      <!-- Category Tabs -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="selectedCategory = cat.id"
          class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
          :class="selectedCategory === cat.id 
            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20 scale-105' 
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <article 
          v-for="post in filteredBlogs" 
          :key="post.id"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <div class="relative h-52 overflow-hidden bg-slate-100">
            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-medium backdrop-blur-sm">
                {{ post.category }}
              </span>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-1 justify-between space-y-4">
            <div class="space-y-2">
              <div class="text-[11px] font-semibold text-slate-400 flex items-center space-x-2">
                <span>🗓️ {{ post.date }}</span>
                <span>•</span>
                <span>✍️ {{ post.author }}</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {{ post.excerpt }}
              </p>
            </div>

            <NuxtLink 
              :to="`/blog/${post.slug}`"
              class="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-600 hover:text-brand-800 transition pt-2"
            >
              <span>อ่านต่อฉบับเต็ม</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>
