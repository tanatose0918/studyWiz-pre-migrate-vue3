# Studywiz (WordPress to Vue 3 / Nuxt 3) Migration & Implementation Plan v2

> **เอกสารแผนงานสถาปัตยกรรมและการย้ายระบบ (Replatforming Blueprint)**  
> **โครงการ**: Studywiz Education Consultant Web Modernization  
> **เป้าหมาย**: Replatform จาก WordPress (Astra + Elementor) สู่ **Vue 3 (Nuxt 3 SSG)** นำขึ้น Deploy บน **Vercel**  
> **ผู้วิเคราะห์และจัดทำ**: Jeffcaliber & Tor (พี่ต่อ)  
> **สถานะ**: Production-Ready Architectural Blueprint v2

---

## 1. Executive Summary & Migration Objective

เว็บไซต์เดิมของ **Studywiz** (`https://www.studywiz.net`) เป็นเว็บสถาบันแนะแนวศึกษาต่อต่างประเทศที่ก่อตั้งมาตั้งแต่ปี พ.ศ. 2528 ปัจจุบันใช้ WordPress พร้อมธีม Astra และปลั๊กอิน Elementor โค้ด HTML มี Overhead สูงจาก Page Builder, โหลดช้า, ติดปัญหาเรื่อง Asset bloat และมีข้อจำกัดเรื่อง Maintenance

### วัตถุประสงค์หลักในการ Replatform:
1. **Performance & Speed**: แปลงเป็น **Static Site Generation (SSG)** ด้วย Nuxt 3 โหลดระดับ Sub-second (Lighthouse Performance Score 95-100) รองรับการเปิดบนมือถือได้อย่างลื่นไหล
2. **Cost-Free & Zero Maintenance**: เอาขึ้นโฮสต์บน **Vercel** ผ่าน Global Edge CDN ไม่มีค่าโฮสติ้ง Database หน้าบ้าน ไม่เสี่ยงถูก Hack เหมือน PHP/WordPress Monolith
3. **Clean Architecture & Nuxt Layers**: จัดโครงสร้างโค้ดแบบแยกโมดูลตาม Business Domain (Courses, Destinations, Blogs, Testimonials, Activities, Contact) สะอาด ไม่ผูกติดกับ CMS ใด CMS หนึ่ง สามารถดึงข้อมูลผ่าน REST API / GraphQL หรือเปลี่ยนเป็น Headless CMS / Markdown ได้อิสระ
4. **100% SEO Parity & URL Redirects**: รักษาระดับ SEO เดิมที่ติด Google มานาน โดยวางโครงสร้าง 301 Redirects จาก URL ภาษาไทยและโครงสร้างเก่าของ WordPress สู่ Clean URL ใหม่ทั้งหมด

---

## 2. Overall Architectural Strategy

```
+---------------------------------------------------------------------------------------+
|                                    VERCEL EDGE CDN                                    |
|              (Static HTML, Tailwind CSS, Prerendered Vue 3 Island Components)         |
+-------------------------------------------+-------------------------------------------+
                                            ^
                         [Build Time: 'nuxt generate' / Webhook]
                                            |
+-------------------------------------------+-------------------------------------------+
|                               NUXT 3 CORE ENGINE                                      |
|                                                                                       |
|   +-------------------------------------------------------------------------------+   |
|   | Presentation Layer: Pages, Layouts, Nuxt Components, Composables               |   |
|   +---------------------------------------+---------------------------------------+   |
|                                           | (Calls Ports)                             |
|   +---------------------------------------v---------------------------------------+   |
|   | Domain Layer: Pure TypeScript Models, Entities, Contracts (No Framework)       |   |
|   +---------------------------------------+---------------------------------------+   |
|                                           ^ (Dependency Inversion)                    |
|   +---------------------------------------|---------------------------------------+   |
|   | Infrastructure Layer: Repositories (WP REST Adapter / Local Content / Mock)   |   |
|   +-------------------------------------------------------------------------------+   |
+---------------------------------------------------------------------------------------+
                                            |
                        [Fetch data at SSG generation phase]
                                            v
                +-------------------------------------------------------+
                | Existing WordPress Backend (REST API /wp-json/wp/v2)  |
                | or Nuxt Content (Markdown/YAML) for Static Autonomy   |
                +-------------------------------------------------------+
```

### Directory Structure (Nuxt Layers + DDD)
```text
studywiz-vue3/
├── nuxt.config.ts
├── app.vue
├── vercel.json                         # 301 Redirects & Header caching
├── public/                             # Static assets, logos, flags, favicons
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero/
│   │   ├── levels/
│   │   └── flags/
├── server/
│   └── api/
│       └── contact.post.ts             # Vercel Serverless Function สำหรับรับฟอร์มส่งเมล/Line
├── domains/
│   ├── core/                           # Shared Components, Layouts, UI Tokens
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── TheTopBar.vue
│   │   │   │   ├── TheNavbar.vue
│   │   │   │   ├── TheMobileDrawer.vue
│   │   │   │   ├── TheFooter.vue
│   │   │   │   └── FloatingContactSpeedDial.vue
│   │   │   └── ui/
│   │   │       ├── BaseButton.vue
│   │   │       ├── BaseBadge.vue
│   │   │       ├── BaseCard.vue
│   │   │       ├── BaseModal.vue
│   │   │       └── SectionHeading.vue
│   │   └── types/common.ts
│   ├── destinations/                   # Domain: ประเทศและโซนภูมิภาค
│   │   ├── components/
│   │   │   ├── RegionFilterTabs.vue
│   │   │   ├── CountryCard.vue
│   │   │   └── CountryGrid.vue
│   │   ├── composables/useDestinations.ts
│   │   ├── pages/country/
│   │   │   ├── index.vue               # /country (All)
│   │   │   └── [region].vue            # /country/asia, /country/europe-uk, etc.
│   │   └── types/destination.ts
│   ├── courses/                        # Domain: ระดับการศึกษาและสถาบัน (Language, Highschool, Uni)
│   │   ├── components/
│   │   │   ├── LevelSelectorCard.vue
│   │   │   ├── InstitutionCard.vue
│   │   │   └── InstitutionBrochureModal.vue
│   │   ├── composables/useCourses.ts
│   │   ├── pages/level/
│   │   │   ├── index.vue               # /level
│   │   │   ├── high-school.vue         # /level/high-school (เดิม /มัธยม/)
│   │   │   ├── language.vue            # /level/language
│   │   │   └── university/
│   │   │       ├── index.vue
│   │   │       └── [country].vue       # /level/university/china, /usa, /poland, etc.
│   │   └── types/course.ts
│   ├── blogs/                          # Domain: บทความ, ข่าวสาร, รีวิว
│   │   ├── components/
│   │   │   ├── BlogCard.vue
│   │   │   ├── BlogCategoryTabs.vue
│   │   │   ├── BlogShareBar.vue
│   │   │   └── RelatedPosts.vue
│   │   ├── composables/useBlogs.ts
│   │   ├── pages/blog/
│   │   │   ├── index.vue               # /blog
│   │   │   ├── all.vue                 # /blog/all (รวมบทความทั้งหมด)
│   │   │   ├── category/[slug].vue     # หมวดหมู่ตามภูมิภาค
│   │   │   └── [slug].vue              # Single article detail
│   │   └── types/blog.ts
│   ├── testimonials/                   # Domain: รีวิวและบทสัมภาษณ์นักเรียน
│   │   ├── components/
│   │   │   ├── TestimonialCard.vue
│   │   │   ├── StudentQuoteModal.vue
│   │   │   └── VideoTestimonialPlayer.vue
│   │   ├── pages/testimonial/
│   │   │   └── index.vue
│   │   └── types/testimonial.ts
│   ├── activities/                     # Domain: กิจกรรม สัมมนา และอีเวนต์
│   │   ├── components/
│   │   │   ├── ActivityCard.vue
│   │   │   └── EventStatusBadge.vue
│   │   ├── pages/activities/
│   │   │   └── index.vue
│   │   └── types/activity.ts
│   └── contact/                        # Domain: ช่องทางติดต่อและแบบฟอร์ม
│       ├── components/
│       │   ├── ContactInquiryForm.vue
│       │   ├── BranchOfficeCard.vue
│       │   └── LineCommunityBanner.vue
│       ├── pages/contact/
│       │   └── index.vue
│       └── types/contact.ts
```

