# แผนแม่บทสถาปัตยกรรม Component-Based & Page Contexts (Additional Implementation Plan)
**โครงการ:** พัฒนาระบบหลังบ้าน StudyWiz CMS (`studyWiz-cms`)  
**ที่ตั้งโครงการเป้าหมาย:** `d:\0_Lifes\Works\Freelance Work\studyWiz-cms`  
**อ้างอิงเว็บไซต์หน้าบ้าน:** `d:\0_Lifes\Works\Freelance Work\studyWiz-pre-migrate-vue3`  
**อ้างอิงเว็บไซต์จริง (Live WordPress):**  
- Country Directory: `https://www.studywiz.net/country/`
- University Hub (China): `https://www.studywiz.net/universitychina/`
- Single Institution Detail: `https://www.studywiz.net/china-medical-university/`
- High School Level Hub: `https://www.studywiz.net/%e0%b8%a1%e0%b8%b1%e0%b8%98%e0%b8%a2%e0%b8%a1/` ➔ ปรับเป็น Route สะอาด: `/high-school`
**ผู้จัดทำ:** Jeffcaliber & Tanadol Phengchan (System Builder Collaborator)  
**วันที่:** 28 กันยายน 2026  
**สถานะ:** แผนผังถอดรหัส Layout Pattern, Component Architecture, Blog Context & Schema (Pending Review)

---

## 1. วัตถุประสงค์และหลักคิดเชิงวิศวกรรม (Engineering Rationale)

เพื่อป้องกันปัญหา **"ต้องรื้อแก้โค้ดซ้ำซาก (Code Redundancy)"** ในระหว่างการสร้าง CMS Dashboard ทางทีมจึงได้ทำการตรวจสอบโครงสร้างหน้าเว็บจริงบน WordPress ทั้ง 4 รูปแบบอย่างละเอียด และจำแนกออกเป็น **4 มิติเลย์เอาต์หลัก (4 Layout Patterns)** ผสานกับ **ระบบบริบทบทความ (Blog Context System)**:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           STUDYWIZ MULTI-LEVEL CONTENT ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│  [1. Country Directory] ──> [2. University Hub] ───────> [3. Institution Detail]               │
│  Route: /country            Route: /country/[slug]        Route: /institution/[slug]            │
│  - Region Filter Tabs       - Country Hero & Intro        - Hero Cover & Official Crest         │
│  - 16 Country Grid Cards    - Search & Faculty Filter     - Key Facts & Global Ranking          │
│  - Flag & Highlights        - University Cards Grid       - Admission Criteria (GPA 3.00, วิทย์)│
│                             - Quick Requirements Strip    - Transparent Cost Table (RMB & THB)  │
│                                                           - Programs, Facilities & Fast Booking │
│                                                                                                 │
│  [4. High School Level Hub] (เดิม: /มัธยม ➔ เปลี่ยนเป็น /high-school)                          │
│  - High School Pathways (Boarding vs Day School, Public vs Private)                             │
│  - Curriculum Comparison (Canada OSSD, UK A-Level, US Diploma, IB)                              │
│  - Homestay & Guardian System for Minors (ระบบดูแลความปลอดภัยเยาวชน)                           │
│  - Partner High Schools Grid (Maple Leaf, Boren Sino-Canadian, Woosong High School)             │
│                                                                                                 │
│  [5. Blog Context System] (แทรกในทุกหน้าแบบ Context-Aware)                                      │
│  - Tagging: china-japan-korea | europe-russia | usa-canada | australia-nz | scholarships         │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ถอดรหัส 4 รูปแบบ Layout & Component Breakdown

### 🏛️ รูปแบบที่ 1: Country Directory Layout (`/country`)
*อ้างอิงจาก: `https://www.studywiz.net/country/`*

#### 1. วัตถุประสงค์
เป็นศูนย์รวมจุดหมายปลายทาง 16 ประเทศทั่วโลกที่ StudyWiz มีคู่สัญญาและเครือข่ายแนะแนว

#### 2. ส่วนประกอบบล็อก (Component Blocks):
1. **`CountryDirectoryHero`**:
   - Headline: *"ศึกษาต่อต่างประเทศ ทั่วโลกกับ StudyWiz"*
   - Subtitle: สรุปภาพรวมเครือข่ายความร่วมมือกว่า 40 ปี
