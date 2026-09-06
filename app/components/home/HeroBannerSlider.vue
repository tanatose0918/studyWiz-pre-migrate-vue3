<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import homeData from '~/data/homeContent.json';

const slides = homeData.slides;
const activeIndex = ref(0);
let timer: any = null;

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.length;
};

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
};

const setSlide = (idx: number) => {
  activeIndex.value = idx;
};

onMounted(() => {
  timer = setInterval(nextSlide, 6500);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="relative overflow-hidden bg-slate-950 text-white min-h-[540px] lg:min-h-[620px] flex items-center">
    
    <!-- Slides Container -->
    <div class="w-full relative">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        class="transition-opacity duration-700 ease-in-out absolute inset-0 w-full min-h-[540px] lg:min-h-[620px]"
        :class="index === activeIndex ? 'opacity-100 z-10 relative' : 'opacity-0 z-0 pointer-events-none'"
      >
        <!-- Background Image with Gradient Overlay -->
        <div class="absolute inset-0 z-0">
          <img 
            :src="slide.image" 
            :alt="slide.title"
            class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <!-- Content Container -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex items-center min-h-[540px] lg:min-h-[620px]">
          <div class="max-w-2xl space-y-6">
            
            <!-- Badge -->
            <div v-if="slide.badge">
              <span class="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                <span>{{ slide.badge }}</span>
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display tracking-tight drop-shadow-sm">
              {{ slide.title }}
            </h1>

            <!-- Subtitle -->
            <p class="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {{ slide.subtitle }}
            </p>

            <!-- Actions -->
            <div class="pt-2 flex flex-wrap gap-3.5 sm:gap-4">
              <NuxtLink 
                :to="slide.ctaLink"
                class="px-6 py-3.5 rounded-xl bg-btn hover:bg-btn-hover active:bg-btn-active text-white font-semibold text-sm shadow-btn hover:shadow-btn-hover transition-all flex items-center space-x-2"
              >
                <span>{{ slide.ctaText }}</span>
                <span>→</span>
              </NuxtLink>

              <NuxtLink 
                :to="slide.secondaryCtaLink"
                class="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all"
              >
                <span>{{ slide.secondaryCtaText }}</span>
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button 
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition hover:scale-105"
      aria-label="Previous slide"
    >
      <span class="text-lg">‹</span>
    </button>

    <button 
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition hover:scale-105"
      aria-label="Next slide"
    >
      <span class="text-lg">›</span>
    </button>

    <!-- Indicators / Dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5">
      <button 
        v-for="(s, i) in slides" 
        :key="s.id"
        @click="setSlide(i)"
        class="h-2 rounded-full transition-all duration-300"
        :class="i === activeIndex ? 'w-8 bg-brand-500' : 'w-2 bg-white/40 hover:bg-white/60'"
        :aria-label="`Go to slide ${i + 1}`"
      ></button>
    </div>

  </div>
</template>
