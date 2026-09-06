# WordPress to Vue 3 (Nuxt 3) Implementation Plan: Clean Architecture & DDD

แผนการพัฒนานี้ออกแบบมาเพื่อทำการ Replatform เว็บไซต์ **Studywiz** จาก WordPress ไปยัง **Vue 3 (Nuxt 3)** โดยใช้หลักการ **Clean Architecture** และ **Domain-Driven Design (DDD)** ร่วมกับฟีเจอร์ **Nuxt Layers** เพื่อสร้างระบบที่แยกโครงสร้างอย่างเป็นสัดส่วน ดูแลรักษาง่าย ยืดหยุ่นในการสลับสับเปลี่ยนแหล่งข้อมูล (CMS) และประมวลผลหน้าเว็บในรูปแบบ Static Site Generation (SSG) เพื่อให้ได้ความเร็วในการเปิดหน้าเว็บสูงสุด (Sub-second loading) และคงประสิทธิภาพ SEO ไว้ครบถ้วน [25, 27]

---

## 1. Directory Structure (DDD & Nuxt Layers)

เราจะใช้ระบบ **Nuxt Layers** [27] ในการสร้าง "mini Nuxt projects" ภายใต้โฟลเดอร์ `domains/` เพื่อแยก Concerns ตามโครงสร้างธุรกิจของ Studywiz [26, 27] ได้แก่:
1. **courses** (หลักสูตรแนะแนวศึกษาต่อต่างประเทศ: ภาษา, มัธยม, มหาวิทยาลัย) [31]
2. **blogs** (บทความประชาสัมพันธ์ รีวิวจากนักเรียน และข่าวสาร) [29, 31]
3. **testimonials** (บทสัมภาษณ์และความรู้สึกจากผู้เรียนจริง) [29]

### แผนผังโฟลเดอร์ (Directory Structure)
```text
/workspace
├── nuxt.config.ts                   # ไฟล์กำหนดค่าหลัก (สแกนและ extend ทุก Layers)
└── domains/
    ├── courses/                     # Domain: หลักสูตรและการศึกษาต่อต่างประเทศ
    │   ├── components/              # UI Components สำหรับหลักสูตร (Presentation)
    │   ├── composables/             # State & Logic controller (useCourses.ts)
    │   ├── pages/                   # หน้าเว็บของหลักสูตร เช่น /level-th, /country
    │   ├── types/                   # TypeScript Interfaces สำหรับ Entity
    │   └── server/
    │       └── repository/          # Infrastructure: ตัวยิงดึงข้อมูลจาก WordPress API
    │           └── courseRepository.ts
    ├── blogs/                       # Domain: บทความ รีวิว และข่าวสาร
    │   ├── components/              # UI Components (เช่น BlogCard.vue)
    │   ├── composables/             # State & Logic controller (useBlogs.ts)
    │   ├── pages/                   # หน้าบทความ /blog-2, /all
    │   ├── types/                   # TypeScript Interfaces สำหรับ Blog Entity
    │   └── server/
    │       └── repository/          # Infrastructure: API Adapter ดึงข้อมูลบทความ
    │           └── blogRepository.ts
    └── testimonials/                # Domain: รีวิวและความคิดเห็นของนักเรียน
        ├── components/
        ├── composables/
        ├── pages/                   # หน้า /testimonial
        ├── types/
        └── server/
            └── repository/
                └── testimonialRepository.ts
```

---

## 2. 3-Layer Clean Architecture Design

แต่ละ Domain จะประกอบไปด้วย 3 Layer หลักที่แยกออกจากกันอย่างเด็ดขาดตามมาตรฐาน Clean Architecture [25, 26, 27]:

```
+-----------------------------------------------------------------------+
| Presentation Layer: Vue Components & Pages (ยึดตาม UI & Composables)    |
+-----------------------------------+-----------------------------------+
                                    |
                                    v (เรียกใช้งานผ่าน Interfaces/Ports)
+-----------------------------------------------------------------------+
| Domain Layer: Core Business Rules, Types & Interfaces (Framework-free)  |
+-----------------------------------+-----------------------------------+
                                    ^
                                    | (Dependency Inversion)
+-----------------------------------+-----------------------------------+
| Infrastructure Layer: Repositories & API Clients (WPNuxt, GraphQL)     |
+-----------------------------------------------------------------------+
```

