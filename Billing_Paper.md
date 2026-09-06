# ใบเสนอราคาและขอบเขตงาน (Project Quotation & Scope of Work)
**โครงการ:** พัฒนาระบบเว็บไซต์และระบบจัดการข้อมูล StudyWiz (Web Modernization & CMS Dashboard)  
**ผู้จัดทำ:** Tor (Freelance Software Engineer)  
**ลูกค้า/ผู้ว่าจ้าง:** StudyWiz  
**วันที่ออกเอกสาร:** 6 กันยายน 2026  
**สถานะ:** ฉบับร่างสำหรับประเมินราคาและวางแผนโครงการ (Preliminary Quotation)  

---

## 1. สรุปภาพรวมโครงการ (Project Executive Summary)

โครงการแบ่งการดำเนินงานออกเป็น **2 เฟส (Phases)** เพื่อให้ระบบทยอยขึ้นใช้งานได้เร็ว ลดความเสี่ยง และง่ายต่อการส่งมอบ:
1. **Phase 1 (ปัจจุบัน):** Replatforming & Frontend Modernization — ปรับปรุงสถาปัตยกรรมเว็บไซต์ใหม่ทั้งหมดจาก WordPress เดิม สู่ **Nuxt 3 (Vue 3) + Tailwind CSS** เพิ่มความเร็วระดับ Sub-second โหลดไว SEO เยี่ยม และรองรับ Mobile Responsive 100%
2. **Phase 2 (ส่วนต่อขยาย):** StudyWiz CMS & Backoffice Dashboard — ระบบหลังบ้านสำหรับแอดมิน จัดการบทความ ประเทศ/คอร์สเรียน ข้อมูลรีวิว และระบบรับ Lead ผู้สมัครเรียน/นัดหมายปรึกษา

---

## 2. ขอบเขตงานและรายละเอียดส่งมอบ (Scope of Deliverables)

### 📌 Phase 1: Replatforming & Frontend Modernization (Nuxt 3 + Vue 3)
*เป้าหมาย: ได้เว็บไซต์หน้าบ้านที่เร็วทันสมัย ดีไซน์พรีเมียม สถาปัตยกรรมพร้อมต่อยอด*

| ลำดับ | รายการงาน (Deliverables) | รายละเอียดทางเทคนิค | ระยะเวลาประเมิน (Man-Days) |
|---|---|---|:---:|
| 1.1 | **System Architecture & Design System** | Setup Nuxt 3, Vue 3, Tailwind CSS, Color Palette (Theme StudyWiz), Custom Typography, Responsive Layouts (Desktop/Tablet/Mobile) | 3 วัน |
| 1.2 | **Icon System & Asset Engine** | พัฒนาระบบ `AppIcon.vue` เวกเตอร์ SVG ในตัว (Zero-CDN) ไม่ต้องพึ่งภายนอก, Custom Favicon, Asset pipeline | 1.5 วัน |
| 1.3 | **Data Scrape & Structure Migration** | ดึงข้อมูลเดิมจาก WordPress (16 ประเทศปลายทาง, คอร์สเรียน, บทความ, รีวิว, รายชื่อวิทยาเขต) จัดโครงสร้าง JSON รองรับ CMS ในอนาคต | 2.5 วัน |
| 1.4 | **Core Pages Development (10+ หน้า)** | พัฒนาหน้า Home, Country (รายชื่อ + หน้ารายละเอียดประเทศ), Level (มัธยม/มหาวิทยาลัย), About, Blog, Activities, Testimonial, Contact | 6 วัน |
| 1.5 | **Interactive UX & Conversion Features** | Floating Contact SpeedDial (LINE/Call/Facebook/Email), ฟอร์มลงทะเบียนรับคำปรึกษา, ระบบกรอง/ค้นหาข้อมูล | 2 วัน |
| 1.6 | **SEO, Performance & Deployment** | Static Site Generation (SSG/SSR), Meta Tags, Social OpenGraph, Performance Audit (Lighthouse score 90+) | 1 วัน |
| | **รวมระยะเวลา Phase 1** | | **16 วันทำ (Man-Days)** |

---

### 📌 Phase 2: StudyWiz CMS & Admin Dashboard (Backoffice System)
*เป้าหมาย: ทีมงาน StudyWiz จัดการเนื้อหา อัปเดตรูปภาพ และดูรายชื่อ Lead ได้เองโดยไม่ต้องแก้โค้ด*

