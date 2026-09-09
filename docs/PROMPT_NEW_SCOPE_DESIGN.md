# TASK: Implement New Scope Landing Page Design for StudyWiz

## Context & Objective
We are modernizing the StudyWiz front-office landing page on the `new-scope-design` branch. 
The goal is to restyle the front-facing page using **Nuxt 3 + Tailwind CSS** into a high-trust, high-conversion International Academy aesthetic that appeals to both Gen Z students and their parents (Gen X/Y).

## Design System & Theme
- **Primary Brand Accent:** Crimson Red (`#DC2626` or `#E50914`)
- **Dark Canvas / Background:** Deep Navy Charcoal (`#0F172A` / `#111827`)
- **Light Canvas / Cards:** Pure White (`#FFFFFF`) and Soft Slate (`#F8FAFC`)
- **Muted Text:** Slate Gray (`#64748B`)
- **Typography:** Modern International Academy style (Clean Sans-serif like Inter / Plus Jakarta Sans)

---

## Required Implementation Structure
Please create modular Vue 3 components (or organize cleanly in the target page/template) with `<script setup>` and clean Tailwind CSS classes:

### 1. HeroSection.vue (Unlock Your Global Future)
- **Background:** Deep Navy Charcoal with gradient overlay and space for an inspiring university campus/student image.
- **Headline (H1):** "Unlock Your Global Future — บันไดสู่มหาวิทยาลัยชั้นนำระดับโลก"
- **Subheadline:** "แนะแนวและดูแลเส้นทางเรียนต่อต่างประเทศแบบ One-on-One ตั้งแต่เตรียมเอกสารจนถึงวันสำเร็จการศึกษา"
- **Trust Metric Badge:** "1,500+ นักเรียนที่ประสบความสำเร็จ | พาร์ตเนอร์กว่า 350 สถาบันทั่วโลก" (Crimson Red background badge).
- **Dual CTA:**
  - Primary button: "ประเมินโอกาสและงบประมาณฟรี" (Red button with hover state)
  - Secondary ghost button: "สำรวจหลักสูตรและทุน" (Border white/slate with hover state)

### 2. DestinationsSection.vue (Global Destinations)
- **Header:** "จุดหมายปลายทางยอดนิยม (Top Destinations)"
- **Grid Layout:** 4 responsive cards for:
  1. United Kingdom (UK) 🇬🇧
  2. Australia (AU) 🇦🇺
  3. United States (USA) 🇺🇸
  4. New Zealand & Canada 🇳🇿 🇨🇦
- **Card Content:** 
  - Landmark photo placeholder / Flag icon
  - Country name & popular programs
  - Highlighted Tag: "ทุนการศึกษาสูงสุด 50%" (Crimson Red badge/text)
  - "ดูรายละเอียดสถาบัน →" link

### 3. BudgetSection.vue (วางแผนงบประมาณอย่างโปร่งใส)
- **Header:** "วางแผนงบประมาณอย่างโปร่งใส ไร้ค่าใช้จ่ายแอบแฝง"
- **Sub-tagline:** "เริ่มต้นเฉลี่ยเพียง 35,000 บาท/เดือน"
- **Comparison Table / Cards (3 Columns):**
  - Card 1: หลักสูตรภาษาและวิชาชีพ (Language & Diploma)
  - Card 2: ปริญญาตรี (Undergraduate Degree)
  - Card 3: ปริญญาโท (Postgraduate Degree)
- **Details per card:** Estimated tuition, estimated living cost, and visa guidance.
- Clean white card layout with subtle borders and shadows.

### 4. WhyUsSection.vue (ทำไมต้องเลือก StudyWiz - Bento Grid)
- **Header:** "ทำไมผู้ปกครองและนักเรียนกว่า 1,500 คนจึงไว้วางใจเรา"
- **Bento Grid (3 Core Pillars + Testimonial):**
  1. **Dedicated Counselor:** "ช่วยตรวจ SOP และ Portfolio แบบ One-on-One"
  2. **Visa Success Rate:** "อัตราการอนุมัติวีซ่า 100%"
  3. **Alumni & On-ground Support:** "เครือข่ายศิษย์เก่าและคอมมูนิตี้ดูแลตั้งแต่วันที่เดินทางถึง"
  4. **Alumni Testimonial Box:** Placeholder for student quote with photo, university name, and graduation year.

### 5. CtaSection.vue (จองเวลาปรึกษาฟรีวันนี้)
- **Container:** Full-width Crimson Red banner with rounded-3xl container.
- **Headline:** "จองเวลาปรึกษาวางแผนเรียนต่อฟรี กับผู้เชี่ยวชาญวันนี้"
- **Subtext:** "ไม่มีค่าใช้จ่ายในการให้คำปรึกษาเบื้องต้น พร้อมประเมินโอกาสขอทุนฟรี"
- **Interactive Elements:**
  - Fast Contact form or Button linked to LINE Official Account
  - Designated container for LINE Official QR Code

---

## Technical Constraints & Best Practices
- **Framework:** Nuxt 3 with Vue 3 Composition API (`<script setup lang="ts">`).
- **Styling:** Strict Tailwind CSS (no inline CSS styles where possible).
- **Responsiveness:** Mobile-first approach (must look crisp and readable on mobile devices for parents and students).
- **Data Handling:** Keep mock data (destinations, pricing tiers, bento cards) in reactive arrays/objects so they can easily be hooked into MongoDB/CMS later.