---

## 3. Comprehensive Sitemap & Routing Architecture

จากผลการ Scrape เว็บไซต์จริง (`https://www.studywiz.net/wp-json/wp/v2/pages`) พบว่ามีทั้งหน้าภาษาไทยและภาษาอังกฤษ รวมทั้ง URL บางหน้าเป็นภาษาไทยที่ encode เช่น `/%e0%b8%a1%e0%b8%b1%e0%b8%98%e0%b8%a2%e0%b8%a1/` เราจะทำการ Normalize เป็น Clean URL Structure และทำ 301 Redirects รองรับทั้งหมด:

| WordPress Original URL | New Clean Vue 3 Route | Page Title / Description | Primary Domain |
| :--- | :--- | :--- | :--- |
| `/` or `/home` | `/` | หน้าแรก: แนะนำสถาบัน, จุดเด่น, คอร์ส, ข่าวสารล่าสุด | Core / Home |
| `/country/` | `/country` | ศูนย์รวมประเทศที่รับสมัคร (Tab: All) | Destinations |
| `/asia/` | `/country/asia` | ประเทศในเอเชีย (China, Japan, Korea) | Destinations |
| `/europe-uk/` | `/country/europe-uk` | ยุโรป & สหราชอาณาจักร (Poland, Germany, UK, etc.) | Destinations |
| `/canada-usa/` | `/country/canada-usa` | สหรัฐอเมริกา & แคนาดา | Destinations |
| `/australia-new-zealand/` | `/country/australia-new-zealand` | ออสเตรเลีย & นิวซีแลนด์ | Destinations |
| `/level-th/` | `/level` | รวมระดับการศึกษา (Language, High School, University) | Courses |
| `/%e0%b8%a1%e0%b8%b1%e0%b8%98%e0%b8%a2%e0%b8%a1/` | `/level/high-school` | ศึกษาต่อระดับมัธยม (Woosong, Maple Leaf, Boren) | Courses |
| `/universitychina/` | `/level/university/china` | มหาวิทยาลัยแพทย์ & สถาบันในจีน (24+ มหาวิทยาลัย) | Courses |
| `/universityusa/` | `/level/university/usa` | มหาวิทยาลัยในสหรัฐอเมริกา (Full Sail, Kent State...) | Courses |
| `/universityjapan/` | `/level/university/japan` | สถาบันในประเทศญี่ปุ่น (Columbia Int'l School) | Courses |
| `/universitykorea/` | `/level/university/korea` | สถาบันในเกาหลี (Lexis Korea, Woosong) | Courses |
| `/en/universitypoland/` | `/level/university/poland` | มหาวิทยาลัยในโปแลนด์ (Lazarski, Wroclaw, etc.) | Courses |
| `/en/universityrussia/` | `/level/university/russia` | มหาวิทยาลัยในรัสเซีย (Kursk Medical, Siberian) | Courses |
| `/testimonial-2/` | `/testimonial` | หน้ารวมรีวิว เสียงจากนักเรียน และผู้ปกครอง | Testimonials |
| `/blog-2/` | `/blog` | หน้าหลักบล็อก & PR (จัดกลุ่มตามโซน) | Blogs |
| `/all/` | `/blog/all` | คลังบทความและรีวิวทั้งหมด (Archive Feed) | Blogs |
| `/%e0%b8%9a%e0%b8%97%e0%b8%84%e0%b8%a7%e0%b8%b2%e0%b8%a1%e0%b8%88%e0%b8%b5%e0%b8%99/` | `/blog/category/china-korea-japan` | บทความเรียนต่อจีน เกาหลี ญี่ปุ่น | Blogs |
| `/%e0%b8%9a%e0%b8%97%e0%b8%84%e0%b8%a7%e0%b8%b2%e0%b8%a1%e0%b8%a2%e0%b8%b8%e0%b9%82%e0%b8%a3%e0%b8%9b_%e0%b8%a3%e0%b8%b1%e0%b8%aa%e0%b9%80%e0%b8%8b%e0%b8%b5%e0%b8%a2/` | `/blog/category/europe-russia` | บทความเรียนต่อยุโรปและรัสเซีย | Blogs |
| `/%e0%b8%9a%e0%b8%97%e0%b8%84%e0%b8%a7%e0%b8%b2%e0%b8%a1%e0%b8%ad%e0%b9%80%e0%b8%a1%e0%b8%a3%e0%b8%b4%e0%b8%81%e0%b8%b2_%e0%b9%81%e0%b8%84%e0%b8%99%e0%b8%99%e0%b8%b2%e0%b8%94%e0%b8%b2/` | `/blog/category/usa-canada` | บทความเรียนต่ออเมริกาและแคนาดา | Blogs |
| `/[post-slug]/` | `/blog/[slug]` | หน้ารายละเอียดบทความเดี่ยว (เช่น รีวิว Lazarski) | Blogs |
| `/activities-2/` | `/activities` | กิจกรรม งานสัมมนา และอีเวนต์ออนไลน์ | Activities |
| `/about-2/` | `/about` | เกี่ยวกับ Studywiz, การรับรอง TIECA & FELCA, พันธกิจ | Core / About |
| `/contact-th/` | `/contact` | ติดต่อเรา: สำนักงานกทม., เชียงใหม่, แบบฟอร์ม | Contact |

---

## 4. Live Scraped Component Breakdown (แยกตามหน้า)

### 4.1 Global Layout & Shell Components

โครงสร้างพื้นฐานที่แสดงผลทุกหน้าจอ เพื่อให้ได้ความรู้สึกพรีเมียมและติดต่อทีมงานได้ตลอดเวลา:

#### 1) `TheTopBar.vue` (แถบข้อมูลติดต่อด้านบนสุด)
* **Elements**:
  * ข้อมูลด่วน: เบอร์โทรหลัก `08-1934-9695` (Click-to-call `tel:0819349695`)
  * อีเมลหลัก: `info@studywiz.net` (Click-to-email)
  * Social Icons:
    * Facebook: `https://www.facebook.com/studywiz`
    * Line Official: `https://page.line.me/?accountId=studywiz`
    * Instagram: `https://www.instagram.com/studywizbkk/`
    * TikTok: `https://www.tiktok.com/@studywiz8`
    * YouTube: `https://www.youtube.com/channel/UCRddmcoQ5sPejlFrVqRirdg`
  * Language Switcher: Toggle ไทย / English

#### 2) `TheNavbar.vue` (แถบเมนูหลัก)
* **Elements**:
  * โลโก้ Studywiz SVG/PNG (คมชัดบน Retina Display)
  * เมนูหลัก (Desktop Links):
    * `Home` -> `/`
    * `Country` -> `/country`
    * `Level` -> `/level`
    * `Testimonial` -> `/testimonial`
    * `Blog` (Dropdown Hover Menu):
      * รวมบทความทั้งหมด (`/blog/all`)
      * บทความจีน เกาหลี ญี่ปุ่น (`/blog/category/china-korea-japan`)
      * บทความยุโรปและรัสเซีย (`/blog/category/europe-russia`)
      * บทความอเมริกาและแคนาดา (`/blog/category/usa-canada`)
    * `Activities` -> `/activities`
    * `About` -> `/about`
    * `Contact` -> `/contact`
  * CTA Button: "ติดต่อสอบถาม" (ปุ่มเด่นสีฟ้า/ม่วงนำสายตา พุ่งตรงไปที่หน้า `/contact` หรือเปิด Quick Inquiry Modal)
  * Mobile Toggle Button (Hamburger icon)

#### 3) `TheMobileDrawer.vue` (เมนูข้างบนมือถือ)
* เลื่อนเปิดแบบ Smooth Off-canvas
* รองรับ Collapsible Accordion ในหัวข้อ Blog Dropdown
* มีเบอร์โทรด่วนและปุ่มแอด Line ด้านล่างของ Drawer

#### 4) `TheFooter.vue` (ส่วนท้ายเว็บไซต์)
* แบ่งเป็น 4-5 คอลัมน์หลักตามข้อมูลจริง:
  * **Col 1 (About Summary)**: แนะนำ Studywiz ผู้นำด้านแนะแนวศึกษาต่อต่างประเทศ ก่อตั้งปี 2528 สมาชิก TIECA & FELCA
  * **Col 2 (Programs / Levels)**: ภาษา (Language), มัธยม (High School), วิทยาลัย/มหาวิทยาลัย (College/University)
  * **Col 3 (Quick Links)**: Home, Country, Level, Testimonial, Blog, Activities, About, Contact
  * **Col 4 (Bangkok Headquarter)**:
    * ที่อยู่: 7 ซอยพหลโยธิน 19/1 ถนนพหลโยธิน แขวง/เขต จตุจักร กรุงเทพฯ 10900 (ลิงก์ Google Maps พิกัดจริง)
    * โทรศัพท์: `(66)8 1934 9695`, `(66)8 2282 9882`, `(66)8 1655 7044`, `(66)8 6305 5259`
    * อีเมล: `info@studywiz.net`
    * Socials: Facebook BKK, Line BKK, IG, TikTok, YouTube
  * **Col 5 (Chiang Mai Office)**:
    * โทรศัพท์: `(66)8 1359 2100`
    * อีเมล: `north@studywiz.net`
    * Socials: Facebook เชียงใหม่ (`Studywizcnx`), Line CNX
  * **Bottom Bar**: Copyright © 2026 Studywiz Co., Ltd. All rights reserved.

#### 5) `FloatingContactSpeedDial.vue` (ปุ่ม Floating ติดตามจอ)
* ปุ่มลอยมุมขวาล่าง:
  * ปุ่มด่วนแอด Line Official (Green Badge พร้อม Animation Pulse ดึงดูดสายตา)
  * ปุ่มกดโทรด่วนหาเจ้าหน้าที่
  * ปุ่ม Back-to-Top เมื่อเลื่อนหน้าจอเกิน 400px

---

### 4.2 Home Page (`/`)

* **Component 1: `HeroBannerSlider.vue`**:
  * แสดงสโลแกนหลัก: *"ศึกษาต่อต่างประเทศครบวงจรกับผู้เชี่ยวชาญ ค้นพบโอกาสที่ไร้ขีดจำกัด"*
  * ภาพพื้นหลังคุณภาพสูงและปุ่ม Call to Action (เช่น "ค้นหาหลักสูตร" & "ปรึกษาฟรี")
* **Component 2: `PhilosophySection.vue`**:
  * 2-Column Responsive Layout:
    * ฝั่งซ้าย: กล่อง Embed Video แนะนำสถาบัน (รองรับ YouTube iframe หรือ HTML5 Video)
    * ฝั่งขวา: ข้อความประวัติและปรัชญา ("ก่อตั้งขึ้นโดยนักการศึกษาตั้งแต่ปี พ.ศ. 2528... โอกาสทางการศึกษาไม่ควรถูกปิดกั้นด้วยอายุ งบประมาณ หรือเกรดเฉลี่ย")
* **Component 3: `ProgramLevelGrid.vue`**:
  * Grid 3 คอลัมน์สำหรับ 3 ระดับการศึกษา:
    1. **ภาษา (Language)**: ภาพกิจกรรมภาษา + ลิงก์ไป `/country`
    2. **มัธยม (High School)**: ภาพโรงเรียนมัธยม + ลิงก์ไป `/level/high-school`
    3. **วิทยาลัย / มหาวิทยาลัย (College/University)**: ภาพรั้วมหาวิทยาลัย + ลิงก์ไป `/country`
* **Component 4: `FeaturedBlogSection.vue`**:
  * Card Grid 3 บทความเด่นล่าสุด:
    1. *รีวิว Lazarski University ที่วอร์ซอ โดยน้องฮีโร่*
    2. *เรียนบริหารที่ SolBridge International School of Business*
    3. *ไปเรียนหมอที่ม.แพทย์อันดับ 1 ในรัสเซียกัน*
  * มีปุ่ม "ดูบทความทั้งหมด" เชื่อมไปที่ `/blog/all`
* **Component 5: `ConsultationBanner.vue`**:
  * แบนเนอร์ชวนรับคำปรึกษาฟรี ไม่มีค่าใช้จ่าย พร้อมปุ่ม "นัดหมายล่วงหน้า"

---

### 4.3 Country Hub & Regional Directory (`/country`, `/country/[region]`)

จากข้อมูลที่ดึงได้จาก WP REST API หน้านี้ทำหน้าที่เป็น Filterable Hub สำหรับ 5 ภูมิภาค และแสดงสถาบัน/ประเทศทั้งหมด:
* **Component 1: `RegionFilterTabs.vue`**:
  * แท็บกดสลับ: `[ทั้งหมด (All)]`, `[เอเชีย (Asia)]`, `[ออสเตรเลีย-นิวซีแลนด์]`, `[แคนาดา-อเมริกา]`, `[ยุโรป-สหราชอาณาจักร]`
  * ทำงานแบบ Client-side filter รวดเร็ว ไม่ต้อง Reload หน้าเว็บ
* **Component 2: `CountryCardGrid.vue`**:
  * การ์ดประเทศ 15+ ประเทศตามข้อมูลจริง:
    * **Asia**: China (จีน), Japan (ญี่ปุ่น), Korea (เกาหลีใต้), Singapore (สิงคโปร์)
    * **Europe & UK**: Poland (โปแลนด์), Russia (รัสเซีย), Germany (เยอรมนี), Netherlands (เนเธอร์แลนด์), Switzerland (สวิตเซอร์แลนด์), United Kingdom (อังกฤษ), France (ฝรั่งเศส), Italy (อิตาลี)
    * **Canada & USA**: United States of America (สหรัฐฯ), Canada (แคนาดา)
    * **Australia & NZ**: Australia (ออสเตรเลีย), New Zealand (นิวซีแลนด์)
  * ในแต่ละการ์ดมีภาพธงชาติ/ทิวทัศน์, ชื่อประเทศ, จำนวนหลักสูตรที่เปิดรับ และปุ่มกดดูสถาบัน

---

### 4.4 Level & Institution Directory (`/level`, `/level/high-school`, `/level/university/[country]`)

* **Component 1: `LevelHubHero.vue`**:
  * แนะนำ 3 เส้นทางการศึกษา: คอร์สภาษา, มัธยมศึกษา, ปริญญาตรี-โท-เอก
* **Component 2: `HighSchoolShowcase.vue` (หน้า `/level/high-school`)**:
  * การ์ดโรงเรียนมัธยมประจำและแลกเปลี่ยน (ดึงจากหน้า `/%e0%b8%a1%e0%b8%b1%e0%b8%98%e0%b8%a2%e0%b8%a1/`):
    * **Maple Leaf International Schools** (โรงเรียนนานาชาติเมเปิลลีฟ)
    * **Boren Sino-Canadian School** (หลักสูตรแคนาดาในเอเชีย)
    * **Woosong University High School Program**
* **Component 3: `UniversityByCountryGrid.vue` (หน้า `/level/university/[country]`)**:
  * ตัวอย่างหน้า `/level/university/china` (มีมหาวิทยาลัยจริงกว่า 24 แห่ง):
    * China Medical University (ม.การแพทย์จีน)
    * Dalian Medical University
    * Donghua University
    * Dongbei University of Finance and Economics (DUFE)
    * East China Normal University
    * Fujian Medical University
    * Hebei Medical University
    * Huazhong University of Science & Technology (HUST)
    * Nanjing University of Science & Technology
    * Shandong University
  * ตัวอย่างหน้า `/level/university/usa`:
    * Alfred University New York, Central Michigan, Full Sail University, Kent State, Lake Washington Institute, North Park, Pace University NY, Rochester Institute of Technology, Univ of Alabama, Univ of Delaware
  * ตัวอย่างหน้า `/level/university/poland`:
    * Lazarski University, Collegium Civitas, Kozminski University, University of Wroclaw, Warsaw University of Life Sciences
* **Component 4: `InstitutionCard.vue`**:
  * แสดง Logo, ชื่อสถาบัน, เมือง/ประเทศ, สาขาเด่น (เช่น คณะแพทยศาสตร์, บริหารธุรกิจ, วิศวกรรม), ทุนการศึกษาที่มี และปุ่ม "ขอข้อมูลหลักสูตร"

---

### 4.5 Testimonials & Success Stories (`/testimonial`)

* **Component 1: `TestimonialFilter.vue`**:
  * ตัวกรองรีวิวตามประเทศ (เช่น รีวิวโปแลนด์, รีวิวรัสเซีย, รีวิวแคนาดา)
* **Component 2: `TestimonialCardGrid.vue`**:
  * รวบรวมประสบการณ์จริงจากนักเรียน:
    * *น้องฮีโร่* (Lazarski University โปแลนด์)
    * *น้องพลอย ปวีณ์กร* (Phamaceutical Engineering)
    * *น้องปานดาว ปณาลี* (ผู้ได้รับทุนการศึกษา 100% 1 ปี)
    * *น้องกั๊ป Grade 12* (เรียนโรงเรียนมัธยมรัฐบาลในแคนาดา)
    * *น้องอัยมี่ กาแบ* (เรียนแพทย์ที่ Kursk State Medical University รัสเซีย)
    * *น้องมด ธารทิพย์* (เรื่องเล่าเมืองกังหัน เนเธอร์แลนด์)
    * *น้องพิม ตมิสา* (MBA Luxury Brand Management ปารีส ฝรั่งเศส)
* **Component 3: `StudentStoryModal.vue`**:
  * Pop-up อ่านบทสัมภาษณ์ฉบับเต็ม พร้อมรูปถ่ายชีวิตในรั้วมหาวิทยาลัยต่างแดน

---

### 4.6 Blogs & PR Hub (`/blog`, `/blog/all`, `/blog/[slug]`)

* **Component 1: `BlogFeaturedBanner.vue`**: บทความเด่นประจำสัปดาห์
* **Component 2: `BlogCategoryTabs.vue`**: แท็บเลือกหมวดหมู่:
  * ทั้งหมด
  * เรียนต่อจีน เกาหลี ญี่ปุ่น
  * เรียนต่อยุโรปและรัสเซีย
  * เรียนต่ออเมริกาและแคนาดา
  * เตรียมตัวสอบและแนะนำอาชีพ (เด็ก 64 Looking Ahead)
* **Component 3: `BlogCard.vue`**:
  * รูป Thumbnail อัตราส่วน 16:9 สวยงาม
  * วันที่เผยแพร่, ชื่อหมวดหมู่ Tag
  * ชื่อหัวข้อจำกัด 2 บรรทัด (Line-clamp-2)
  * เนื้อหาเกริ่นนำ (Excerpt) 3 บรรทัด
  * ชื่อผู้เขียน/แอดไวเซอร์ และปุ่ม "อ่านต่อ →"
* **Component 4: `BlogDetailView.vue` (หน้า `/blog/[slug]`)**:
  * Breadcrumbs นำทาง: `หน้าแรก > บทความ > ชื่อบทความ`
  * Hero Header แสดงหัวข้อ, วันที่, ผู้เขียน, ภาพประกอบขนาดใหญ่
  * เนื้อหาหลักแบบ Markdown / Typographic Prose
  * กล่องผู้เขียนและคำแนะนำจาก Studywiz
  * Social Sharing (Facebook Share, Line Share, คัดลอกลิงก์)
  * Related Posts 3 บทความที่เกี่ยวข้องในหมวดหมู่เดียวกัน

---

### 4.7 Activities & Seminars (`/activities`)

* **Component 1: `ActivityHero.vue`**: แนะนำงานสัมมนาและกิจกรรมแนะแนว
* **Component 2: `EventCardGrid.vue`**:
  * การ์ดกิจกรรมสัมมนา (ดึงจากข้อมูลจริง):
    * *เรียนแพทย์รัสเซียดียังไง (Medicine in Russia)*
    * *เคลียร์คิว เคลียร์ใจ ถามไป-ตอบมา กับคณาจารย์มหาวิทยาลัยแพทย์ชั้นนำของจีน*
    * *สัมมนาสด: ไปเรียนเกาหลีกัน*
* **Component 3: `EventCard.vue`**:
  * ป้ายสถานะ: `[เปิดรับสมัคร]`, `[สัมมนาออนไลน์ย้อนหลัง]`, `[เร็วๆ นี้]`
  * วันที่จัดงาน, ช่องทาง (Zoom / ออฟฟิศ Studywiz)
  * ปุ่ม "ลงทะเบียนเข้าร่วม" หรือ "ดูบันทึกย้อนหลัง"

---

### 4.8 About Us (`/about`)

* **Component 1: `AboutHeritageSection.vue`**:
  * ประวัติและจุดเริ่มต้นตั้งแต่ปี พ.ศ. 2528 (กว่า 38 ปีแห่งความไว้วางใจ)
* **Component 2: `AccreditationBadges.vue`**:
  * โลโก้และหนังสือรับรองสมาชิก **TIECA** (สมาคมไทยแนะแนวการศึกษานานาชาติ) และ **FELCA**
* **Component 3: `WhyChooseUsGrid.vue`**:
  * 4 จุดเด่น: ให้คำปรึกษาตรงไปตรงมา, มีทางเลือกให้ทุกงบประมาณ, ดูแลเอกสารวีซ่าครบวงจร, ติดตามผลตลอดระยะเวลาที่เรียน
* **Component 4: `GlobalPartnersShowcase.vue`**:
  * โลโก้มหาวิทยาลัยพันธมิตรทั่วโลก (Marquee / Grid สวยงาม)

---

### 4.9 Contact Us & Branches (`/contact`)

* **Component 1: `BranchOfficeGrid.vue`**:
  * การ์ดแสดง 2 สำนักงานหลัก:
    * **สำนักงานใหญ่ กรุงเทพฯ**:
      * ที่อยู่: 7 ซอยพหลโยธิน 19/1 ถนนพหลโยธิน แขวง/เขต จตุจักร กรุงเทพฯ 10900
      * เบอร์สายด่วน: `08 1934 9695`, `08 2282 9882`, `08 1655 7044`, `08 6305 5259`
      * อีเมล: `info@studywiz.net`
      * แผนที่ Google Maps แบบ Interactive
    * **สำนักงานสาขา เชียงใหม่**:
      * เบอร์โทร: `08 1359 2100`
      * อีเมล: `north@studywiz.net`
      * ลิงก์แผนที่เชียงใหม่
* **Component 2: `LineCommunitySection.vue`**:
  * การ์ดเข้าร่วมกลุ่ม Line OpenChat ตามความสนใจ:
    * กลุ่ม *"ศึกษาต่อต่างประเทศ"*
    * กลุ่ม *"เรียนนอก งบไทยๆ"*
    * ลิงก์ `Linktree`: `https://linktr.ee/studywiz`
* **Component 3: `ContactInquiryForm.vue` (แบบฟอร์มฝากข้อความถึงเรา)**:
  * ช่องกรอกตามสเปคจริงของฟอร์มเดิม:
    * `Name` (ชื่อ-นามสกุล) - Required
    * `Phone` (เบอร์โทรศัพท์) - Required
    * `Line ID` (ไอดีไลน์สำหรับติดต่อกลับสะดวก)
    * `Email` (อีเมล) - Required
    * `Subject` (ระดับการศึกษาหรือประเทศที่สนใจ)
    * `Comments / Questions` (ข้อความหรือคำถามที่ต้องการปรึกษา)
  * สถานะการกดส่ง (Loading Spinner, Success Notification, Error Handling)

---

## 5. Domain Entities & TypeScript Models

```typescript
// domains/destinations/types/destination.ts
export type RegionCode = 'asia' | 'europe-uk' | 'canada-usa' | 'australia-new-zealand';

export interface Country {
  id: string;
  slug: string;
  nameTh: string;
  nameEn: string;
  region: RegionCode;
  flagUrl: string;
  bannerImage: string;
  shortDescription: string;
  totalInstitutions: number;
  featured: boolean;
}

// domains/courses/types/course.ts
export type StudyLevel = 'language' | 'highschool' | 'university';

export interface Institution {
  id: string;
  slug: string;
  nameTh: string;
  nameEn: string;
  countrySlug: string;
  level: StudyLevel;
  logoUrl: string;
  coverImage: string;
  location: string;
  highlightPrograms: string[];
  hasScholarship: boolean;
  websiteUrl?: string;
  overviewHtml: string;
}

// domains/blogs/types/blog.ts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedDate: string;
  author: string;
  category: {
    id: string;
    slug: string;
    name: string;
  };
  featuredImage: {
    url: string;
    alt: string;
  } | null;
  readingTimeMinutes: number;
}

// domains/testimonials/types/testimonial.ts
export interface Testimonial {
  id: string;
  studentName: string;
  institutionName: string;
  country: string;
  program: string;
  quoteTh: string;
  fullStoryHtml: string;
  avatarUrl: string;
  videoUrl?: string;
  year: string;
}

// domains/activities/types/activity.ts
export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  platform: 'Zoom' | 'Studywiz Office' | 'On-site';
  registrationUrl?: string;
  coverImage: string;
  isPast: boolean;
  recordedVideoUrl?: string;
}

// domains/contact/types/contact.ts
export interface ContactInquiryPayload {
  name: string;
  phone: string;
  lineId?: string;
  email: string;
  subject: string;
  message: string;
}
```

---

## 6. Vercel Serverless Form Handling & Notifications

เนื่องจากเรายกเลิก WordPress หลังบ้านและไม่ต้องการรันเซิร์ฟเวอร์ PHP/MySQL ให้ยุ่งยาก แบบฟอร์มติดต่อสอบถามจะถูกประมวลผลผ่าน **Nuxt 3 Nitro Server Route** ซึ่ง Deploy อัตโนมัติเป็น **Vercel Serverless Function**:

```typescript
// server/api/contact.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import type { ContactInquiryPayload } from '../../domains/contact/types/contact';

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactInquiryPayload>(event);

  // 1. Validation
  if (!body.name || !body.phone || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อ, เบอร์โทร, อีเมล, ข้อความ)',
    });
  }

  // 2. Notification Dispatcher
  // สามารถยิงแจ้งเตือนผ่าน Line Notify / Line Messaging API หรือส่ง Email เข้า info@studywiz.net ทันที
  const lineToken = process.env.LINE_NOTIFY_TOKEN;
  if (lineToken) {
    const textMessage = `\n📩 มีผู้ติดต่อใหม่จากหน้าเว็บ Studywiz!\nชื่อ: ${body.name}\nเบอร์โทร: ${body.phone}\nLine ID: ${body.lineId || '-'}\nอีเมล: ${body.email}\nเรื่อง: ${body.subject}\nข้อความ: ${body.message}`;
    
    await fetch('https://notify-api.line.me/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${lineToken}`,
      },
      body: new URLSearchParams({ message: textMessage }),
    });
  }

  return { success: true, message: 'ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุดครับ' };
});
```

---

## 7. Vercel Configuration & SEO 301 Redirects

ไฟล์ `vercel.json` เพื่อทำ 301 Permanent Redirect จาก URL WordPress เดิม ป้องกันลิงก์เสีย (Broken Links) และรักษาคะแนน SEO:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/%e0%b8%a1%e0%b8%b1%e0%b8%98%e0%b8%a2%e0%b8%a1", "destination": "/level/high-school", "permanent": true },
    { "source": "/level-th", "destination": "/level", "permanent": true },
    { "source": "/testimonial-2", "destination": "/testimonial", "permanent": true },
    { "source": "/blog-2", "destination": "/blog", "permanent": true },
    { "source": "/all", "destination": "/blog/all", "permanent": true },
    { "source": "/activities-2", "destination": "/activities", "permanent": true },
    { "source": "/about-2", "destination": "/about", "permanent": true },
    { "source": "/contact-th", "destination": "/contact", "permanent": true },
    { "source": "/asia", "destination": "/country/asia", "permanent": true },
    { "source": "/europe-uk", "destination": "/country/europe-uk", "permanent": true },
    { "source": "/canada-usa", "destination": "/country/canada-usa", "permanent": true },
    { "source": "/australia-new-zealand", "destination": "/country/australia-new-zealand", "permanent": true },
    { "source": "/universitychina", "destination": "/level/university/china", "permanent": true },
    { "source": "/universityusa", "destination": "/level/university/usa", "permanent": true },
    { "source": "/universityjapan", "destination": "/level/university/japan", "permanent": true },
    { "source": "/universitykorea", "destination": "/level/university/korea", "permanent": true },
    { "source": "/en/universitypoland", "destination": "/level/university/poland", "permanent": true },
    { "source": "/en/universityrussia", "destination": "/level/university/russia", "permanent": true }
  ]
}
```