2. **`CountryFilterTabs`**:
   - แถบแท็บฟิลเตอร์ 5 โซนภูมิภาค:
     - `All` (ทั้งหมด)
     - `Asia` (จีน, ญี่ปุ่น, เกาหลีใต้, สิงคโปร์)
     - `Australia – New Zealand`
     - `Canada – USA`
     - `Europe – UK` (สหราชอาณาจักร, เยอรมนี, โปแลนด์, เนเธอร์แลนด์, อิตาลี, สวิตเซอร์แลนด์ ฯลฯ)
3. **`CountryCardGrid` (16 ประเทศ)**:
   - **Props แต่ละการ์ด:**
     - `countryCode`: เช่น `cn`, `jp`, `kr`, `gb`, `ca`, `us`, `au`, `nz`
     - `nameTh`: ชื่อภาษาไทย (เช่น "จีน")
     - `nameEn`: ชื่อภาษาอังกฤษ (เช่น "China")
     - `flagUrl`: ภาพธงชาติความละเอียดสูง
     - `coverImage`: ภาพสถาปัตยกรรม/มหาวิทยาลัยอันเป็นเอกลักษณ์ของประเทศนั้น
     - `availableLevels`: ป้ายแสดงระดับที่เปิดสอน เช่น `['มัธยม', 'ภาษา', 'ป.ตรี', 'ป.โท']`
     - `tuitionRange`: ช่วงงบประมาณเริ่มต้น
     - `destinationUrl`: ลิงก์ตรงสู่หน้า University Hub หรือ Country Detail (เช่น `/country/china`)

---

### 🎓 รูปแบบที่ 2: Country-Specific University Hub Layout (`/country/[slug]` หรือ `/universitychina`)
*อ้างอิงจาก: `https://www.studywiz.net/universitychina/`*

#### 1. วัตถุประสงค์
เป็นหน้าศูนย์รวมสถาบันการศึกษาเฉพาะประเทศ นำเสนอรายชื่อมหาวิทยาลัยคู่สัญญาทั้งหมด (เช่น รวมมหาวิทยาลัยในประเทศจีน)

#### 2. ส่วนประกอบบล็อก (Component Blocks):
1. **`CountryHubHero`**:
   - แบนเนอร์หัวหน้าแสดงธงชาติ, ภาพรวมเหตุผลที่ควรไปเรียนต่อที่ประเทศนี้ (เช่น ทุนรัฐบาลจีน CSC, ตลาดงานขยายตัว, ค่าครองชีพย่อมเยา)
2. **`QuickSpecStrip` (แถบสรุปข้อมูลเร่งด่วน)**:
   - วุฒิภาษาขั้นต่ำ (เช่น HSK 4-5 หรือ IELTS 6.0)
   - ระยะเวลาหลักสูตร (ป.ตรี 4-6 ปี, ป.โท 2-3 ปี)
   - ประเภทวีซ่า (X1 / X2 Visa)
   - ช่วงเปิดรับสมัคร (รอบกันยายน Fall Intake / รอบมีนาคม Spring Intake)
3. **`UniversitySearchAndFilter`**:
   - กล่องค้นหาชื่อสถาบันแบบ Real-time
   - ดรอปดาวน์เลือกตามเมือง/มณฑล (เช่น ปักกิ่ง, เซี่ยงไฮ้, เสิ่นหยาง, ต้าเหลียน, หางโจว)
   - ตัวกรองสาขาวิชายอดนิยม (การแพทย์ MBBS, วิศวกรรมศาสตร์, บริหารธุรกิจ, ภาษาและวัฒนธรรม)
