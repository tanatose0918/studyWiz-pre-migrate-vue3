<script setup lang="ts">
import blogs from '~/data/blogs.json';
import SectionHeading from '~/components/ui/SectionHeading.vue';

// Pick top 3 featured blogs
const featuredPosts = blogs.slice(0, 3);
</script>

<template>
  <section class="py-16 lg:py-24 bg-white border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header with View All Button -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span class="inline-block px-3.5 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-100/80 text-xs font-semibold uppercase tracking-wider mb-2.5">
            บทความและข่าวสาร
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            อัปเดตสาระ & รีวิวจากผู้เรียนจริง
          </h2>
          <p class="mt-2 text-sm text-slate-600">
            เจาะลึกข้อมูลการเรียนต่อต่างประเทศ ทุนการศึกษา และประสบการณ์ตรงจากรุ่นพี่
          </p>
        </div>

        <div class="mt-4 md:mt-0">
          <NuxtLink 
            to="/blog/all" 
            class="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>อ่านบทความทั้งหมด (15+ เรื่อง)</span>
            <span>→</span>
          </NuxtLink>
        </div>
      </div>

      <!-- 3-Column Card Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article 
          v-for="post in featuredPosts" 
          :key="post.id"
          class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
        >
          <!-- Thumbnail Image -->
          <div class="relative h-52 overflow-hidden bg-slate-100">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-medium backdrop-blur-sm">
                {{ post.category }}
              </span>
            </div>
          </div>

          <!-- Body -->
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
              <span>อ่านรายละเอียดรีวิว</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>