---

## 8. Implementation Roadmap & Phases

```
+---------------------------------------------------------------------------------------+
| Phase 1: Project Initialization & Nuxt 3 Layer Scaffolding                            |
| (Setup Tailwind CSS, Icons, Fonts, Nuxt Config, Types & Domain Layers)                |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v
+---------------------------------------------------------------------------------------+
| Phase 2: Core Shell & Navigation Components                                           |
| (TheTopBar, TheNavbar, TheMobileDrawer, TheFooter, FloatingContactSpeedDial)          |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v
+---------------------------------------------------------------------------------------+
| Phase 3: Content Ingestion & Domain Repositories                                      |
| (Export/Fetch WP REST Data to Static JSON/Markdown, Build Composables & Mock Adapters) |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v
+---------------------------------------------------------------------------------------+
| Phase 4: Page Assembly & Interactive UI                                               |
| (Home, Country Hub, Level/Institutions, Testimonials, Blogs, Activities, About, Contact)|
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v
+---------------------------------------------------------------------------------------+
| Phase 5: Serverless Form & Notification Integration                                   |
| (/api/contact with Line Notify / Email forwarding, Client validation & UI states)     |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v
+---------------------------------------------------------------------------------------+
| Phase 6: SEO Hardening, Vercel SSG Build & Edge Deployment                            |
| (301 Redirects, OpenGraph Meta, Schema.org Structured Data, Sitemap XML, Lighthouse)  |
+---------------------------------------------------------------------------------------+
```

