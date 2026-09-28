import { defineEventHandler, readBody, createError } from 'h3';
import { getDb } from '../utils/mongodb';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'No payload provided' });
  }

  const updatedDoc = {
    ...body,
    _id: 'global_layout_v1',
    updatedAt: new Date().toISOString()
  };

  try {
    const db = await getDb();
    await db.collection('global_layout').replaceOne(
      { _id: 'global_layout_v1' },
      updatedDoc,
      { upsert: true }
    );
  } catch (err: any) {
    console.error('[MongoDB Atlas Update Error]:', err.message);
  }

  // Also sync navigation.json locally for offline/SSR fallback if navigation exists
  if (body.navigation && Array.isArray(body.navigation)) {
    try {
      const navPath = path.resolve(process.cwd(), 'app/data/navigation.json');
      fs.writeFileSync(navPath, JSON.stringify(body.navigation, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write local navigation.json fallback:', e);
    }
  }

  return {
    success: true,
    message: 'Global layout updated successfully',
    data: updatedDoc
  };
});
