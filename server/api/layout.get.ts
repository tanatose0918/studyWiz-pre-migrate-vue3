import { defineEventHandler } from 'h3';
import { getDb } from '../utils/mongodb';
import siteSettings from '~/data/siteSettings.json';
import navigationData from '~/data/navigation.json';

export default defineEventHandler(async () => {
  try {
    const db = await getDb();
    const layout = await db.collection('global_layout').findOne({ _id: 'global_layout_v1' });
    if (layout) {
      return { success: true, data: layout };
    }
  } catch (err: any) {
    console.warn('[MongoDB Atlas] Could not fetch global_layout, fallback to local data:', err.message);
  }

  // Fallback to local data
  return {
    success: true,
    data: {
      _id: 'global_layout_v1',
      topBar: {
        enabled: true,
        announcementText: 'ปรึกษาเรียนต่อต่างประเทศฟรี ครบวงจรทุกระดับการศึกษา',
        hotlinePhones: siteSettings.hotlinePhones,
        primaryEmail: siteSettings.primaryEmail,
        socials: siteSettings.socialLinks,
        languages: [
          { code: 'th', label: 'ไทย', active: true },
          { code: 'en', label: 'EN', active: false }
        ]
      },
      navigation: navigationData,
      overlayButton: {
        enableScrollToTop: true,
        enableQuickCall: true,
        enableLineChat: true,
        quickCallPhone: siteSettings.hotlinePhones[0],
        lineUrl: siteSettings.socialLinks.line,
        badgeText: 'แอด Line ปรึกษาฟรี'
      },
      footer: {
        aboutText: siteSettings.footerAbout,
        offices: siteSettings.offices,
        socials: siteSettings.socialLinks,
        accreditations: [
          { name: 'TIECA', label: 'สมาคมไทยแนะแนวการศึกษาต่อต่างประเทศ', icon: 'shield-check' },
          { name: 'FELCA', label: 'Federation of Education and Language Consultant Associations', icon: 'award' }
        ],
        copyrightYear: 2026
      }
    }
  };
});