### รายละเอียดแต่ละเฟส:
* **Phase 1 (Day 1)**: ติดตั้ง Nuxt 3 + Tailwind CSS + Google Fonts (Prompt, Sarabun, Montserrat) + วางโครงสร้าง Domains ตามแผน
* **Phase 2 (Day 1-2)**: ทำ Layout Shell ครบทุกชิ้น (Header, Nav, Drawer, Footer, Floating Buttons) พร้อม Responsive 100%
* **Phase 3 (Day 2-3)**: ดึงข้อมูลจาก REST API เดิม 39 Pages และ 35+ Posts จัดเก็บเป็น Typed JSON/Markdown ให้ระบบรันแบบ SSG ได้สมบูรณ์โดยไม่ต้องพึ่งพาเซิร์ฟเวอร์ WordPress เก่า
* **Phase 4 (Day 3-5)**: ประกอบ UI ทั้ง 9 หน้าหลัก พร้อมการ์ดสถาบัน ฟิลเตอร์ภูมิภาค หมวดหมู่บทความ และหน้ารายละเอียด
* **Phase 5 (Day 5)**: เชื่อมต่อ Contact Form ผ่าน Vercel Serverless Function `/api/contact` ส่งข้อความเข้า Line/Email
* **Phase 6 (Day 6)**: ติดตั้งและเชื่อมต่อ CMS Backoffice สำหรับจัดการ Carousel Highlights, ข่าวสาร PR และแบนเนอร์
* **Phase 7 (Day 7)**: ตรวจสอบ 301 Redirects, ทดสอบ Build SSG (`npx nuxi generate`), ตั้งค่า Vercel Project และชี้โดเมน

