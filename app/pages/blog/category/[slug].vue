<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import blogs from '~/data/blogs.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

const route = useRoute();
const catSlug = computed(() => route.params.slug as string);

const categoryNames: Record<string, string> = {
  'china-korea-japan': 'บทความเรียนต่อจีน เกาหลี ญี่ปุ่น',
  'europe-russia': 'บทความเรียนต่อยุโรปและรัสเซีย',
  'usa-canada': 'บทความเรียนต่ออเมริกาและแคนาดา'
};

const categoryTitle = computed(() => categoryNames[catSlug.value] || 'หมวดหมู่บทความ');

const categoryPosts = computed(() => {
  return blogs.filter(b => b.categorySlug === catSlug.value);
});

useHead({
  title: computed(() => `${categoryTitle.value} - Studywiz`),
  meta: [
    { name: 'description', content: `รวบรวมสาระน่ารู้ ทุนการศึกษา และรีวิวในหมวด ${categoryTitle.value}` }
  ]
});
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Back Link -->
      <div class="mb-6">
        <NuxtLink to="/blog" class="inline-flex items-center space-x-1 text-xs font-semibold text-brand-600 hover:underline">
          <span>←</span>
          <span>กลับไปหน้าบทความหลัก</span>
        </NuxtLink>
      </div>

      <SectionHeading 
        badge="หมวดหมู่บทความ"
        :title="categoryTitle"
        subtitle="สาระน่ารู้ รีวิวสถาบันการศึกษา และคำแนะนำจากผู้เชี่ยวชาญ"
        align="left"
      />

      <div v-if="categoryPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <article 
          v-for="post in categoryPosts" 
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
              <div class="text-[11px] font-semibold text-slate-400 flex items-center space-x-3">
                <span class="inline-flex items-center space-x-1">
                  <AppIcon name="calendar" class="w-3 h-3 text-slate-400" />
                  <span>{{ post.date }}</span>
                </span>
                <span>•</span>
                <span class="inline-flex items-center space-x-1">
                  <AppIcon name="user" class="w-3 h-3 text-slate-400" />
                  <span>{{ post.author }}</span>
                </span>
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
              <AppIcon name="arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </article>
      </div>

      <div v-else class="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
        <p class="text-sm text-slate-500">ยังไม่มีบทความในหมวดหมู่นี้ในขณะนี้</p>
        <NuxtLink to="/blog/all" class="text-xs font-bold text-brand-600 hover:underline">
          ดูบทความทั้งหมด
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