### 1) Domain Layer (กฎทางธุรกิจและ Types)
ทำหน้าที่ระบุ Entity และ Core Models ของระบบ โดยใช้ **Pure TypeScript** เพื่อไม่ให้ขึ้นตรงต่อเฟรมเวิร์กตัวใดตัวหนึ่ง [19]:
* **Entities**: ระบุ Interface ของข้อมูลหลัก เช่น `Course`, `BlogPost`, `Testimonial` [20]
* **Repository Interfaces (Ports)**: สัญญาข้อตกลง (Contracts) สำหรับการดึงข้อมูล เพื่อให้ชั้นนอกสามารถเปลี่ยนวิธีการดึงข้อมูลจาก WordPress เป็น Headless CMS อื่นๆ หรือ Mockup API ได้โดยไม่ต้องแก้ Logic ด้านใน [20, 34]

### 2) Infrastructure Layer (การเชื่อมต่อภายนอก)
รับผิดชอบการดึงข้อมูลจาก WordPress CMS โดยใช้ **WPNuxt Module (GraphQL via WPGraphQL)** เป็นหลักเพื่อดึงข้อมูลอย่างแม่นยำและรวดเร็ว [23, 24]
* **Repository Implementations (Adapters)**: สร้างคลาสที่อิมพลีเมนต์ตาม Interface ในชั้น Domain และจัดทำข้อมูลให้อยู่ในรูปของ Domain Model ก่อนส่งกลับ (Data Mapping) เพื่อลดภาระของฝั่ง UI [20, 27]

### 3) Presentation Layer (การแสดงผลและ User Interface)
* **Composables**: ตัวควบคุมสถานะ (State Controller) และ Use Cases สำหรับจัดการ Logic การโหลดและอัปเดตข้อมูลบนหน้าจอ [20, 26]
* **Vue Pages & Components**: หน้าเว็บและส่วนประกอบที่ทำงานเสมือน "Dumb Components" มีหน้าที่รับข้อมูลมาแสดงผลผ่าน Declarative Binding และคุมเฉพาะ Dynamic UI [17, 20]

---

## 3. Draft Implementation (ชุดโค้ดสถาปัตยกรรมตัวอย่าง)

ด้านล่างนี้คือตัวอย่างร่างการเขียนโปรแกรม (Draft Implementation) สำหรับ Domain **`blogs`** (ครอบคลุม Use Case การเรียกดูบทความ/รีวิวของ Studywiz):

### 3.1 Domain Layer
#### A) Entity Model (`domains/blogs/types/blog.ts`)
```typescript
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage: {
    url: string;
    alt: string;
  } | null;
  author: string;
}
```

#### B) Repository Interface / Port (`domains/blogs/server/repository/blogRepository.interface.ts`)
```typescript
import type { BlogPost } from '../../types/blog';

export interface IBlogRepository {
  getLatestPosts(limit: number): Promise<BlogPost[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
}
```

---

