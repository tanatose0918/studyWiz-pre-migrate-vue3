<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import blogs from '~/data/blogs.json';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const post = computed(() => {
  return blogs.find(b => b.slug === slug.value) || blogs[0];
});

const relatedPosts = computed(() => {
  return blogs.filter(b => b.slug !== slug.value).slice(0, 3);
});

useHead({
  title: computed(() => `${post.value.title} - Studywiz`),
  meta: [
    { name: 'description', content: computed(() => post.value.excerpt) },
    { property: 'og:title', content: computed(() => post.value.title) },
    { property: 'og:description', content: computed(() => post.value.excerpt) },
    { property: 'og:image', content: computed(() => post.value.image) }
  ]
});

const shareOnFacebook = () => {
  if (typeof window !== 'undefined') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  }
};

const shareOnLine = () => {
  if (typeof window !== 'undefined') {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, '_blank');
  }
};
</script>

<template>
  <div class="py-12 sm:py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-xs text-slate-500 mb-8 flex-wrap">
        <NuxtLink to="/" class="hover:text-brand-600 transition">หน้าแรก</NuxtLink>
        <span>/</span>
        <NuxtLink to="/blog/all" class="hover:text-brand-600 transition">บทความ</NuxtLink>
        <span>/</span>
        <span class="text-slate-800 font-medium truncate max-w-xs">{{ post.title }}</span>
      </nav>

      <!-- Post Header -->
      <header class="space-y-4 mb-8">
        <div>
          <span class="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-100">
            {{ post.category }}
          </span>
        </div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight font-display">
          {{ post.title }}
        </h1>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
          <span class="inline-flex items-center space-x-1.5">
            <AppIcon name="calendar" class="w-3.5 h-3.5 text-brand-600" />
            <span>{{ post.date }}</span>
          </span>
          <span>•</span>
          <span class="inline-flex items-center space-x-1.5">
            <AppIcon name="user" class="w-3.5 h-3.5 text-slate-400" />
            <span>โดย {{ post.author }}</span>
          </span>
          <span>•</span>
          <span class="inline-flex items-center space-x-1.5">
            <AppIcon name="book-open" class="w-3.5 h-3.5 text-slate-400" />
            <span>เวลาอ่านประมาณ 3 นาที</span>
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div class="rounded-2xl overflow-hidden shadow-lg mb-10 aspect-video bg-slate-100">
        <img 
          :src="post.image" 
          :alt="post.title"
          class="w-full h-full object-cover" 
        />
      </div>

      <!-- Content Body -->
      <div class="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
        <p class="text-base sm:text-lg font-medium text-slate-900 leading-relaxed bg-brand-50/50 p-5 rounded-xl border-l-4 border-brand-500">
          {{ post.excerpt }}
        </p>
        <p>
          {{ post.content }}
        </p>
        <p>
          หากน้องๆ หรือผู้ปกครองท่านใด สนใจข้อมูลเพิ่มเติมเกี่ยวกับเกณฑ์การรับสมัคร ทุนการศึกษาของสถาบันนี้ หรือต้องการให้เจ้าหน้าที่ช่วยวางแผนตารางเรียน สามารถติดต่อศูนย์แนะแนว Studywiz ได้ฟรี ไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้นครับ
        </p>
      </div>

      <!-- Share Bar -->
      <div class="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="text-xs font-bold text-slate-700">
          แชร์บทความนี้:
        </div>
        <div class="flex items-center space-x-2.5">
          <button 
            @click="shareOnFacebook"
            class="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center space-x-1.5"
          >
            <AppIcon name="facebook" class="w-3.5 h-3.5 text-white" />
            <span>Facebook</span>
          </button>
          <button 
            @click="shareOnLine"
            class="px-4 py-2 rounded-xl bg-line text-white text-xs font-semibold hover:bg-line-dark transition flex items-center space-x-1.5"
          >
            <AppIcon name="line" class="w-3.5 h-3.5 text-white" />
            <span>Line</span>
          </button>
        </div>
      </div>

      <!-- Consultation Box -->
      <div class="mt-12 bg-gradient-to-r from-brand-900 to-indigo-950 text-white p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="space-y-2 text-center sm:text-left">
          <h3 class="text-lg font-bold font-display">สนใจหลักสูตรนี้ ปรึกษาผู้เชี่ยวชาญ</h3>
          <p class="text-xs text-brand-200">โทร: 08-1934-9695 หรือส่งข้อความหาเราได้ตลอดเวลา</p>
        </div>
        <NuxtLink to="/contact" class="px-5 py-3 rounded-xl bg-white text-brand-950 text-xs font-bold hover:bg-slate-100 transition shadow-md flex-shrink-0">
          ติดต่อขอรับข้อมูลฟรี
        </NuxtLink>
      </div>

      <!-- Related Posts -->
      <div class="mt-16 pt-12 border-t border-slate-100">
        <h3 class="text-xl font-bold text-slate-900 font-display mb-6">
          บทความและรีวิวที่น่าสนใจอื่นๆ
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <NuxtLink 
            v-for="rel in relatedPosts" 
            :key="rel.id"
            :to="`/blog/${rel.slug}`"
            class="group space-y-2.5"
          >
            <div class="rounded-xl overflow-hidden h-36 bg-slate-100">
              <img :src="rel.image" :alt="rel.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div class="text-[11px] text-brand-600 font-semibold">{{ rel.category }}</div>
            <h4 class="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-brand-600 transition-colors">
              {{ rel.title }}
            </h4>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>
