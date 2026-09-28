import { defineEventHandler } from 'h3';
import { getDb } from '../../utils/mongodb';
import localPages from '~/data/mongoPagesSeed.json';

export default defineEventHandler(async () => {
  try {
    const db = await getDb();
    const pages = await db.collection('pages').find({}).sort({ order: 1, createdAt: 1 }).toArray();
    if (pages && pages.length > 0) {
      return { success: true, data: pages };
    }
  } catch (err: any) {
    console.warn('[MongoDB Atlas] Could not fetch pages, fallback to local seed:', err.message);
  }

  return { success: true, data: localPages };
});
