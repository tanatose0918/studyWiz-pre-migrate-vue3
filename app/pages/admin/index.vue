<script setup lang="ts">
definePageMeta({
  layout: 'admin'
});

await navigateTo('/admin/layout');
</script>

<template>
  <div class="flex items-center justify-center h-64 text-slate-400">
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      <span class="text-sm">กำลังเปิดหน้าควบคุม CMS Dashboard...</span>
    </div>
  </div>
</template>
