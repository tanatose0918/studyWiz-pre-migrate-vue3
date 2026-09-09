<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue';
import DestinationsSection from '~/components/home/DestinationsSection.vue';
import BudgetSection from '~/components/home/BudgetSection.vue';
import WhyUsSection from '~/components/home/WhyUsSection.vue';
import FeaturedBlogSection from '~/components/home/FeaturedBlogSection.vue';
import CtaSection from '~/components/home/CtaSection.vue';

useHead({
  title: 'StudyWiz - Unlock Your Global Future | ศูนย์แนะแนวศึกษาต่อต่างประเทศ',
  meta: [
    {
      name: 'description',
      content: 'Unlock Your Global Future — บันไดสู่มหาวิทยาลัยชั้นนำระดับโลก โดย StudyWiz ผู้เชี่ยวชาญการแนะแนวศึกษาต่อต่างประเทศมากว่า 38 ปี สมาชิก TIECA & FELCA ให้คำปรึกษาฟรีทุกระดับการศึกษา'
    },
    { property: 'og:title', content: 'StudyWiz - Unlock Your Global Future | ศูนย์แนะแนวศึกษาต่อต่างประเทศ' },
    { property: 'og:description', content: 'แนะแนวและดูแลเส้นทางเรียนต่อต่างประเทศแบบ One-on-One ตั้งแต่เตรียมเอกสารจนถึงวันสำเร็จการศึกษา ปรึกษาฟรี' },
    { property: 'og:image', content: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80' }
  ]
});
</script>

<template>
  <div class="space-y-0">
    <!-- 1. Hero Section (Unlock Your Global Future) -->
    <HeroSection />

    <!-- 2. Top Destinations Section (UK, AU, USA, NZ & CA) -->
    <DestinationsSection />

    <!-- 3. Transparent Budget Planning Section -->
    <BudgetSection />

    <!-- 4. Why Choose StudyWiz (Bento Grid) -->
    <WhyUsSection />

    <!-- 5. Featured Blog & Student Insights -->
    <FeaturedBlogSection />

    <!-- 6. Full-Width Crimson CTA & Fast Booking -->
    <CtaSection />
  </div>
</template>
