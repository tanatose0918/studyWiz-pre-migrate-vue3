<script setup lang="ts">
definePageMeta({
  layout: 'admin'
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="flex items-center justify-between pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center space-x-2 text-xs text-brand-400 font-mono mb-1">
          <span>LEADS & CRM</span>
          <span>/</span>
          <span>INBOX</span>
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">รายชื่อนักเรียนและผู้ลงทะเบียน (Student Leads)</h2>
        <p class="text-xs text-slate-400 mt-1">รับข้อมูลจากแบบฟอร์ม Fast Booking Form และหน้าติดต่อเรา</p>
      </div>
    </div>

    <div class="bg-slate-950 rounded-2xl border border-slate-800 p-8 text-center space-y-3">
      <div class="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mx-auto">
        <AppIcon name="users" class="w-6 h-6" />
      </div>
      <h3 class="text-sm font-bold text-white">พร้อมรับข้อมูลการลงทะเบียน (Real-time Webhook Active)</h3>
      <p class="text-xs text-slate-400 max-w-md mx-auto">
        เมื่อนักเรียนกรอกฟอร์มจากหน้าแรกหรือหน้ารายละเอียดมหาวิทยาลัย ระบบจะส่งแจ้งเตือนเข้าสู่ระบบและ LINE Notify ทันที
      </p>
    </div>
  </div>
</template>
