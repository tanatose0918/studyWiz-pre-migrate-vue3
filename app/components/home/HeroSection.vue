<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface HeroSlide {
  id: string;
  country: string;
  tag: string;
  image: string;
  university: string;
}

const slides: HeroSlide[] = [
  {
    id: 'uk',
    country: 'United Kingdom',
    tag: 'Russell Group & World-Class Universities',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=85',
    university: 'Oxford • Cambridge • Manchester • Edinburgh'
  },
  {
    id: 'australia',
    country: 'Australia',
    tag: 'Group of Eight (Go8) & Work Rights',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=85',
    university: 'Melbourne • Sydney • UNSW • Queensland'
  },
  {
    id: 'usa',
    country: 'United States',
    tag: 'Ivy League & Top STEM Programs',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1920&q=85',
    university: 'Harvard • Stanford • Columbia • UC Berkeley'
  },
  {
    id: 'canada',
    country: 'Canada & New Zealand',
    tag: 'Top Quality Education & PR Pathway',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1920&q=85',
    university: 'Toronto • UBC • McGill • Auckland'
  }
];

const currentSlide = ref(0);
let intervalId: any = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const setSlide = (idx: number) => {
  currentSlide.value = idx;
};

onMounted(() => {
  intervalId = setInterval(nextSlide, 7000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <section class="relative min-h-[640px] lg:min-h-[740px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
    
    <!-- Background Image Carousel with Cinematic Luxury Dark Overlay -->
    <div class="absolute inset-0 z-0 select-none">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'"
        style="transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 8s ease-out;"
      >
        <img 
          :src="slide.image" 
          :alt="slide.country" 
          class="w-full h-full object-cover object-center"
        />
      </div>

      <!-- Luxury Vignette & Obsidian Gradient Overlay (Text-less readability) -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40"></div>
      <div class="absolute inset-0 bg-radial from-transparent via-slate-950/50 to-slate-950/90"></div>
    </div>

    <!-- Main Content Container: Luxury, Minimal, Text-less -->
    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center flex flex-col items-center space-y-8">
      
      <!-- Minimalist Prestige Kicker with 0.2rem Letter-Spacing -->
      <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-slate-200 font-semibold uppercase tracking-luxury shadow-lg">
        <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
        <span>STUDYWIZ • ESTABLISHED 1985</span>
      </div>

      <!-- Grand Editorial Headline -->
      <div class="space-y-4 max-w-4xl">
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display tracking-spaced">
          UNLOCK YOUR <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-white">
            GLOBAL FUTURE
          </span>
        </h1>
        <p class="text-base sm:text-xl text-slate-300 font-light tracking-luxury uppercase">
          บันไดสู่มหาวิทยาลัยชั้นนำระดับโลก
        </p>
      </div>

      <!-- Minimal 1-Liner Subtitle -->
      <p class="text-sm sm:text-base text-slate-300/90 max-w-xl mx-auto font-normal leading-relaxed tracking-wide">
        ที่ปรึกษาเรียนต่อต่างประเทศแบบ One-on-One ครบวงจร ด้วยมาตรฐาน TIECA & FELCA
      </p>

      <!-- Refined Executive Dual CTAs -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
        <a 
          href="#cta-consultation"
          class="w-full sm:w-auto px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm tracking-luxury uppercase shadow-2xl shadow-red-950/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 border border-red-500/30"
        >
          <span>ปรึกษาวางแผนฟรี</span>
          <AppIcon name="arrow-right" class="w-3.5 h-3.5" />
        </a>

        <a 
          href="#destinations"
          class="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm tracking-luxury uppercase border border-white/25 backdrop-blur-md transition-all duration-200 flex items-center justify-center"
        >
          <span>สำรวจหลักสูตร</span>
        </a>
      </div>

      <!-- Interactive Slide Controls (Carousel Dots & Country Pills) -->
      <div class="pt-8 flex flex-col items-center space-y-3">
        
        <!-- Country Selector Pills -->
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button 
            v-for="(slide, sIdx) in slides" 
            :key="slide.id"
            @click="setSlide(sIdx)"
            class="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-spaced transition-all duration-300"
            :class="sIdx === currentSlide 
              ? 'bg-white text-slate-950 shadow-md scale-105' 
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'"
          >
            {{ slide.country }}
          </button>
        </div>

        <!-- Active Campus Sub-tagline -->
        <div class="text-[11px] text-slate-400 tracking-luxury uppercase h-4">
          {{ slides[currentSlide].university }}
        </div>

      </div>

    </div>

    <!-- Bottom Minimal Prestige Trust Ribbon -->
    <div class="absolute bottom-0 inset-x-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 py-3.5 px-4 z-20">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs text-slate-400">
        <div class="flex items-center space-x-2">
          <AppIcon name="shield" class="w-4 h-4 text-red-500" />
          <span class="tracking-spaced uppercase text-[11px]">100% Visa Approval Success</span>
        </div>
        <div class="hidden md:flex items-center space-x-6 text-[11px] tracking-luxury uppercase">
          <span>38+ Years Excellence</span>
          <span>•</span>
          <span>1,500+ Alumni Network</span>
          <span>•</span>
          <span>0 Baht Service Fee</span>
        </div>
        <div class="flex items-center space-x-2">
          <AppIcon name="award" class="w-4 h-4 text-red-500" />
          <span class="tracking-spaced uppercase text-[11px]">TIECA & FELCA Certified</span>
        </div>
      </div>
    </div>

  </section>
</template>