### 3.2 Infrastructure Layer
#### Implementation Adapter ด้วย WPNuxt GraphQL (`domains/blogs/server/repository/wpBlogRepository.ts`)
```typescript
import type { IBlogRepository } from './blogRepository.interface';
import type { BlogPost } from '../../types/blog';

export class WPBlogRepository implements IBlogRepository {
  async getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
    // ใช้งาน type-safe composable ของ WPNuxt เพื่อยิง GraphQL ไปยัง WordPress Backend
    const { data } = await useAsyncData('latest-posts', () => 
      // GraphQL query ที่ดึงเนื้อหาบล็อกข่าวสารของ Studywiz
      GqlGetPosts({ first: limit }) 
    );

    if (!data.value || !data.value.posts) return [];

    // Map ข้อมูลดิบจาก CMS API ให้อยู่ในรูปของ Domain Model (BlogPost Entity)
    return data.value.posts.nodes.map((node: any) => ({
      id: node.id,
      title: node.title,
      slug: node.slug,
      excerpt: node.excerpt,
      content: node.content,
      date: new Date(node.date).toLocaleDateString('th-TH'),
      featuredImage: node.featuredImage ? {
        url: node.featuredImage.node.sourceUrl,
        alt: node.featuredImage.node.altText || node.title
      } : null,
      author: node.author?.node?.name || 'Studywiz'
    }));
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data } = await useAsyncData(`post-${slug}`, () => 
      GqlGetPostByUri({ uri: slug })
    );

    if (!data.value || !data.value.post) return null;

    const post = data.value.post;
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      date: new Date(post.date).toLocaleDateString('th-TH'),
      featuredImage: post.featuredImage ? {
        url: post.featuredImage.node.sourceUrl,
        alt: post.featuredImage.node.altText || post.title
      } : null,
      author: post.author?.node?.name || 'Studywiz'
    };
  }
}
```

---

### 3.3 Presentation Layer
#### A) Composable Controller (`domains/blogs/composables/useBlogs.ts`)
```typescript
import { ref } from 'vue';
import { WPBlogRepository } from '../server/repository/wpBlogRepository';
import type { BlogPost } from '../types/blog';

export function useBlogs() {
  const posts = ref<BlogPost[]>([]);
  const currentPost = ref<BlogPost | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Dependency Injection: เลือกใช้ WordPress Repository Adapter
  const blogRepository = new WPBlogRepository();

  async function fetchLatestPosts(limit: number = 3) {
    loading.value = true;
    error.value = null;
    try {
      posts.value = await blogRepository.getLatestPosts(limit);
    } catch (err: any) {
      error.value = err.message || 'ไม่สามารถโหลดข้อมูลข่าวสารได้';
    } finally {
      loading.value = false;
    }
  }

  async function fetchPostBySlug(slug: string) {
    loading.value = true;
    error.value = null;
    try {
      currentPost.value = await blogRepository.getPostBySlug(slug);
    } catch (err: any) {
      error.value = err.message || 'ไม่พบเนื้อหาบทความที่คุณต้องการ';
    } finally {
      loading.value = false;
    }
  }

  return {
    posts,
    currentPost,
    loading,
    error,
    fetchLatestPosts,
    fetchPostBySlug
  };
}
```

#### B) Declarative UI Component (`domains/blogs/components/BlogCard.vue`)
```vue
<script setup lang="ts">
import type { BlogPost } from '../types/blog';

defineProps<{
  post: BlogPost;
}>();
</script>

<template>
  <div class="border rounded-lg shadow-sm overflow-hidden flex flex-col h-full bg-white hover:shadow-md transition">
    <!-- กล่องเก็บรูปและข้อความที่มีสัดส่วนความสูงเหมาะสมกัน -->
    <div class="relative w-full h-48 bg-gray-100 flex items-center justify-center">
      <img 
        v-if="post.featuredImage" 
        :src="post.featuredImage.url" 
        :alt="post.featuredImage.alt"
        class="w-full h-full object-cover"
      />
      <!-- Placeholder เมื่อไม่มีรูปภาพมาจากการยิง CMS API -->
      <img 
        v-else 
        src="https://placehold.co/400x250?text=Studywiz+News" 
        alt="Default Placeholder"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- ส่วนรายละเอียดข่าวสาร PR -->
    <div class="p-4 flex flex-col flex-grow">
      <span class="text-xs text-gray-500 mb-1">{{ post.date }}</span>
      <h3 class="font-bold text-lg text-blue-900 mb-2 line-clamp-2">
        {{ post.title }}
      </h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <div class="mt-auto flex justify-between items-center text-xs">
        <span class="text-gray-500">เขียนโดย: {{ post.author }}</span>
        <NuxtLink 
          :to="`/blog/${post.slug}`"
          class="text-blue-600 font-semibold hover:underline"
        >
          อ่านเพิ่มเติม &rarr;
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
```

---

## 4. Mockup Data Collections