---

## 9. CMS Backoffice Architecture & Content Position Mapping

สำหรับความต้องการในการมี **Backoffice / CMS Web** เพื่อให้แอดมินหรือทีมงานการตลาดของ Studywiz สามารถเข้าสู่ระบบเพื่อแก้ไขข้อความประชาสัมพันธ์ (PR News) และจัดการ **Carousel Highlight ในหน้าแรก** รวมถึงข้อมูลในตำแหน่งต่างๆ ได้อย่างสะดวก โดยไม่ต้องแก้ไข Source Code

### 9.1 การเปรียบเทียบแนวทางสถาปัตยกรรม CMS (CMS Architectural Approaches)

```
+---------------------------------------------------------------------------------------------------------+
|                                    CMS ARCHITECTURAL OPTIONS FOR VERCEL                                 |
+-------------------+-----------------------------+-----------------------------+-------------------------+
| คุณสมบัติ          | ทางเลือก A: Git-based CMS   | ทางเลือก B: Headless WP     | ทางเลือก C: Cloud CMS   |
|                   | (Decap CMS / TinaCMS)       | (เดิม + ACF / REST API)     | (Sanity / Directus)     |
+-------------------+-----------------------------+-----------------------------+-------------------------+
| ตำแหน่ง Backoffice | `/admin` บนโดเมนเว็บ Nuxt     | `studywiz.net/wp-admin`     | แดชบอร์ดคลาวด์แยกส่วน    |
| ค่าใช้จ่าย Server | **ฟรี 100% ตลอดชีพ**        | มีค่าโฮสติ้ง WordPress เดิม | ฟรีตามโควต้า / มีแพ็กเกจ|
| การจัดเก็บข้อมูล  | Git Repo (JSON / Markdown)  | MySQL Database เดิม         | Cloud Database          |
| การ Rebuild Vercel| Git Commit Trigger (อัตโนมัติ)| Webhook Trigger เมื่อ Save   | Webhook Trigger         |
| ความซับซ้อน       | ต่ำที่สุด ดูแลรักษาใน Repo เดียว| ปานกลาง (ต้องเปิด WP ไว้อยู่)| ปานกลาง-สูง             |
+-------------------+-----------------------------+-----------------------------+-------------------------+
```

