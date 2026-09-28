import { defineEventHandler, createError } from 'h3';
import { getDb } from '../../utils/mongodb';
import localPages from '~/data/mongoPagesSeed.json';

export default defineEventHandler(async (event) => {
  const idOrSlug = event.context.params?.id;
  if (!idOrSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing ID parameter' });
  }

  try {
    const db = await getDb();
    const page = await db.collection('pages').findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }]
    });
    if (page) {
      return { success: true, data: page };
    }
  } catch (err: any) {
    console.warn('[MongoDB Atlas] fetch page by id error:', err.message);
  }

  const fallback = localPages.find(p => p._id === idOrSlug || p.slug === idOrSlug);
  if (fallback) {
    return { success: true, data: fallback };
  }

  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
});
