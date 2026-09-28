# แผนการพัฒนาระบบ StudyWiz CMS: ส่วนบริหารจัดการ Global Components
**โครงการ:** พัฒนาระบบหลังบ้าน StudyWiz CMS (`studyWiz-cms`)  
**ที่ตั้งโครงการเป้าหมาย:** `d:\0_Lifes\Works\Freelance Work\studyWiz-cms`  
**อ้างอิงโค้ดหน้าบ้าน:** `d:\0_Lifes\Works\Freelance Work\studyWiz-pre-migrate-vue3`  
**ผู้จัดทำ:** Jeffcaliber & Tanadol Phengchan (System Builder Collaborator)  
**วันที่:** 28 กันยายน 2026  
**สถานะ:** แผนปฏิบัติการรอการตรวจรับก่อนเริ่มดำเนินงาน (Implementation Plan - Pending Approval)  

---

## 1. วัตถุประสงค์และขอบเขตงาน (Executive Summary & Scope)

เป้าหมายของเฟสนี้คือการสร้างโครงการใหม่ **`studyWiz-cms`** ขึ้นที่เลเยอร์ `Freelance Work` เพื่อทำหน้าที่เป็น **ระบบหลังบ้าน (Admin Backoffice Control Center)** ควบคุมและจัดการข้อมูลของเว็บไซต์ StudyWiz โดยเริ่มต้นที่การควบคุม **Global Components (โครงสร้างหลักรอบนอกของเว็บไซต์)** ทั้งหมดให้เป็นระบบเดียวกัน (Single Source of Truth)

### 🧩 รายการ Global Components ที่ต้องจัดการ:
1. **`TheTopBar.vue`**: แถบข้อมูลด้านบนสุด (เบอร์สายด่วน, อีเมล, ลิงก์โซเชียลมีเดีย, ตัวสลับภาษา)
2. **`TheNavbar.vue`**: แถบเมนูนำทางหลักบนเดสก์ท็อป (โลโก้, เมนูหลัก, เมนูย่อย Dropdown, ปุ่ม Call-to-Action)
3. **`TheMobileDrawer.vue`**: เมนูลอยบนมือถือ (**ปรับให้ดึงโครงสร้างข้อมูลชุดเดียวกับ `TheNavbar` 100%**)
4. **`TheOverlayButton.vue`**: ปุ่มลอยมุมขวาล่าง (**ปรับปรุงจาก `FloatingContactSpeedDial.vue`** ให้เป็นคอมโพเนนต์มาตรฐานที่ควบคุมได้จาก CMS)
5. **`TheFooter.vue`**: ส่วนท้ายของเว็บไซต์ (ข้อมูลสาขากรุงเทพฯ/เชียงใหม่, รายชื่อเมนู, ตราสมาคม TIECA/FELCA, ลิขสิทธิ์)

---

## 2. การวิเคราะห์ปัญหาเดิม & แนวทางแก้ไขทางสถาปัตยกรรม (Architecture Diagnosis)

| คอมโพเนนต์ | สภาพปัจจุบันใน `studyWiz-pre-migrate-vue3` | สถาปัตยกรรมใหม่ใน `studyWiz-cms` |
|---|---|---|
| **เมนูนำทาง (`TheNavbar` vs `TheMobileDrawer`)** | เขียนฮาร์ดโค้ด `navLinks` ซ้ำกันทั้ง 2 ไฟล์ หากเพิ่มเมนูใหม่ต้องตามแก้ 2 ที่ เสี่ยงต่อความไม่ตรงกัน | แยกข้อมูลเมนูออกมาเป็น **`navigation.json` (Single Source of Truth)** ทั้ง Navbar และ Mobile Drawer อ่านจาก Schema เดียวกัน |
| **ปุ่มลอยติดต่อ (`FloatingContactSpeedDial`)** | ผูกค่าแบบสแตติกและชื่อคอมโพเนนต์จำเพาะเจาะจง | รีแฟกเตอร์เป็น **`TheOverlayButton.vue`** ที่สามารถเปิด/ปิดปุ่มโทรด่วน, ปุ่ม LINE หรือปุ่มกลับขึ้นบนสุด ผ่าน CMS ได้ |
| **ข้อมูลองค์กร & สาขา (`TheTopBar` & `TheFooter`)** | อ่านบางส่วนจาก `siteSettings.json` แต่มีข้อความและลิงก์บางส่วนกระจายอยู่ในเทมเพลต | รวมศูนย์ข้อมูลเป็น **Global Layout Configuration** ผ่าน API/JSON ของระบบ CMS |