4. **`UniversityCardGrid` (รายชื่อมหาวิทยาลัยคู่สัญญา)**:
   - ตัวอย่างสถาบันจากฐานข้อมูลจริงของ StudyWiz:
     - *China Medical University (มหาวิทยาลัยการแพทย์ไชน่าเมด)*
     - *Dalian Medical University (มหาวิทยาลัยการแพทย์ต้าเหลียน)*
     - *Donghua University (มหาวิทยาลัยตงหัว)*
     - *Dongbei University of Finance and Economics (DUFE)*
     - *East China Normal University (ECNU)*
     - *Fujian Medical University*
     - *Hebei Medical University*
     - *Huazhong University of Science and Technology (HUST)*
     - *Nanjing University of Science and Technology*
     - *Shandong University*
     - *Shanghai University of Traditional Chinese Medicine*
   - **Props ของแต่ละการ์ด:**
     - `logoUrl`: ตราสัญลักษณ์มหาวิทยาลัย
     - `campusImageUrl`: ภาพแคมปัส
     - `nameTh` / `nameEn`: ชื่อไทยและอังกฤษ
     - `city`: เมืองและมณฑล
     - `ranking`: อันดับโลก หรือ อันดับเฉพาะสาขา (เช่น Top 10 ด้านการแพทย์ของจีน)
     - `featuredFaculties`: รายชื่อคณะเด่น
     - `hasScholarship`: สวิตช์แสดง Badge ทุนการศึกษา
     - `slug`: สำหรับคลิกเข้าไปดูหน้าเจาะลึก เช่น `/institution/china-medical-university`
5. **`CountryAdmissionOverviewAccordion`**:
   - สรุปขั้นตอนการยื่นใบสมัครและเอกสารที่ต้องใช้
6. **`CtaConsultationBanner`**:
   - แบนเนอร์นัดคุยกับเจ้าหน้าที่ผู้เชี่ยวชาญเฉพาะประเทศ

---

### 🏥 รูปแบบที่ 3: Single Institution Detail Layout (`/institution/[slug]`)
*อ้างอิงจาก: `https://www.studywiz.net/china-medical-university/`*

#### 1. วัตถุประสงค์
หน้ารายละเอียดเชิงลึกของมหาวิทยาลัย/สถาบันแบบรายแห่ง แสดงข้อมูลหลักสูตร เกณฑ์การรับสมัคร และ **ตารางค่าใช้จ่ายที่โปร่งใสชัดเจน**

#### 2. ส่วนประกอบบล็อก (Component Blocks):
1. **`InstitutionHeaderBanner`**:
   - ภาพหน้าปกวิทยาเขต (Campus Panoramic Cover)
   - ตราสัญลักษณ์สถาบัน (Official Crest/Logo)
   - ชื่อมหาวิทยาลัย: **China Medical University (มหาวิทยาลัยการแพทย์ไชน่าเมด)**
   - สถิติเด่น: "Top 10 มหาวิทยาลัยแพทย์ของจีน", "มหาวิทยาลัยรัฐบาลเกรด A", "กำกับดูแลโดยกระทรวงสาธารณสุขจีน"
2. **`InstitutionKeyFactsBar` (ตารางข้อมูลจำเพาะ)**:
   - ที่ตั้ง: เมืองเสิ่นหยาง มณฑลเหลียวหนิง
   - ก่อตั้งเมื่อ: ค.ศ. 1931
   - ภาษาการเรียนการสอน: หลักสูตรภาษาอังกฤษ (English Medium) และภาษาจีน
   - รอบเปิดรับ: เทอมกันยายน (เปิดรับล่วงหน้า)
3. **`AdmissionCriteriaBox` (หลักเกณฑ์การรับสมัครอย่างเป็นทางการ)**:
   - วุฒิการศึกษา: มัธยมศึกษาตอนปลาย สายวิทยาศาสตร์ (ยื่นเกรด 5 ภาคเรียนก่อนได้)
   - เกรดเฉลี่ย (GPA): ไม่ต่ำกว่า 3.00
   - วิชาหลัก: ฟิสิกส์ เคมี ชีววิทยา ภาษาอังกฤษ คณิตศาสตร์ แต่ละวิชาไม่ต่ำกว่า 3.00
   - หมายเหตุอนุโลม: "ถ้าเกรดใกล้เคียง สามารถส่งทรานสคริปต์ให้มหาวิทยาลัยพิจารณาเป็นรายกรณี"
4. **`CostBreakdownTable` (ตารางงบประมาณโปร่งใส)**:
   - แสดงตารางเปรียบเทียบสกุลเงินท้องถิ่น (RMB) และเงินบาทไทย (THB) อย่างแม่นยำ:
     - **ค่าเล่าเรียนต่อปี:** 40,000 หยวน (ประมาณ 200,000 บาท)
     - **ค่าหอพักนักศึกษาต่างชาติต่อปี:** 7,500 หยวน (ประมาณ 37,500 บาท)
     - **งบรวมค่าเรียนและที่พักต่อปี:** ~237,500 บาท
     - **งบประมาณรวมตลอดหลักสูตร (6 ปี MBBS):** ~1,425,000 บาท