> [!TIP]
> **ข้อเสนอแนะทางวิศวกรรม (Recommended Architecture):**
> 1. **ทางเลือกหลัก (Best for Vercel & Zero Hosting Cost)**: ใช้ **Decap CMS / TinaCMS (Git-based CMS)** ติดตั้งไว้ที่โฟลเดอร์ `/public/admin` ของ Nuxt 3 เวลากดแก้ไขข้อมูลผ่านหน้าเว็บ แอดมินล็อกอินผ่าน GitHub/Email และเมื่อกด Save ระบบจะ Commit เข้า Git Repo และ Vercel จะรัน `nuxt generate` อัปเดตหน้าเว็บใหม่ทันทีใน 1-2 นาที **ไม่มีค่าเซิร์ฟเวอร์ฐานข้อมูลใดๆ เลย**
> 2. **ทางเลือกที่สอง (Seamless for Non-tech Staff)**: ใช้ WordPress เดิมเป็น **Headless CMS Portal** ต่อไป โดยติดตั้งปลั๊กอิน **ACF (Advanced Custom Fields)** สำหรับเก็บฟิลด์ Carousel Slides และ Options แล้วให้ Nuxt 3 ยิงดึงข้อมูลมา Render หน้าเว็บ พร้อมติดตั้งปลั๊กอิน **WP Webhooks** เพื่อส่ง Webhook สั่ง Vercel Rebuild ทุกครั้งที่แอดมินกด Update