---

## 3. โครงสร้างข้อมูลกลาง (Single Source of Truth Schema)

ออกแบบสัญญาข้อมูล (Data Contract) ให้อยู่ในรูปแบบ TypeScript Interface และ JSON Schema:

```typescript
// types/layout.ts

export interface NavItem {
  id: string;
  name: string;
  path: string;
  isExternal?: boolean;
  hasDropdown?: boolean;
  children?: Array<{
    name: string;
    path: string;
    description?: string;
  }>;
}

export interface SocialLinks {
  facebook: string;
  facebookCnx?: string;
  line: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

export interface OfficeBranch {
  title: string;
  address: string;
  mapUrl: string;
  phones: string[];
  email: string;
}

export interface OverlayButtonConfig {
  enableScrollToTop: boolean;
  enableQuickCall: boolean;
  enableLineChat: boolean;
  quickCallPhone: string;
  lineUrl: string;
  badgeText?: string;
}

export interface LayoutConfig {
  topBar: {
    enabled: boolean;
    announcementText?: string;
    hotlinePhones: string[];
    primaryEmail: string;
    socials: SocialLinks;
    languages: Array<{ code: string; label: string; active: boolean }>;
  };
  navigation: NavItem[];
  overlayButton: OverlayButtonConfig;
  footer: {
    aboutText: string;
    offices: {
      bangkok: OfficeBranch;
      chiangmai: OfficeBranch;
    };
    socials: SocialLinks;
    accreditations: Array<{ name: string; label: string; icon: string }>;
    copyrightYear: number;
  };
}
```

---

## 4. แผนปฏิบัติการ 5 ขั้นตอน (Step-by-Step Implementation Roadmap)

```
[ Step 1 ] รีแฟกเตอร์หน้าบ้าน (studyWiz-pre-migrate-vue3)
           • แยก navigation.json ให้ Navbar & Drawer ดึงร่วมกัน
           • แปลง FloatingContactSpeedDial -> TheOverlayButton
     │
     ▼
[ Step 2 ] จัดตั้งโปรเจกต์ใหม่ `studyWiz-cms` ที่เลเยอร์ Freelance Work
           • Setup Nuxt 3 / Tailwind CSS / Pinia / Headless UI
           • กำหนด Authentication & Layout พื้นฐานของ CMS
     │
     ▼
[ Step 3 ] พัฒนาหน้าจอจัดการ Global Layout บน CMS Dashboard
           • หน้า 1: จัดการเมนูนำทาง (Navigation Tree Manager)
           • หน้า 2: จัดการ TopBar & Socials
           • หน้า 3: จัดการ TheOverlayButton
           • หน้า 4: จัดการ Footer & Office Branches
     │
     ▼
[ Step 4 ] วางระบบเชื่อมต่อข้อมูล (Data Sync Pipeline)
           • ให้ CMS บันทึกและ Export/Sync ข้อมูลมายังหน้าบ้าน
           • ทดสอบการอัปเดตแบบเรียลไทม์ (Hot-Reloading Verification)
     │
     ▼
[ Step 5 ] ทดสอบระบบรวม & ส่งมอบรายงานตรวจรับ (Final Verification)
```

---

### รายละเอียดการปฏิบัติการแต่ละขั้นตอน:

### 📍 Step 1: เตรียมความพร้อมฝั่งหน้าบ้าน (`studyWiz-pre-migrate-vue3`)
1. สร้างไฟล์ `app/data/navigation.json` เพื่อรวมเมนูทั้งหมดไว้ที่เดียว
2. ปรับแก้ [`TheNavbar.vue`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/components/layout/TheNavbar.vue) ให้นำเข้า `navigation.json` แทนการฮาร์ดโค้ด
3. ปรับแก้ [`TheMobileDrawer.vue`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/components/layout/TheMobileDrawer.vue) ให้ใช้อาร์เรย์เมนูจาก `navigation.json` ชุดเดียวกัน
4. สร้างคอมโพเนนต์ใหม่ [`TheOverlayButton.vue`](file:///d:/0_Lifes/Works/Freelance%20Work/studyWiz-pre-migrate-vue3/app/components/layout/TheOverlayButton.vue) มาแทนที่ `FloatingContactSpeedDial.vue` พร้อมปรับปรุงใน `app/layouts/default.vue`
5. ทดสอบรันและทดสอบการแสดงผลบน Browser ให้ไม่มี Warning หรือ Broken Link

### 📍 Step 2: สร้างและตั้งค่าโปรเจกต์ `studyWiz-cms`
1. รันคำสั่งสร้างโปรเจกต์ Nuxt 3 ที่ตำแหน่ง `d:\0_Lifes\Works\Freelance Work\studyWiz-cms`
2. ติดตั้ง Dependencies ที่จำเป็น:
   - Tailwind CSS + `@tailwindcss/forms`
   - Pinia (สำหรับจัดการ State ของฟอร์มหลังบ้าน)
   - `@vueuse/core` (ช่วยจัดการ LocalStorage / Clipboard / Resize)
   - ไอคอนเวกเตอร์ระบบเดียวกับหน้าบ้าน (AppIcon system)
3. กำหนดโครงสร้างโฟลเดอร์แบบ Clean Architecture:
   - `components/cms/` (ฟอร์มจัดการแต่ละส่วน)
   - `pages/layout/` (หน้ารวมการตั้งค่าเมนูและส่วนหัว/ท้าย)
   - `server/api/layout/` (API สำหรับอ่าน-บันทึกข้อมูล Layout)

### 📍 Step 3: พัฒนาหน้าจอแอดมินสำหรับจัดการ Global Components
1. **Navigation Menu Builder:**
   - หน้ารายการเมนูที่สามารถ เพิ่ม, ลบ, แก้ไขชื่อ (ไทย/อังกฤษ), เปลี่ยน URL ปลายทาง
   - จัดการเมนูย่อย (Sub-items Dropdown)
2. **TopBar & Social Media Settings:**
   - ฟอร์มแก้ไขเบอร์สายด่วน, อีเมลหลัก
   - กล่องกรอก URL ของ Facebook, LINE Official, Instagram, TikTok, YouTube
3. **TheOverlayButton Settings:**
   - สวิตช์เปิด-ปิดปุ่มเลื่อนขึ้นบน (Back to Top)
   - สวิตช์เปิด-ปิดปุ่มโทรด่วน พร้อมระบุเบอร์โทร
   - สวิตช์เปิด-ปิดปุ่ม LINE Chat พร้อมระบุข้อความป้ายกำกับ
4. **Footer & Branch Settings:**
   - ฟอร์มแก้ไขที่อยู่และเบอร์โทรของสาขากรุงเทพฯ และสาขาเชียงใหม่
   - จัดการลิงก์แผนที่ Google Maps และอีเมลประจำสาขา

### 📍 Step 4: เชื่อมโยง Data Pipeline
1. ออกแบบให้ CMS ทำงานในโหมด File-based Synchronization (บันทึกลง JSON ก่อนในเบื้องต้น) เพื่อความเสถียรและเร็ว
2. เตรียม Interface ปลายทางสำหรับเชื่อมต่อไปยัง Cloud Database (MongoDB Atlas) ในขั้นตอนถัดไป

### 📍 Step 5: ตรวจรับงานและทดสอบ (Testing & Verification)
1. ตรวจสอบว่าเมื่อแก้ชื่อเมนูใน `navigation.json` ทั้ง **Navbar บนคอมพิวเตอร์** และ **Mobile Drawer บนมือถือ** จะต้องเปลี่ยนตามทันทีโดยอัตโนมัติ
2. ทดสอบว่าปุ่ม `TheOverlayButton` ทำงานลอยอยู่มุมขวาล่าง สามารถกดโทรและกดแชต LINE ได้ปกติ
3. ตรวจสอบ TypeScript Types ไม่ให้มี Error

---

## 5. การขออนุมัติก่อนเริ่มดำเนินการ (Review & Sign-Off)

พี่ต่อสามารถตรวจสอบหัวข้อและสถาปัตยกรรมในแผนนี้ได้เลยครับ หากต้องการปรับเปลี่ยนโครงสร้าง ปรับลดฟังก์ชัน หรือมีฟีเจอร์เพิ่มเติมตรงจุดไหน แจ้งเจฟได้ทันที เมื่อพี่ต่อให้สัญญาณ **"อนุมัติ (Approve)"** เจฟจะเริ่มรัน **Step 1 (รีแฟกเตอร์หน้าบ้าน)** และ **Step 2 (สร้างโปรเจกต์ `studyWiz-cms`)** ให้ทันทีครับ!