5. **`ProgramsAndCurriculumTabs`**:
   - แท็บแยกหลักสูตร:
     - *Bachelor of Medicine & Bachelor of Surgery (MBBS)*
     - *Bachelor of Dental Surgery (BDS)*
     - *Pre-Med Intensive Course (คอร์สปรับพื้นฐาน)*
6. **`CampusLivingAccordion`**:
   - ข้อมูลหอพักปรับอากาศห้องคู่/ห้องเดี่ยว, โรงพยาบาลในเครือสำหรับการฝึกงานคลินิก, โรงอาหารฮาลาลและอาหารนานาชาติ
7. **`RelatedInstitutionsPagination`**:
   - ปุ่มสลับดูสถาบันก่อนหน้าและถัดไป (เช่น Prev: Boren Sino-Canadian School | Next: Dalian Medical University)
8. **`FastApplicationBox`**:
   - แบบฟอร์มขอรับการประเมินทรานสคริปต์ฟรีทางออนไลน์

---

### 🏫 รูปแบบที่ 4: High School Level Hub Layout (`/high-school`)
*อ้างอิงจาก: `https://www.studywiz.net/%e0%b8%a1%e0%b8%b1%e0%b8%98%e0%b8%a2%e0%b8%a1/` ➔ **ปรับเป็น Route สากล: `/high-school`***

#### 1. วัตถุประสงค์
เป็นหน้าแบบไฮบริดที่รวม **"ระดับการศึกษา (Level Context)"** เข้ากับ **"สถาบันมัธยม (Institution Directory)"** สำหรับนักเรียนอายุ 12-18 ปีและผู้ปกครอง

#### 2. ส่วนประกอบบล็อก (Component Blocks):
1. **`HighSchoolHero`**:
   - แบนเนอร์หัวหน้า: *"โรงเรียนมัธยมศึกษาในต่างประเทศ (Global High School Pathways)"*
   - ปูทางสู่มหาวิทยาลัยชั้นนำทั่วโลก พร้อมระบบความปลอดภัยและการดูแลใกล้ชิด
2. **`SchoolTypeComparison` (เปรียบเทียบประเภทโรงเรียนมัธยม)**:
   - **Boarding School (โรงเรียนประจำ):** พักในหอพักของโรงเรียน มีติวเตอร์และกิจกรรมหลังเลิกเรียน
   - **Day School + Homestay (โรงเรียนไป-กลับ):** พักกับครอบครัวท้องถิ่นที่ผ่านการคัดกรองประวัติอาชญากรรม (Police Check)
   - **Public vs Private High School:** โรงเรียนรัฐบาลค่าเทอมย่อมเยา vs โรงเรียนเอกชนที่เน้นผลักดันเข้า Ivy League / Oxbridge
3. **`CurriculumPathwaysGrid`**:
   - หลักสูตรแคนาดา (Ontario OSSD, British Columbia Dogwood)
   - หลักสูตรอังกฤษ (IGCSE & A-Level)
   - หลักสูตรอเมริกัน (US High School Diploma + AP)
   - หลักสูตร International Baccalaureate (IB Diploma)
4. **`HomestayAndGuardianSafetyBox` (ระบบผู้ปกครองดูแลนักเรียน)**:
   - บริการจัดหา Custodian / Legal Guardian ตามกฎหมายของประเทศปลายทาง
   - การประสานงานระหว่างโรงเรียน ที่พัก และผู้ปกครองในไทยแบบ 24 ชั่วโมง
5. **`HighSchoolPartnerGrid` (โรงเรียนมัธยมคู่สัญญา)**:
   - ดึงข้อมูลสถาบันระดับมัธยมศึกษา เช่น:
     - *Maple Leaf International Schools (จีน & แคนาดา)*
     - *Boren Sino-Canadian School (กวางตุ้ง หลักสูตรแคนาดา OSSD)*
     - *Woosong International High School Program (เกาหลีใต้)*
     - *Bodwell High School (แคนาดา)*
     - *CATS Global Schools (สหราชอาณาจักรและสหรัฐอเมริกา)*