สำหรับการพัฒนาและทำสอบระบบโดยไม่ต้องเชื่อมต่อกับ WordPress ตลอดเวลา (หรือสำหรับทำ unit testing) เราจะใช้ชุด Mockup Data ในลักษณะนี้:

### 4.1 Mockup Blogs & Testimonials (`domains/blogs/mockData.ts`)
```typescript
import type { BlogPost } from './types/blog';

export const mockBlogPosts: BlogPost[] = [
  {
    id: "mock-1",
    title: "รีวิว Lazarski University ที่วอร์ซอ โดยน้องฮีโร่",
    slug: "review-lazarski-university-warsaw-hero",
    excerpt: "✨”สวัสดีค้าบ ฮีโร่ค้าบ วันนี้เราจะมารีวิวเรื่องการไปเรียนต่อที่ประเทศโปแลนด์ มหาวิทยาลัย Lazarski University ดีงามมากและค่าใช้จ่ายไม่แพง”",
    content: "สวัสดีค้าบ ฮีโร่ค้าบ วันนี้เราจะมารีวิวเรื่องการเรียนต่อต่างประเทศที่ Lazarski University กรุงวอร์ซอ ประเทศโปแลนด์ ระบบการเรียนการสอนเน้นภาคปฏิบัติ และการเดินทางท่องเที่ยวในยุโรปที่สะดวกสบายอย่างมาก เพื่อนๆ คนไหนสนใจห้ามพลาดเลยครับ",
    date: "05/09/2026",
    featuredImage: {
      url: "https://placehold.co/400x250?text=Lazarski+University+Warsaw",
      alt: "รีวิว Lazarski University โดยน้องฮีโร่"
    },
    author: "น้องฮีโร่"
  },
  {
    id: "mock-2",
    title: "เรียนบริหารที่ SolBridge International School of Business",
    slug: "study-business-solbridge-korea",
    excerpt: "สถาบันการบริหารธุรกิจชั้นนำเจ้าของรางวัลจาก AACSB Innovations 2 ครั้งแห่งเดียวในเอเชียตะวันออก คุ้มค่าที่สุดสำหรับหลักสูตรอินเตอร์",
    content: "แนะนำสถาบัน SolBridge International School of Business ประเทศเกาหลีใต้ คณะบริหารธุรกิจระดับท็อปที่ได้รับการรับรองจาก AACSB คณาจารย์นานาชาติและเครือข่ายธุรกิจทั่วโลก ช่วยสร้างรากฐานที่แข็งแกร่งให้แก่ผู้เรียน",
    date: "01/09/2026",
    featuredImage: {
      url: "https://placehold.co/400x250?text=SolBridge+Business+School",
      alt: "SolBridge International School"
    },
    author: "Studywiz Advisor"
  },
  {
    id: "mock-3",
    title: "ไปเรียนหมอที่ม.แพทย์อันดับ 1 ในรัสเซียกัน",
    slug: "study-medicine-kursk-state-medical-university",
    excerpt: "เรียนแพทย์ยุโรป ในงบประมาณไทยๆ เป็นไปได้จริงหรือ?? ชวนรู้จัก Kursk State Medical University สถาบันแพทย์อันดับหนึ่งสำหรับนักศึกษาต่างชาติ",
    content: "สถาบันศึกษาด้านแพทย์หลักสูตรภาษาอังกฤษที่ได้รับการรับรองระดับสากล อัตราค่าเรียนเข้าถึงได้และเป็นผู้นำทางการสอนคลินิกในประเทศรัสเซีย มีสิ่งอำนวยความสะดวกครบครัน เหมาะกับนักเรียนไทยที่มีฝันอยากเป็นแพทย์",
    date: "25/08/2026",
    featuredImage: {
      url: "https://placehold.co/400x250?text=Kursk+State+Medical+University",
      alt: "Study Medicine in Russia"
    },
    author: "Studywiz Advisor"
  }
];
```

