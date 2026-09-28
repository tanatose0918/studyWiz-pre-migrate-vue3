import os
import sys
import json
from datetime import datetime, timezone
import pymongo
from pymongo import UpdateOne

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_FILE = r"d:\0_Lifes\Works\Freelance Work\atlas-credentials.env"

# 1. Parse Credentials
env_vars = {}
if not os.path.exists(ENV_FILE):
    print(f"Error: Credentials file not found at {ENV_FILE}")
    sys.exit(1)

with open(ENV_FILE, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            env_vars[k.strip()] = v.strip().strip('"').strip("'")

mongo_uri = env_vars.get('MONGODB_URI')
if not mongo_uri:
    print("Error: MONGODB_URI not found in env file!")
    sys.exit(1)

print(f"Connecting to MongoDB Atlas...")
try:
    client = pymongo.MongoClient(mongo_uri, serverSelectionTimeoutMS=10000)
    db = client['studywiz']
    # Trigger connection test
    db.command('ping')
    print("Successfully connected to MongoDB Atlas (Database: studywiz)!")
except Exception as e:
    print(f"Database connection error: {e}")
    sys.exit(1)

def load_json(rel_path):
    full_path = os.path.join(BASE_DIR, rel_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    print(f"Warning: File not found: {full_path}")
    return None

def now_iso():
    return datetime.now(timezone.utc).isoformat()

# ==========================================
# 1. Seed Collection: pages
# ==========================================
pages_data = load_json('app/data/mongoPagesSeed.json')
if pages_data:
    pages_col = db['pages']
    pages_col.create_index([('slug', pymongo.ASCENDING)], unique=True)
    pages_col.create_index([('path', pymongo.ASCENDING)], unique=True)
    
    operations = []
    for page in pages_data:
        operations.append(
            UpdateOne({'_id': page['_id']}, {'$set': page}, upsert=True)
        )
    if operations:
        res = pages_col.bulk_write(operations)
        print(f"✔ [pages] Upserted {len(operations)} pages (Matched: {res.matched_count}, Upserted: {len(res.upserted_ids)})")

# ==========================================
# 2. Seed Collection: global_layout
# ==========================================
nav_data = load_json('app/data/navigation.json')
site_settings = load_json('app/data/siteSettings.json')

global_layout_doc = {
    "_id": "global_layout_v1",
    "updatedAt": now_iso(),
    "topBar": {
        "enabled": True,
        "announcementText": "ปรึกษาเรียนต่อต่างประเทศฟรี ครบวงจรทุกระดับการศึกษา",
        "hotlinePhones": site_settings.get('hotlinePhones', ["08-1934-9695", "08-6383-4454"]),
        "primaryEmail": site_settings.get('primaryEmail', "info@studywiz.net"),
        "socials": site_settings.get('socialLinks', {}),
        "languages": [
            {"code": "th", "label": "ไทย", "active": True},
            {"code": "en", "label": "EN", "active": False}
        ]
    },
    "navigation": nav_data or [],
    "overlayButton": {
        "enableScrollToTop": True,
        "enableQuickCall": True,
        "enableLineChat": True,
        "quickCallPhone": site_settings.get('hotlinePhones', ["08-1934-9695"])[0],
        "lineUrl": site_settings.get('socialLinks', {}).get('line', "https://line.me/R/ti/p/@studywiz"),
        "badgeText": "แอด Line ปรึกษาฟรี"
    },
    "footer": {
        "aboutText": site_settings.get('footerAbout', "Studywiz สถาบันแนะแนวศึกษาต่อต่างประเทศ ก่อตั้งปี 2528 สมาชิก TIECA & FELCA"),
        "offices": site_settings.get('offices', {}),
        "socials": site_settings.get('socialLinks', {}),
        "accreditations": [
            {"name": "TIECA", "label": "สมาคมไทยแนะแนวการศึกษาต่อต่างประเทศ", "icon": "shield-check"},
            {"name": "FELCA", "label": "Federation of Education and Language Consultant Associations", "icon": "award"}
        ],
        "copyrightYear": 2026
    }
}

layout_col = db['global_layout']
layout_col.replace_one({'_id': 'global_layout_v1'}, global_layout_doc, upsert=True)
print(f"✔ [global_layout] Synced global layout configuration document ('global_layout_v1')")

# ==========================================
# 3. Seed Collection: destinations
# ==========================================
dest_data = load_json('app/data/destinations.json')
if dest_data and 'countries' in dest_data:
    dest_col = db['destinations']
    dest_col.create_index([('slug', pymongo.ASCENDING)], unique=True)
    dest_col.create_index([('region', pymongo.ASCENDING)])
    
    operations = []
    for c in dest_data['countries']:
        doc = dict(c)
        doc['updatedAt'] = now_iso()
        operations.append(
            UpdateOne({'slug': c['slug']}, {'$set': doc}, upsert=True)
        )
    if operations:
        res = dest_col.bulk_write(operations)
        print(f"✔ [destinations] Upserted {len(operations)} destination countries")

# ==========================================
# 4. Seed Collection: institutions
# ==========================================
inst_data = load_json('app/data/institutions.json')
if inst_data:
    inst_col = db['institutions']
    inst_col.create_index([('slug', pymongo.ASCENDING)], unique=True)
    inst_col.create_index([('countrySlug', pymongo.ASCENDING)])
    inst_col.create_index([('level', pymongo.ASCENDING)])
    
    operations = []
    for inst in inst_data:
        doc = dict(inst)
        # Enrich China Medical University
        if doc.get('slug') == 'china-medical-university':
            doc['nativeName'] = "中国医科大学"
            doc['ranking'] = {
                "national": "Top 10 ด้านการแพทย์ของจีน",
                "grade": "มหาวิทยาลัยรัฐบาลเกรด A"
            }
            doc['admissionCriteria'] = {
                "minGpa": 3.00,
                "requiredStream": "มัธยมศึกษาตอนปลาย สายวิทยาศาสตร์ (ยื่นเกรด 5 ภาคเรียนก่อนได้)",
                "requiredSubjects": ["ฟิสิกส์", "เคมี", "ชีววิทยา", "คณิตศาสตร์", "ภาษาอังกฤษ"],
                "subjectMinScore": "ไม่ต่ำกว่า 3.00",
                "languageRequirement": "IELTS 6.0 หรือ ผ่านเกณฑ์สัมภาษณ์ภาษาอังกฤษ",
                "notes": "ถ้าเกรดใกล้เคียง สามารถส่งทรานสคริปท์มาให้มหาวิทยาลัยพิจารณาเป็นรายกรณี"
            }
            doc['costs'] = {
                "currency": "RMB",
                "tuitionPerYearRmb": 40000,
                "dormitoryPerYearRmb": 7500,
                "totalPerYearThb": 237500,
                "totalCourseThb": 1425000,
                "durationYears": 6,
                "degree": "MBBS (Bachelor of Medicine & Surgery)"
            }
        
        doc['updatedAt'] = now_iso()
        operations.append(
            UpdateOne({'slug': doc['slug']}, {'$set': doc}, upsert=True)
        )
    if operations:
        res = inst_col.bulk_write(operations)
        print(f"✔ [institutions] Upserted {len(operations)} partner institutions")

# ==========================================
# 5. Seed Collection: blogs (with Blog Context)
# ==========================================
blogs_data = load_json('app/data/blogs.json')
if blogs_data:
    blogs_col = db['blogs']
    blogs_col.create_index([('slug', pymongo.ASCENDING)], unique=True)
    blogs_col.create_index([('blogContext', pymongo.ASCENDING)])
    
    # Map category to Blog Context
    def get_blog_context(category):
        cat = (category or "").lower()
        if any(w in cat for w in ['จีน', 'เกาหลี', 'ญี่ปุ่น', 'china', 'korea', 'japan']):
            return 'china-japan-korea'
        elif any(w in cat for w in ['ยุโรป', 'รัสเซีย', 'europe', 'russia', 'poland', 'germany']):
            return 'europe-russia'
        elif any(w in cat for w in ['อเมริกา', 'แคนาดา', 'usa', 'canada']):
            return 'usa-canada'
        elif any(w in cat for w in ['ออสเตรเลีย', 'นิวซีแลนด์', 'australia', 'nz']):
            return 'australia-nz'
        elif any(w in cat for w in ['ทุน', 'scholarship']):
            return 'scholarships'
        elif any(w in cat for w in ['มัธยม', 'high school']):
            return 'high-school-guide'
        return 'general'

    operations = []
    for b in blogs_data:
        doc = dict(b)
        doc['blogContext'] = get_blog_context(b.get('category'))
        doc['updatedAt'] = now_iso()
        operations.append(
            UpdateOne({'slug': b['slug']}, {'$set': doc}, upsert=True)
        )
    if operations:
        res = blogs_col.bulk_write(operations)
        print(f"✔ [blogs] Upserted {len(operations)} articles with Blog Context tagging")

# ==========================================
# 6. Seed Collection: testimonials
# ==========================================
test_data = load_json('app/data/testimonials.json')
if test_data:
    test_col = db['testimonials']
    operations = [
        UpdateOne({'id': t['id']}, {'$set': t}, upsert=True)
        for t in test_data
    ]
    if operations:
        test_col.bulk_write(operations)
        print(f"✔ [testimonials] Upserted {len(operations)} alumni testimonials")

# ==========================================
# 7. Seed Collection: activities
# ==========================================
act_data = load_json('app/data/activities.json')
if act_data:
    act_col = db['activities']
    operations = [
        UpdateOne({'id': a['id']}, {'$set': a}, upsert=True)
        for a in act_data
    ]
    if operations:
        act_col.bulk_write(operations)
        print(f"✔ [activities] Upserted {len(operations)} seminars & events")

print("\n" + "="*50)
print("🎯 MONGODB ATLAS SEED SUMMARY (Database: studywiz)")
print("="*50)
for col_name in ['pages', 'global_layout', 'destinations', 'institutions', 'blogs', 'testimonials', 'activities']:
    count = db[col_name].count_documents({})
    print(f"  • {col_name:<16}: {count:>4} documents")
print("="*50)
print("All collections seeded and indexed successfully!\n")