6. **`HighSchoolTestimonialFeed`**:
   - รีวิวจากน้องๆ นักเรียนมัธยมและบทสัมภาษณ์ความประทับใจของผู้ปกครอง
7. **`HighSchoolAssessmentCTA`**:
   - ฟอร์มปรึกษาและวางแผนส่งบุตรหลานเรียนต่อมัธยมล่วงหน้า 1-2 ปี

---

## 3. ระบบบริบทบทความ (Blog Context System)

เพื่อให้การจัดการข่าวสารและสาระน่ารู้สอดคล้องกับแต่ละหน้าเว็บ ใน CMS จะแบ่ง Blog Context ออกเป็น **5 หมวดบริบทหลัก** พร้อมระบบ Tagging:

| Blog Context ID | ชื่อบริบทใน CMS | หน้าปลายทางที่เชื่อมโยงอัตโนมัติ | ตัวอย่างเนื้อหาบทความ |
|---|---|---|---|
| `china-japan-korea` | บทความเรียนต่อจีน เกาหลี ญี่ปุ่น | `/country/china`, `/universitychina`, `/institution/china-medical-university` | - ขั้นตอนการขอทุนรัฐบาลจีน (CSC) ประจำปี<br>- รีวิวชีวิตนักเรียนแพทย์ในเสิ่นหยาง<br>- เกณฑ์สอบ HSK 3.0 ที่เปลี่ยนใหม่ |
| `europe-russia` | บทความเรียนต่อยุโรปและรัสเซีย | `/country/poland`, `/country/germany`, `/country/russia` | - เรียนต่อโปแลนด์และเยอรมนีด้วยงบประหยัด<br>- ขั้นตอนการขอวีซ่า Schengen สำหรับนักเรียน |
| `usa-canada` | บทความเรียนต่ออเมริกาและแคนาดา | `/country/usa`, `/country/canada`, `/high-school` | - ทำความรู้จักระบบ High School OSSD ในแคนาดา<br>- สิทธิ์ทำงาน Co-op หลังจบการศึกษา |
| `australia-nz` | บทความเรียนต่อออสเตรเลียและนิวซีแลนด์ | `/country/australia`, `/country/new-zealand` | - กฎการทำงานพาร์ทไทม์ 48 ชม./2 สัปดาห์<br>- เรียนภาษาพร้อมฝึกงานในโอ๊คแลนด์ |
| `scholarships` | ข่าวทุนการศึกษาและสัมมนา | ทุกหน้า (ผ่านวิดเจ็ต Highlight) | - ประกาศผลทุนการศึกษา StudyWiz Partner Fund<br>- สรุปภาพบรรยากาศงานนิทรรศการศึกษาต่อ |

### การทำงานในหน้าบ้าน (Frontend Nuxt 3):
- คอมโพเนนต์ `ContextBlogFeed.vue` สามารถรับ Prop `:context="['china-japan-korea']"`
- เมื่อแสดงผลในหน้า `/country/china` หรือ `/china-medical-university` บทความที่ปรากฏด้านล่างจะเป็นบทความเฉพาะทางเกี่ยวกับประเทศจีนโดยอัตโนมัติ ไม่ปะปนกับบทความทั่วไป

---

## 4. ส่วนขยาย CMS Left-Sidebar & Visual Page Builder

เมื่อผสานเข้ากับแผนแม่บทใน `CMS_DASHBOARD_AND_GLOBAL_LAYOUT_IMPLEMENTATION_PLAN.md`:

```
CMS Left-Sidebar
├── 🌐 CORE CONFIG
│   ├── Global Layout (1 Page Control)
│   └── Site & SEO Settings
├── 📄 CONTENT
│   ├── Pages [➕ New Page] ────> [ Modal เลือกว่าจะสร้างหน้าแบบใด ]
│   │                              ├── 1. Blank Custom Landing Page
│   │                              ├── 2. Country Directory Page
│   │                              ├── 3. University Hub Page
│   │                              ├── 4. Institution Detail Page
│   │                              └── 5. High School Level Hub Page
│   ├── Destinations (16 ประเทศ)
│   ├── Institutions (มหาวิทยาลัย & โรงเรียนมัธยม)
│   ├── Programs & Levels (หลักสูตร & ระดับการศึกษา)
│   └── Blog Articles (คัดแยกตาม 5 Contexts)
└── 📥 LEADS & CRM
    └── Student Consultations
```

