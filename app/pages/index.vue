<script setup lang="ts">
import HeroBannerSlider from '~/components/home/HeroBannerSlider.vue';
import PhilosophySection from '~/components/home/PhilosophySection.vue';
import ProgramLevelGrid from '~/components/home/ProgramLevelGrid.vue';
import FeaturedBlogSection from '~/components/home/FeaturedBlogSection.vue';
import ConsultationBanner from '~/components/home/ConsultationBanner.vue';

useHead({
  title: 'Studywiz - ศูนย์แนะแนวศึกษาต่อต่างประเทศครบวงจร ก่อตั้งปี 2528',
  meta: [
    {
      name: 'description',
      content: 'ผู้นำด้านการแนะแนวศึกษาต่อต่างประเทศมากว่า 38 ปี สมาชิก TIECA & FELCA ให้คำปรึกษาฟรีทุกระดับการศึกษา ภาษา มัธยม และมหาวิทยาลัยทั่วโลก'
    },
    { property: 'og:title', content: 'Studywiz - ศูนย์แนะแนวศึกษาต่อต่างประเทศครบวงจร' },
    { property: 'og:description', content: 'โอกาสทางการศึกษาไม่ควรถูกปิดกั้นด้วยอายุ งบประมาณ หรือเกรดเฉลี่ย ปรึกษาเรียนต่อต่างประเทศฟรี' },
    { property: 'og:image', content: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80' }
  ]
});
</script>

<template>
  <div>
    <!-- Hero Slider -->
    <HeroBannerSlider />

    <!-- Philosophy & Mission -->
    <PhilosophySection />

    <!-- Study Programs & Levels -->
    <ProgramLevelGrid />

    <!-- Featured Blog & Student Reviews -->
    <FeaturedBlogSection />

    <!-- Consultation CTA Strip -->
    <ConsultationBanner />
  </div>
</template>