| ลำดับ | รายการงาน (Deliverables) | รายละเอียดทางเทคนิค | ระยะเวลาประเมิน (Man-Days) |
|---|---|---|:---:|
| 2.1 | **Admin Architecture & Authentication** | ออกแบบฐานข้อมูล/Headless Engine, ระบบล็อกอินแอดมิน, Role & Permission (Admin / Editor) | 3 วัน |
| 2.2 | **Content Management Modules** | หน้าจัดการข้อมูล (CRUD):<br>• จัดการประเทศและคอร์สเรียน (Destinations & Programs)<br>• จัดการบล็อก/บทความ (Rich-Text Editor + Categories)<br>• จัดการรูปกิจกรรม & รีวิวศิษย์เก่า (Testimonials) | 5 วัน |
| 2.3 | **Media & Asset Management** | ระบบอัปโหลดรูปภาพ จัดเก็บไฟล์ พร้อมระบบบีบอัดภาพอัตโนมัติ (WebP Converter) | 2 วัน |
| 2.4 | **Lead Management & Instant Alerts** | หน้ารายการผู้ลงทะเบียนขอรับคำปรึกษา (Export Excel/CSV ได้) พร้อมระบบแจ้งเตือนเข้า LINE Notify หรือ Email ทันทีที่มีคนกรอกฟอร์ม | 2.5 วัน |
| 2.5 | **Testing, Deployment & User Manual** | ติดตั้งระบบบน Production Server พร้อมทำเอกสารคู่มือการใช้งาน 1 ชุด และเทรนนิ่งทีมงาน 1 ครั้ง | 1.5 วัน |
| | **รวมระยะเวลา Phase 2** | | **14 วันทำ (Man-Days)** |

---

## 3. หลักการคิดราคาอย่างโปร่งใส (Transparent Pricing Formula)

ที่มาของราคาอ้างอิงจากหลักการคำนวณ **Cost = (Effort in Man-Days × Base Daily Rate) + Deliverable Value + Warranty Buffer**:

```
1. ฐานราคาต่อวัน (Base Daily Rate): 
   - เรตตลาด Freelance Senior Frontend / Full-Stack Developer ในไทย: 2,500 – 4,000 บาท/วัน
   - เรตโครงการนี้คิดที่: 2,500 บาท / Man-Day (ราคาพิเศษสำหรับพันธมิตรระยะยาว)

2. ค่าความซับซ้อนสถาปัตยกรรม (System Architecture & Modern Stack):
   - ไม่ใช้เว็บสำเร็จรูป แต่เป็น Modern SPA/SSG (Nuxt 3) มี Source Code สะอาด ไม่ติด Vendor Lock-in สามารถส่งต่อหรือสเกลต่อได้ตลอด

3. การรับประกันและดูแลหลังส่งมอบ (Bug Warranty):
   - รวมการดูแลแก้บั๊กฟรี 30 วันหลังวันขึ้นระบบจริง (Go-Live)
```

---

## 4. สรุปตารางราคา (Price Breakdown)

| ลำดับรายการ | ปริมาณงาน (Man-Days) | อัตราต่อหน่วย (บาท) | จำนวนเงิน (บาท) |
|---|:---:|:---:|:---:|
| **Phase 1: Web Modernization (Nuxt 3 Frontend)** | 16 | 2,500 | 40,000 |
| **Phase 2: StudyWiz CMS & Backoffice Dashboard** | 14 | 2,500 | 35,000 |
| **รวมราคาปกติ (Subtotal)** | **30 วัน** | | **75,000** |
| **ส่วนลดพิเศษกรณีว่าจ้างแพ็กเกจรวม (Bundle Discount)** | - | - | **-10,000** |
| <br>**ยอดรวมสุทธิทั้งโครงการ (Net Total)** | | | <br>**65,000 บาท** |

> *(หมายเหตุ: หากผู้ว่าจ้างเลือกทำเฉพาะ Phase 1 ก่อน ยอดจะอยู่ที่ **40,000 บาท**)*

---

## 5. งวดการชำระเงิน (Payment Milestones)

กรณีแบ่งทำสัญญาหรือแพ็กเกจรวม 2 เฟส:

| งวดที่ | เงื่อนไขการชำระ | สัดส่วน (%) | ยอดเงิน (บาท) |
|:---:|---|:---:|:---:|
| **งวดที่ 1** | ชำระเมื่อตกลงเซ็นสัญญาว่าจ้าง (มัดจำเริ่มต้นโครงการ) | 30% | 19,500 |
| **งวดที่ 2** | ชำระเมื่อส่งมอบงาน Phase 1 (เว็บไซต์ Nuxt 3 ขึ้นแสดงผลครบถ้วนและตรวจรับ) | 40% | 26,000 |
| **งวดที่ 3** | ชำระเมื่องาน Phase 2 แล้วเสร็จ (ระบบ CMS แอดมินทดสอบสมบูรณ์ และ Deploy ขึ้น Production) | 30% | 19,500 |
| | **รวมทั้งสิ้น** | **100%** | **65,000** |

---

## 6. สิ่งที่ลูกค้านำไปใช้ต่อได้ (What Client Receives)
1. **Full Source Code Ownership:** มอบ Source Code ทั้งหมดผ่าน GitHub Repository ของผู้ว่าจ้าง
2. **High-Performance Web Asset:** เว็บไซต์ที่ได้คะแนน Google Core Web Vitals สูง โหลดเร็ว ไม่หน่วง ไม่เปลืองทรัพยากร Server
3. **No Recurring CMS License Fees:** ไม่เสียค่า Plugin รายเดือน/รายปีแบบระบบเก่า
4. **Maintenance & Warranty:** บริการแก้ไขปัญหาทางเทคนิคหรือข้อผิดพลาดของระบบ (Defects/Bugs) ฟรี 30 วันหลังวันส่งมอบงาน