### 4.2 Mockup Courses (`domains/courses/mockData.ts`)
```typescript
export interface CourseLevel {
  id: string;
  nameTh: string;
  nameEn: string;
  description: string;
  icon: string;
  bannerImage: string;
}

export const mockCourseLevels: CourseLevel[] = [
  {
    id: "lang",
    nameTh: "ภาษา (Language)",
    nameEn: "Language Programs",
    description: "เรียนต่อหลักสูตรภาษาระยะสั้น-ระยะยาวในต่างประเทศ พัฒนาทักษะได้รวดเร็วกับสถาบันภาษาชั้นนำทั่วโลก",
    icon: "translate",
    bannerImage: "https://placehold.co/1200x400?text=Language+Programs+Banner"
  },
  {
    id: "highschool",
    nameTh: "มัธยม (High School)",
    nameEn: "High School Exchange & Private Programs",
    description: "แนะแนวการศึกษาต่อระดับมัธยมในโรงเรียนประจำและโครงการแลกเปลี่ยนนานาประเทศ ส่งเสริมการเติบโตและการพึ่งพาตนเอง",
    icon: "school",
    bannerImage: "https://placehold.co/1200x400?text=High+School+Banner"
  },
  {
    id: "university",
    nameTh: "วิทยาลัย/มหาวิทยาลัย (College/University)",
    nameEn: "Higher Education Programs",
    description: "สมัครเรียนต่อปริญญาตรี ปริญญาโท หรือปริญญาเอก ในสถาบันการศึกษาระดับโลก มีหลักสูตรหลากหลายตอบโจทย์ทุกงบประมาณ",
    icon: "account_balance",
    bannerImage: "https://placehold.co/1200x400?text=University+Programs+Banner"
  }
];
```

---

## 5. แผนการใช้งานจริงและ Integration Flow (SSG Deployments)

การนำแผนนี้ไปพัฒนาและส่งต่อให้ Antigravity มีโครงสร้างการทำงานดังนี้:

```
+-----------------------------------+
|  WordPress Backend (CMS Portal)   | <-- ผู้ดูแลระบบลงบทความ / อัปเดตข่าวสาร
+-----------------+-----------------+
                  |
                  | (อัปเดตบทความ -> ส่ง Webhook Trigger)
                  v
+-----------------+-----------------+
| Github Action / Vercel Build Hook | <-- ดึงโค้ด Nuxt 3 และทำการ Build
+-----------------+-----------------+
                  |
                  | (รันคำสั่ง 'nuxt generate')
                  v
+-----------------+-----------------+
| WPNuxt API Build & Prefetch Node  | <-- ดึงข้อมูลผ่าน GraphQL/REST และทำ Type-Gen
+-----------------+-----------------+
                  |
                  | (ส่งออก Static HTML + CSS + JS)
                  v
+-----------------+-----------------+
|   Global CDN Edge Deployment      | <-- เว็บแสดงผลเร็วจัด ไม่มี DB Bottleneck
+-----------------------------------+
```

1. **WordPress Content Editing**: ทีมข่าวและเจ้าหน้าที่แนะแนวของ Studywiz ยังคงป้อนข่าวสาร PR และอัปเดตรีวิวบนหลังบ้าน WordPress ตามปกติ ไม่ต้องเรียนรู้ระบบใหม่
2. **Jamstack Build Hooks**: เมื่อมีการบันทึกการเปลี่ยนแปลงของบทความ WordPress Plugin (เช่น WP Webhooks หรือ Jamstack Deployments) จะทำการส่ง HTTP Post ไปหา Vercel/Netlify Build Hook [DEV III]
3. **Optimized Build Process**:
   * Nuxt 3 จะรันกระบวนการ `nuxt generate` เพื่อดึงข้อมูลทั้งหมดจาก WordPress ผ่าน GraphQL [Align Studios]
   * WPNuxt จะแปลง Gutenberg Blocks ออกมาเป็น Vue Component ของ Nuxt โดยตรง ทำให้ได้ HTML โครงสร้างสะอาดและใช้ CSS คุมได้ 100% [Integrating]
   * บล็อกข่าวสารและรีวิวจะกลายเป็น Static Web Pages ทันที ลดการเชื่อมต่อ Database หน้าบ้าน ไม่โดนโจมตีช่องโหว่ WordPress และประหยัดค่า Host สุดๆ [Align Studios]
