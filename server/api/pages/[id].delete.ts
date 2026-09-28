import { defineEventHandler, createError } from 'h3';
import { getDb } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const idOrSlug = event.context.params?.id;
  if (!idOrSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing ID parameter' });
  }

  try {
    const db = await getDb();
    const page = await db.collection('pages').findOne({ $or: [{ _id: idOrSlug }, { slug: idOrSlug }] });
    if (!page) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' });
    }
    if (page.isSystem) {
      throw createError({ statusCode: 403, statusMessage: 'System pages cannot be deleted' });
    }

    await db.collection('pages').deleteOne({ _id: page._id });
    return { success: true, message: 'Page deleted successfully' };
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
