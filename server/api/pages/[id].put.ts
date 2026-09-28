import { defineEventHandler, readBody, createError } from 'h3';
import { getDb } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const idOrSlug = event.context.params?.id;
  const body = await readBody(event);
  if (!idOrSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing ID parameter' });
  }

  const updatedFields = {
    ...body,
    updatedAt: new Date().toISOString()
  };
  delete updatedFields._id; // prevent modifying immutable _id

  try {
    const db = await getDb();
    const result = await db.collection('pages').findOneAndUpdate(
      { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] },
      { $set: updatedFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' });
    }

    return {
      success: true,
      message: 'Page updated successfully',
      data: result
    };
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
