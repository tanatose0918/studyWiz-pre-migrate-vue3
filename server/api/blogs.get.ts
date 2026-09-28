import { defineEventHandler, getQuery } from 'h3';
import { getDb } from '../utils/mongodb';
import localBlogs from '~/data/blogs.json';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const filter: any = {};
  if (query.context) {
    filter.blogContext = query.context;
  }

  try {
    const db = await getDb();
    const blogs = await db.collection('blogs').find(filter).sort({ publishedDate: -1 }).toArray();
    if (blogs && blogs.length > 0) {
      return { success: true, data: blogs };
    }
  } catch (err: any) {
    console.warn('[MongoDB Atlas] Could not fetch blogs:', err.message);
  }

  return { success: true, data: localBlogs };
});
