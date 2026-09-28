# แผนแม่บทการพัฒนาระบบ StudyWiz CMS Dashboard (Master Implementation Plan)
**โครงการ:** พัฒนาระบบหลังบ้าน StudyWiz CMS (`studyWiz-cms`)  
**ที่ตั้งโครงการเป้าหมาย:** `d:\0_Lifes\Works\Freelance Work\studyWiz-cms`  
**อ้างอิงเว็บไซต์หน้าบ้าน:** `d:\0_Lifes\Works\Freelance Work\studyWiz-pre-migrate-vue3`  
**ไฟล์ Context Data สำหรับ MongoDB Atlas:** [`app/data/mongoPagesSeed.json`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/data/mongoPagesSeed.json)  
**ผู้จัดทำ:** Jeffcaliber & Tanadol Phengchan (System Builder Collaborator)  
**วันที่:** 28 กันยายน 2026  
**สถานะ:** แผนผังโครงสร้าง CMS Dashboard ปรับปรุงเพิ่มระบบ Pages Builder & MongoDB Atlas Seed (Pending Review)  

---

## 1. ภาพรวมสถาปัตยกรรมแดชบอร์ด (CMS Dashboard Architecture)

ระบบหลังบ้าน `studyWiz-cms` ถูกออกแบบด้วยเลย์เอาต์ **"Left-Sidebar Navigation + Dynamic Canvas + Live Preview"** เพื่อให้แอดมิน StudyWiz สามารถสลับจัดการบริบท (Context) ของหน้าบ้านได้อย่างอิสระ:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   StudyWiz CMS Top Bar                                 │
│ [Sidebar Toggle]  Breadcrumbs: Content > Pages > Home Page        [● Synced]  [บันทึกข้อมูล] │
├──────────────────┬─────────────────────────────────────────────────────────────────────┤
│  LEFT SIDEBAR    │                         MAIN CONTENT CANVAS                         │
│                  │                                                                     │
│  [StudyWiz CMS]  │  📑 ส่วนที่ 1: Custom Global Layout (1 Page Control Center)          │
│  v1.0 Admin      │     - TopBar & Socials | Navbar & Drawer | OverlayButton | Footer   │
│                  │                                                                     │
│  CORE CONFIG     │  📄 ส่วนที่ 2: Pages Management (จัดการหน้ารวม & สร้างหน้าใหม่)     │
│  • Global Layout │     - หน้ารวม Pages ทั้งหมด 8 หน้าหลักเดิม                            │
│  • Site & SEO    │     - ปุ่ม [+] สร้างหน้าใหม่ (New Custom Page)                      │
│                  │     - ระบบ Block-Based Page Builder (เลือกประกอบ Component ได้อิสระ)│
│  CONTENT         │                                                                     │
│  • Pages [+]     │  ┌───────────────────────────────────────────────────────────────┐  │
│    (New Feature!)│  │  [ Section Blocks Reorder ]     [ Live Interactive Preview ]  │  │
│  • Destinations  │  │  ▲ [ Hero Section (Luxury)  ]   - แสดงผลแบบ Real-time          │  │
│  • Programs      │  │  ▼ [ Destinations Grid      ]   - สลับดู Desktop / Mobile      │  │
│  • Blog Articles │  │  ▲ [ Budget Comparison      ]   - ปรับแต่ง Props ของแต่ละบล็อก  │  │
│  • Testimonials  │  │  ▼ [ Cta Fast Booking       ]                                  │  │
│  • Activities    │  │  + [ เพิ่ม Component บล็อกใหม่ ]                               │  │
│                  │  └───────────────────────────────────────────────────────────────┘  │
│  LEADS (CRM)     │                                                                     │
│  • Student Leads │                                                                     │
└──────────────────┴─────────────────────────────────────────────────────────────────────┘
```

---

## 2. โครงสร้าง Left-Sidebar Menu (พร้อมปุ่ม `+` เพิ่มหน้าใหม่)

### 🔹 1. หมวด CORE CONFIGURATION (โครงสร้างรอบนอก)
- **🌐 Global Layout:** จัดการ TopBar, Navbar, TheOverlayButton, และ Footer รวมศูนย์ในหน้าเดียว
- **⚙️ Site Settings & SEO:** จัดการข้อมูลเว็บไซต์, Favicon, โลโก้, และ OpenGraph ค่าเริ่มต้น

### 🔹 2. หมวด CONTENT MANAGEMENT (เนื้อหา & หน้าเว็บ)
- **📄 Pages [➕ สร้างหน้าใหม่]:**
  - **รายการหน้าตั้งต้น (Baseline Pages จาก `app/pages`):**
    1. `/` (หน้าแรก Home)
    2. `/about` (เกี่ยวกับเรา)
    3. `/country` (ค้นหาประเทศ)
    4. `/level` (ระดับการศึกษา)
    5. `/testimonial` (รีวิวนักเรียน)
    6. `/blog` (บทความและสาระ)
    7. `/activities` (กิจกรรมและสัมมนา)
    8. `/contact` (ติดต่อเรา)
  - **ปุ่ม `[➕ New Page]`:** คลิกเพื่อสร้างหน้า Landing Page ใหม่ (เช่น `/scholarship-uk-2026`, `/summer-camp-nz`) โดยระบุชื่อหน้า, URL Slug, ข้อมูล SEO และเลือก Component Blocks มาประกอบเป็นหน้าใหม่ได้ทันที
- **🌍 Destinations:** จัดการฐานข้อมูล 16 ประเทศ และธงชาติ
- **🎓 Programs & Levels:** จัดการหลักสูตรภาษา, มัธยม, ป.ตรี, ป.โท
- **📰 Blog Articles:** จัดการบทความและหมวดหมู่ข่าวสาร
- **🌟 Testimonials:** จัดการรีวิวศิษย์เก่า
- **📸 Activities:** จัดการแกลเลอรีภาพกิจกรรม

### 🔹 3. หมวด LEADS & CRM
- **📥 Student Leads Inbox:** ตรวจสอบรายชื่อผู้ลงทะเบียนขอรับคำปรึกษา พร้อมระบบแจ้งเตือนเข้า LINE/Email

---

## 3. สถาปัตยกรรม Component-Based Page Builder (ถอดแบบจาก `app/components/home`)

จากการตรวจสอบโครงสร้างคอมโพเนนต์ใน [`app/components/home`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/components/home) และ [`app/components/ui`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/components/ui) พบว่าหน้าเว็บของ StudyWiz ถูกประกอบขึ้นจาก **10 รูปแบบ Component Blocks** ที่พร้อมนำมาทำเป็น Palette ใน CMS ให้แอดมินลากวางหรือกดเพิ่มได้:

| ลำดับ | รหัส Component Block | อ้างอิงไฟล์ในโปรเจกต์ | วัตถุประสงค์ & รูปแบบการใช้งาน | Props / Data ที่ปรับแต่งได้ผ่าน CMS |
|:---:|---|---|---|---|
| **1** | `HeroLuxuryCarousel` | `home/HeroSection.vue` | แบนเนอร์หัวหน้าเว็บสไตล์ Luxury Minimal สไลด์ภาพมหาวิทยาลัยระดับโลก | Headline, Subheadline, Kicker badge, ปุ่ม CTA 2 ปุ่ม, ข้อความ Ribbon ด้านล่าง |
| **2** | `HeroBannerSlider` | `home/HeroBannerSlider.vue` | แบนเนอร์สไลเดอร์คลาสสิก ปรับเปลี่ยนสไลด์ภาพและปุ่มกดอัตโนมัติ | อาร์เรย์ของสไลด์ (ภาพ, หัวข้อ, คำบรรยาย, ลิงก์ปุ่ม) |
| **3** | `DestinationsGrid` | `home/DestinationsSection.vue` | การ์ดจุดหมายปลายทางยอดนิยม (4 ประเทศ หรือ 16 ประเทศ) พร้อมธงชาติ | Badge, หัวข้อ, คำบรรยาย, เลือกประเทศที่ต้องการแสดงผล, แท็กส่วนลดทุนการศึกษา |
| **4** | `BudgetComparison` | `home/BudgetSection.vue` | ตารางเปรียบเทียบงบประมาณ 3 คอลัมน์ (ภาษา, ป.ตรี, ป.โท) | ราคาประมาณการ/เดือน, ค่าเล่าเรียน, ค่าครองชีพ, สิทธิ์การทำงานพาร์ทไทม์, Checklist จุดเด่น |
| **5** | `BentoGridWhyUs` | `home/WhyUsSection.vue` | เบนโตะกริด 4 กล่อง นำเสนอจุดแข็ง (SOP, วีซ่า 100%, ศิษย์เก่า, กล่องรีวิวนักเรียน) | หัวข้อเสาหลัก, ตัวเลขสถิติ, ข้อความรีวิวศิษย์เก่า, รูปภาพและชื่อมหาวิทยาลัย |
| **6** | `PhilosophyVideo` | `home/PhilosophySection.vue` | กล่องเรื่องราวมุ่งมั่นขององค์กร + ฝังวิดีโอ YouTube + ตรา TIECA/FELCA | URL วิดีโอ YouTube, หัวข้อปรัชญา, ตราสมาคมที่ต้องการแสดง |
| **7** | `ProgramGrid` | `home/ProgramLevelGrid.vue` | การ์ดแยกประเภทหลักสูตรการศึกษา (ภาษา, มัธยม, มหาวิทยาลัย) | รายการหลักสูตร, ภาพประกอบ, คำบรรยายสั้น, ลิงก์ปลายทาง |
| **8** | `FeaturedBlogFeed` | `home/FeaturedBlogSection.vue` | ฟีดบทความล่าสุด 3 คอลัมน์ พร้อมแท็กหมวดหมู่และวันที่ | จำนวนบทความที่แสดง, หมวดหมู่ที่เลือกกรอง, ลิงก์ดูบทความทั้งหมด |
| **9** | `CtaFastBooking` | `home/CtaSection.vue` | แบนเนอร์สีแดง Crimson กว้างเต็มจอ พร้อม Fast Booking Form & QR Code LINE | หัวข้อ, ข้อความกระตุ้น, เบอร์โทรด่วน, บัญชี LINE, สวิตช์เปิด/ปิดฟอร์มและ QR Code |
| **10** | `CtaBannerStrip` | `home/ConsultationBanner.vue` | แถบแบนเนอร์เรียบหรูขนาดกะทัดรัดสำหรับคั่นหน้า พร้อมปุ่มติดต่อด่วน | หัวข้อเชิญชวน, ข้อความย่อย, ปุ่ม LINE, ปุ่มกรอกฟอร์ม |
| **11** | `SectionHeading` | `ui/SectionHeading.vue` | บล็อกหัวข้อคั่นส่วนมาตรฐาน พร้อม Badge และ Subtitle | Badge text, Title, Subtitle, การจัดตำแหน่ง (ซ้าย / กึ่งกลาง) |

---

## 4. โครงสร้าง Context Data สำหรับ MongoDB Atlas

ไฟล์ Context Data ถูกจัดทำขึ้นเป็นฐานข้อมูลตั้งต้นเรียบร้อยแล้วที่:  
📁 [**`app/data/mongoPagesSeed.json`**](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/data/mongoPagesSeed.json)

### โครงสร้าง Schema (Document Model ใน Collection `pages`):
```json
{
  "_id": "ObjectId",
  "slug": "string (เช่น '', 'about', 'scholarship-2026')",
  "path": "string (เช่น '/', '/about', '/scholarship-2026')",
  "title": "string (ชื่อหน้าเว็บ)",
  "isSystem": "boolean (true = หน้าหลักของระบบ, false = หน้าสร้างใหม่)",
  "status": "published | draft",
  "seo": {
    "metaTitle": "string",
    "metaDescription": "string",
    "ogImage": "string (URL รูปปกแชร์ Social)"
  },
  "sections": [
    {
      "id": "sec-01",
      "componentType": "HeroLuxuryCarousel | DestinationsGrid | BudgetComparison | ...",
      "name": "string (ชื่อเรียกของบล็อก)",
      "order": 1,
      "isEnabled": true,
      "props": {
        /* ค่าพารามิเตอร์ตามแต่ละชนิด Component */
      }
    }
  ],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## 5. กระบวนการสร้างหน้าใหม่ (New Page Creation Workflow)

เมื่อผู้ดูแลระบบกดปุ่ม **`[➕ New Page]`** ในเมนู Pages ของ CMS:
1. **Modal Form Step 1: กำหนดข้อมูลพื้นฐาน**
   - ระบุ **Page Title** (เช่น: *"งานสัมมนาเรียนต่ออังกฤษและออสเตรเลีย 2026"*)
   - ระบบจะ Auto-generate **URL Slug** ให้ทันที: `/events/uk-au-seminar-2026` (สามารถแก้ไขเองได้)
   - กำหนดข้อมูล SEO (Meta Title, Description, Share Image)
2. **Step 2: หน้ารวม Component Blocks (Visual Canvas)**
   - แอดมินสามารถกดปุ่ม **`+ Add Block`** เพื่อเปิด Palette เลือก 1 ใน 11 Components ข้างต้น
   - เลื่อนจัดลำดับบล็อกขึ้น-ลง (Reorder)
   - เปิดสวิตช์ [เปิด/ปิด] การแสดงผลของบล็อกนั้นๆ
   - แก้ไขข้อความในบล็อกผ่าน Form Editor ทางด้านซ้าย พร้อมพรีวิวหน้าเว็บจริงด้านขวา
3. **Step 3: กด "Publish"**
   - ข้อมูลบันทึกลง MongoDB Atlas (หรือ Sync ลง Local JSON ในโหมด Dev)
   - หน้าบ้าน Nuxt 3 สามารถสร้าง Dynamic Route รองรับหน้านั้นๆ ได้ทันทีโดยไม่ต้องเขียนโค้ดเพิ่ม!

---

## 6. สรุปความพร้อมก่อนเริ่มดำเนินงาน

- [x] ตรวจสอบโครงสร้าง 10 Components ใน `app/components/home` และ `app/components/ui` ครบถ้วน
- [x] รวบรวมข้อมูลตั้งต้น 8 หน้าหลักจาก `app/pages` จัดทำเป็น [**`app/data/mongoPagesSeed.json`**](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/data/mongoPagesSeed.json) สำหรับ MongoDB Atlas
- [x] วางแผนผัง Left-Sidebar เมนู `CONTENT -> Pages [+]` พร้อมสถาปัตยกรรม Block-Based Page Builder
- [x] เตรียมความพร้อมเชื่อมโยงข้อมูลสู่โปรเจกต์ `studyWiz-cms` ที่เลเยอร์ `Freelance Work`

---
*พี่ต่อสามารถตรวจสอบแผนฉบับปรับปรุงนี้ได้เลยครับ หากตรวจดูโครงสร้าง Components และ Seed Data แล้วเห็นชอบ แจ้งเจฟได้ทันที เราจะเริ่มลงมือสร้างโครงสร้างของจริงตามแผนนี้ครับ!*