### การกดปุ่ม `[➕ New Page]` ใน CMS:
1. แอดมินระบุชื่อหน้า เช่น *"มหาวิทยาลัยการแพทย์ต้าเหลียน (Dalian Medical University)"*
2. เลือกว่าจะใช้ **Template Preset**:
   - `Single Institution Detail` (ระบบจะดึง Blocks: Header, KeyFacts, AdmissionCriteria, CostTable มาตั้งต้นให้ทันที)
3. ปรับแก้ข้อมูลในฟอร์มด้านซ้าย ➔ พรีวิวหน้าเว็บ Nuxt 3 ด้านขวา
4. กด **Publish** ➔ ข้อมูลบันทึกขึ้น MongoDB Atlas ➔ หน้าบ้านเปิด URL `/institution/dalian-medical-university` ใช้งานได้ทันที

---

## 5. สถาปัตยกรรม Schema บน MongoDB Atlas

เพื่อรองรับการทำงานของทั้ง 4 รูปแบบอย่างเป็นระบบ ข้อมูลจะถูกแบ่งออกเป็น 4 Collections หลัก:

### 1. Collection: `institutions` (มหาวิทยาลัย & โรงเรียนมัธยม)
```json
{
  "_id": "ObjectId",
  "slug": "china-medical-university",
  "nameTh": "มหาวิทยาลัยการแพทย์ไชน่าเมด",
  "nameEn": "China Medical University",
  "nativeName": "中国医科大学",
  "countryCode": "cn",
  "city": "เสิ่นหยาง",
  "province": "มณฑลเหลียวหนิง",
  "level": "university", // 'university' | 'highschool' | 'language'
  "type": "public", // 'public' | 'private'
  "ranking": {
    "national": "Top 10 ด้านการแพทย์",
    "global": "Rank 601-800"
  },
  "admissionCriteria": {
    "minGpa": 3.00,
    "requiredStream": "สายวิทยาศาสตร์-คณิตศาสตร์",
    "requiredSubjects": ["ฟิสิกส์", "เคมี", "ชีววิทยา", "คณิตศาสตร์", "ภาษาอังกฤษ"],
    "languageRequirement": "IELTS 6.0 หรือ ผลภาษาอังกฤษมาตรฐาน",
    "notes": "ถ้าเกรดใกล้เคียง สามารถส่งทรานสคริปท์ 5 ภาคเรียนมาให้พิจารณาก่อนได้"
  },
  "costs": {
    "currency": "RMB",
    "tuitionPerYear": 40000,
    "dormitoryPerYear": 7500,
    "totalPerYearThb": 237500,
    "totalCourseThb": 1425000,
    "durationYears": 6
  },
  "programs": [
    {
      "name": "MBBS (Bachelor of Medicine & Surgery)",
      "medium": "English",
      "degree": "Bachelor"
    }
  ],
  "coverImage": "/images/institutions/cmu-cover.jpg",
  "logoImage": "/images/institutions/cmu-logo.png",
  "isPublished": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### 2. Collection: `destinations` (ประเทศและภูมิภาค)
```json
{
  "_id": "ObjectId",
  "slug": "china",
  "countryCode": "cn",
  "nameTh": "จีน",
  "nameEn": "China",
  "region": "asia", // 'asia' | 'europe-uk' | 'canada-usa' | 'australia-nz'
  "flagIcon": "🇨🇳",
  "flagSvg": "/images/flags/cn.svg",
  "heroImage": "/images/destinations/china-hero.jpg",
  "availableLevels": ["highschool", "language", "bachelor", "master"],
  "highlight": "ศูนย์กลางการศึกษาแพทย์และเทคโนโลยี พร้อมทุนรัฐบาล CSC ครอบคลุมค่าเรียน 100%",
  "quickSpecs": {
    "visaType": "X1 / X2 Visa",
    "intakeMonths": ["กันยายน", "มีนาคม"],
    "languageScore": "HSK 4 หรือ IELTS 5.5+"
  },
  "isPublished": true
}
```

### 3. Collection: `blogs` (บทความพร้อม Blog Context)
```json
{
  "_id": "ObjectId",
  "slug": "guide-to-cmu-mbbs-2026",
  "title": "เจาะลึกหลักสูตรแพทย์ MBBS ภาคภาษาอังกฤษ ที่ China Medical University",
  "blogContext": "china-japan-korea",
  "tags": ["เรียนต่อแพทย์", "ทุนการศึกษาจีน", "China Medical University"],
  "author": "StudyWiz Editorial Team",
  "publishedDate": "2026-10-01",
  "featuredImage": "/images/blogs/cmu-guide.jpg",
  "summary": "สรุปทุกเรื่องที่ผู้ปกครองและน้องๆ ต้องรู้: ค่าใช้จ่าย หอพัก เกณฑ์คะแนนวิทย์-คณิต และการสอบใบประกอบวิชาชีพเวชกรรม",
  "contentHtml": "<div>...</div>",
  "relatedInstitutionSlug": "china-medical-university",
  "isPublished": true
}
```

### 4. Collection: `pages` (หน้า Dynamic Page ที่ประกอบจาก Blocks)
```json
{
  "_id": "ObjectId",
  "slug": "high-school",
  "path": "/high-school",
  "title": "โรงเรียนมัธยมศึกษาในต่างประเทศ - Studywiz",
  "templateType": "high-school-hub",
  "seo": {
    "metaTitle": "เรียนต่อมัธยมต่างประเทศ แคนาดา อังกฤษ อเมริกา - Studywiz",
    "metaDescription": "หลักสูตรมัธยมศึกษามาตรฐานสากล ทั้งแบบโรงเรียนประจำ (Boarding School) และ Homestay ปูทางสู่มหาวิทยาลัยระดับโลก"
  },
  "sections": [
    {
      "id": "sec-hs-01",
      "componentType": "HighSchoolHero",
      "order": 1,
      "isEnabled": true,
      "props": {
        "title": "โรงเรียนมัธยมศึกษาในต่างประเทศ",
        "subtitle": "หลักสูตรมาตรฐานสากล พร้อมการดูแลบุตรหลานอย่างอบอุ่นและปลอดภัย"
      }
    },
    {
      "id": "sec-hs-02",
      "componentType": "SchoolTypeComparison",
      "order": 2,
      "isEnabled": true
    },
    {
      "id": "sec-hs-03",
      "componentType": "HighSchoolPartnerGrid",
      "order": 3,
      "isEnabled": true,
      "props": {
        "filterLevel": "highschool"
      }
    },
    {
      "id": "sec-hs-04",
      "componentType": "ContextBlogFeed",
      "order": 4,
      "isEnabled": true,
      "props": {
        "context": "high-school-guide",
        "limit": 3
      }
    }
  ]
}
```

---

## 6. สรุปความเชื่อมโยงและการดำเนินงานขั้นต่อไป

1. **เปลี่ยนชื่อเอกสารเดิมเรียบร้อย:**  
   `CMS_DASHBOARD_IMPLEMENTATION_PLAN.md` ➔ [`docs/CMS_DASHBOARD_AND_GLOBAL_LAYOUT_IMPLEMENTATION_PLAN.md`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/docs/CMS_DASHBOARD_AND_GLOBAL_LAYOUT_IMPLEMENTATION_PLAN.md)
2. **สร้างเอกสารส่วนขยาย Component & Blog Context ฉบับนี้:**  
   [`docs/CMS_DASHBOARD_PAGE_ADDITIONAL_IMPLEMENTATION_PLAN.md`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/docs/CMS_DASHBOARD_PAGE_ADDITIONAL_IMPLEMENTATION_PLAN.md)
3. **ปรับแก้ Route `/high-school`:**  
   ตั้งค่า `definePageMeta({ alias: ['/high-school', '/High-School'] })` ใน [`app/pages/level/high-school.vue`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/pages/level/high-school.vue) เพื่อให้ URL บนโปรเจกต์สะอาดและพร้อมรับการย้ายสู่สากลทันที
4. **พร้อมรอรับการตรวจสอบ:**  
   ตามคำสั่งของพี่ต่อ เจฟหยุดและสรุปแผนงานทั้งหมดไว้ที่เอกสารนี้ เพื่อให้พี่ต่อตรวจสอบความถูกต้องของ Component-based และ Blog Context ก่อนอนุมัติให้เริ่มขั้นตอนการ Build โปรเจกต์ CMS ถัดไปครับ!
