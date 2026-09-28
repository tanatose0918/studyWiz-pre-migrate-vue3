import { defineEventHandler } from 'h3';
import { getDb } from '../utils/mongodb';
import localDest from '~/data/destinations.json';

export default defineEventHandler(async () => {
  try {
    const db = await getDb();
    const destinations = await db.collection('destinations').find({}).toArray();
    if (destinations && destinations.length > 0) {
      return { success: true, data: destinations };
    }
  } catch (err: any) {
    console.warn('[MongoDB Atlas] Could not fetch destinations:', err.message);
  }
  return { success: true, data: localDest.countries };
});
