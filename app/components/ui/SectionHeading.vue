<script setup lang="ts">
defineProps<{
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}>();
</script>

<template>
  <div 
    class="mb-10"
    :class="align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left'"
  >
    <span 
      v-if="badge"
      class="inline-block px-3.5 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-100/80 text-xs font-semibold uppercase tracking-wider mb-2.5"
    >
      {{ badge }}
    </span>
    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
      {{ title }}
    </h2>
    <p 
      v-if="subtitle"
      class="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