---

### 9.2 Complete Slot-to-Field Mapping Matrix (ตารางผูกตำแหน่งข้อมูลกับ CMS)

ด้านล่างนี้คือแผนผังการจับคู่ตำแหน่งของ Components บนหน้าเว็บ เข้ากับโมเดลข้อมูลในระบบ CMS หลังบ้าน:

#### A) หน้าแรก (Homepage - Highlights & Content Slots)

| ตำแหน่ง UI Component | หน้าที่บนหน้าเว็บ | โครงสร้างฟิลด์ใน CMS (Data Schema) | ประเภท Input ใน CMS | หมายเหตุ / พฤติกรรม |
| :--- | :--- | :--- | :--- | :--- |
| **`HeroBannerSlider.vue`** | สไลด์ Carousel ภาพและข้อความเด่นบนสุด | `home_slides[]`<br>• `title` (string)<br>• `subtitle` (string)<br>• `image` (image upload)<br>• `badge_text` (string, optional)<br>• `cta_label` (string)<br>• `cta_link` (string)<br>• `order` (number)<br>• `is_active` (boolean) | Repeater / Array | แอดมินสามารถลากสลับลำดับสไลด์, เปิด-ปิดสไลด์ตามเทศกาล และกำหนดปุ่มลิงก์ได้อิสระ |
| **`PhilosophySection.vue`** | กล่องวิดีโอคู่กับปรัชญาสถาบัน (2-Col) | `philosophy`<br>• `video_url` (string: YouTube/Vimeo/MP4)<br>• `founded_year` (number: 2528)<br>• `highlight_years` (string: "มากกว่า 38 ปี")<br>• `body_text` (textarea/markdown) | Text, Number & Textarea | แก้ไขข้อความประวัติ พันธกิจ และเปลี่ยนลิงก์ YouTube ได้ทันที |
| **`ProgramLevelGrid.vue`** | การ์ด 3 ระดับการศึกษา (ภาษา, มัธยม, มหาลัย) | `program_levels[]` (3 items)<br>• `key` (id: lang, highschool, uni)<br>• `title_th` (string)<br>• `title_en` (string)<br>• `cover_image` (image upload)<br>• `description` (string)<br>• `target_url` (string) | List / Cards | จัดการรูปภาพหน้าปกและลิงก์ของ 3 ระดับการศึกษา |
| **`FeaturedBlogSection.vue`** | บล็อกและรีวิวเด่น 3 คอลัมน์ | `featured_blogs`<br>• `mode` (select: 'auto_latest' \| 'manual_pick')<br>• `selected_post_ids` (multi-select relation, if manual) | Select & Relation | เลือกว่าจะดึง 3 บทความล่าสุดอัตโนมัติ หรือปักหมุดบทความเฉพาะเจาะจง |
| **`ConsultationBanner.vue`** | แบนเนอร์ชวนรับคำปรึกษาฟรี | `consultation_cta`<br>• `headline` (string)<br>• `subheadline` (string)<br>• `button_text` (string)<br>• `button_link` (string) | Text fields | แถบประชาสัมพันธ์กระตุ้นการติดต่อ |

---

#### B) หมวดหมู่ข่าวสาร ประชาสัมพันธ์ และรีวิว (Blogs & PR Feed)

