import { defineEventHandler, getQuery } from 'h3';
import { getDb } from '../utils/mongodb';
import localInst from '~/data/institutions.json';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const filter: any = {};
  if (query.level) filter.level = query.level;
  if (query.countrySlug) filter.countrySlug = query.countrySlug;

  try {
    const db = await getDb();
    const institutions = await db.collection('institutions').find(filter).toArray();
    if (institutions && institutions.length > 0) {
      return { success: true, data: institutions };
    }
  } catch (err: any) {
    console.warn('[MongoDB Atlas] Could not fetch institutions:', err.message);
  }

  let result = localInst;
  if (query.level) result = result.filter(i => i.level === query.level);
  if (query.countrySlug) result = result.filter(i => i.countrySlug === query.countrySlug);
  return { success: true, data: result };
});
