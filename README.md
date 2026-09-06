# Studywiz Education Consultant - Nuxt 3 Migration (`studyWiz-pre-migrate-vue3`)

เว็บไซต์ศูนย์แนะแนวการศึกษาต่อต่างประเทศ Studywiz (เดิมเป็น WordPress Astra + Elementor) พัฒนาใหม่ด้วย **Nuxt 3 / Vue 3 (SSG)** เตรียมพร้อมสำหรับการ Deploy บน **Vercel** ให้ประสิทธิภาพสูง (100 Lighthouse), โหลดเร็ว และปลอดภัย 100%

---

## 🎨 Color Theme & Design Tokens

ตามโจทย์แบรนด์ Studywiz:
- **Primary Background**: `rgb(243, 241, 246)` (`#F3F1F6`)
- **Secondary Brand Color**: `rgb(206, 23, 31)` (`#CE171F`)
- **Base Text Color**: `rgb(0, 0, 0)` (`#000000`)
- **Highlight Text Color**: `rgb(150, 18, 22)` (`#961216`)
- **Button Colors**:
  - Base: `rgb(150, 18, 22)` (`#961216`)
  - Hover: `rgb(180, 22, 27)` (`#B4161B`)
  - Active: `rgb(120, 14, 18)` (`#780E12`)

---

## 🚀 Quick Start

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รัน Dev Server
```bash
npm run dev
# เปิดเบราว์เซอร์ที่ http://localhost:3000
```

### 3. สร้าง Production Bundle (SSG)
```bash
npm run generate
# ไฟล์ static ทั้งหมดจะถูก build ออกมาที่โฟลเดอร์ .output/public
```

### 4. ทดสอบพรีวิวผลงาน Static Build
```bash
npx serve .output/public
```

---

## 🛠️ โครงสร้างโปรเจกต์ (Clean Architecture)

```text
├── app/
│   ├── assets/css/main.css      # Custom styles, root CSS variables, scrollbars
│   ├── components/
│   │   ├── home/                # Hero banner, Philosophy, Level grid, Blogs, Consultation
│   │   ├── layout/              # TheTopBar, TheNavbar, TheFooter, MobileDrawer, FloatingSpeedDial
│   │   └── ui/                  # SectionHeading, reusables
│   ├── data/                    # JSON collections (SiteSettings, Blogs, Institutions, Testimonials)
│   ├── layouts/default.vue      # Global layout wrapper
│   └── pages/                   # File-based routing (52 static pages)
├── docs/                        # Scraped data & Implementation blueprints
├── public/
│   ├── admin/                   # Decap CMS (Backoffice สำหรับจัดการข้อมูลประชาสัมพันธ์/สไลด์)
│   └── images/                  # รูปภาพ Logo และ Asset ต่างๆ
├── server/
│   └── api/contact.post.ts      # Vercel Serverless Function รองรับแบบฟอร์มติดต่อ & Line Notify
├── nuxt.config.ts               # การตั้งค่า Nuxt, Tailwind, Google Fonts, Prerender
├── tailwind.config.js           # Theme token definition
└── vercel.json                  # การตั้งค่า 301 Permanent Redirects จาก WordPress URL เดิม
```

---

## 📝 CMS Backoffice (/admin)

สามารถเข้าจัดการเนื้อหา เช่น สไลด์หน้าแรก, บทความ PR, กิจกรรมสัมมนา ได้ที่:
`https://<your-domain>/admin/`

---

## 🚢 การ Deploy บน Vercel

1. สร้าง GitHub Repository (เช่น `studyWiz-pre-migrate-vue3`)
2. Push โค้ดนี้ขึ้น GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
3. เข้า [Vercel Dashboard](https://vercel.com/) -> Import Project จาก GitHub
4. Framework Preset: **Nuxt** (Output Directory: `.output/public` หรือตั้งค่า Build command: `npm run generate`)
5. (Optional) ตั้งค่า Environment Variable `LINE_NOTIFY_TOKEN` ใน Vercel Settings เพื่อรับการแจ้งเตือนจากหน้าติดต่อเรา