| ตำแหน่ง UI Component | หน้าที่บนหน้าเว็บ | โครงสร้างฟิลด์ใน CMS (Data Schema) | ประเภท Input ใน CMS | หมายเหตุ / พฤติกรรม |
| :--- | :--- | :--- | :--- | :--- |
| **`BlogCard.vue`** & **`BlogDetailView.vue`** | รายการบทความและหน้ารายละเอียดบทความ | `blog_post`<br>• `title` (string)<br>• `slug` (string, auto-gen)<br>• `category` (relation: จีน/เกาหลี/ญี่ปุ่น, ยุโรป/รัสเซีย, อเมริกา/แคนาดา, ทั่วไป)<br>• `author` (string)<br>• `published_date` (date)<br>• `featured_image` (image upload + alt text)<br>• `excerpt` (textarea: สรุป 2-3 บรรทัด)<br>• `content` (Rich Text WYSIWYG / Markdown)<br>• `is_pinned` (boolean) | Rich Content Collection | รองรับการแทรกรูปภาพในเนื้อหา, ฝังวิดีโอ YouTube และจัด Heading ได้อย่างอิสระ |

---

#### C) หน้ากิจกรรมและสัมมนา (Activities & Events)

| ตำแหน่ง UI Component | หน้าที่บนหน้าเว็บ | โครงสร้างฟิลด์ใน CMS (Data Schema) | ประเภท Input ใน CMS | หมายเหตุ / พฤติกรรม |
| :--- | :--- | :--- | :--- | :--- |
| **`EventCard.vue`** | การ์ดสัมมนาและการประชาสัมพันธ์อีเวนต์ | `activity_event`<br>• `title` (string)<br>• `cover_image` (image upload)<br>• `event_date` (datetime)<br>• `platform` (select: Zoom, Office, Facebook Live)<br>• `status` (select: Upcoming, Open, Recorded)<br>• `registration_link` (url, optional)<br>• `recording_youtube_id` (string, optional)<br>• `detail_html` (markdown/textarea) | Collection with Enum & Date | ถ้าสถานะเป็น Recorded จะแสดงปุ่ม "รับชมย้อนหลัง" พร้อมเปิด Modal ดูวิดีโอได้ |

---

#### D) ข้อมูลส่วนกลางและการติดต่อ (Global Settings & Contact)

| ตำแหน่ง UI Component | หน้าที่บนหน้าเว็บ | โครงสร้างฟิลด์ใน CMS (Data Schema) | ประเภท Input ใน CMS | หมายเหตุ / พฤติกรรม |
| :--- | :--- | :--- | :--- | :--- |
| **`TheTopBar.vue`** & **`TheFooter.vue`** | ข้อมูลติดต่อและเบอร์โทรที่แสดงทุกหน้า | `site_settings`<br>• `hotline_phones[]` (array of string)<br>• `primary_email` (string)<br>• `bangkok_office` (address, phones, map_url)<br>• `chiangmai_office` (address, phones, map_url)<br>• `social_links` (facebook, line, ig, tiktok, youtube) | Global Settings Singleton | แก้ไขที่จุดเดียว อัปเดตเบอร์โทรและช่องทางโซเชียลมีเดียทั่วทั้งเว็บไซต์ |
| **`LineCommunitySection.vue`** | ลิงก์กลุ่ม Line OpenChat และ Linktree | `community_links[]`<br>• `group_name` (string)<br>• `invite_url` (url)<br>• `description` (string) | List / Repeater | เพิ่มหรือเปลี่ยนลิงก์กลุ่ม OpenChat เมื่อกลุ่มเต็มหรือเปิดโครงการใหม่ |

---

### 9.3 ตัวอย่างการประกาศ Content Config (สำหรับ Decap / Tina CMS หรือ Static JSON)

ไฟล์คอนฟิกตัวอย่าง `public/admin/config.yml` (สำหรับระบบ CMS หลังบ้านแบบ Git-based):

```yaml
backend:
  name: github
  repo: your-org/studywiz-vue3
  branch: main

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "homepage"
    label: "จัดการหน้าแรก (Homepage Settings)"
    files:
      - file: "content/homepage.json"
        label: "Carousel Highlights & Philosophy"
        name: "home_data"
        fields:
          - label: "สไลด์แบนเนอร์เด่น (Hero Slides)"
            name: "slides"
            widget: "list"
            fields:
              - { label: "หัวข้อเด่น (Title)", name: "title", widget: "string" }
              - { label: "คำบรรยายรอง (Subtitle)", name: "subtitle", widget: "string" }
              - { label: "รูปภาพแบนเนอร์", name: "image", widget: "image" }
              - { label: "ป้ายกำกับ (Badge เช่น ข่าวล่าสุด)", name: "badge", widget: "string", required: false }
              - { label: "ข้อความบนปุ่ม (Button Text)", name: "button_text", widget: "string", default: "ดูรายละเอียด" }
              - { label: "ลิงก์ปลายทาง (Button Link)", name: "button_link", widget: "string" }
              - { label: "เปิดใช้งาน (Active)", name: "is_active", widget: "boolean", default: true }

          - label: "ส่วนปรัชญาและวิดีโอ (Philosophy & Video)"
            name: "philosophy"
            widget: "object"
            fields:
              - { label: "YouTube Embed URL", name: "video_url", widget: "string" }
              - { label: "ปีที่ก่อตั้ง (เช่น 2528)", name: "founded_year", widget: "number", default: 2528 }
              - { label: "เนื้อหาปรัชญา", name: "body", widget: "text" }

  - name: "blogs"
    label: "บทความและข่าวสาร (PR & Blogs)"
    folder: "content/blogs"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "หัวข้อข่าว / บทความ", name: "title", widget: "string" }
      - { label: "วันที่เผยแพร่", name: "date", widget: "datetime" }
      - { label: "รูปหน้าปก (Featured Image)", name: "featured_image", widget: "image" }
      - { label: "หมวดหมู่ (Category)", name: "category", widget: "select", options: ["จีน เกาหลี ญี่ปุ่น", "ยุโรปและรัสเซีย", "อเมริกาและแคนาดา", "ทั่วไปและข่าวสาร"] }
      - { label: "ผู้เขียน / แอดไวเซอร์", name: "author", widget: "string", default: "Studywiz Team" }
      - { label: "เนื้อหาบทความ (Content)", name: "body", widget: "markdown" }
```

### 9.4 Webhook Rebuild & Instant Preview Flow

```
[Admin เข้า Dashboard /admin]
           │
           ▼
[แก้ไข Carousel Highlight หรือ ข่าว PR แล้วกด Publish]
           │
           ├────────────────────────┬────────────────────────┐
           ▼                        ▼                        ▼
[ทางเลือก 1: Git-based]    [ทางเลือก 2: Headless WP]  [ทางเลือก 3: Directus/Sanity]
Commit ไฟล์ JSON เข้า Git  ส่ง Webhook ไปหา Vercel    ส่ง Deploy Hook ไปหา Vercel
           │                        │                        │
           └────────────────────────┴────────────────────────┘
                                    │
                                    ▼
                 [Vercel Trigger 'nuxt generate' SSG]
                                    │
                                    ▼
       [เว็บ Studywiz โฉมใหม่อัปเดตเนื้อหาทันทีบน Global CDN ใน 60-90 วินาที]
```

