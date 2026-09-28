import { defineEventHandler, readBody, createError } from 'h3';
import { getDb } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.title || !body.slug) {
    throw createError({ statusCode: 400, statusMessage: 'Page Title and Slug are required' });
  }

  const cleanSlug = body.slug.replace(/^\/+|\/+$/g, '').toLowerCase();
  const path = cleanSlug === '' ? '/' : `/${cleanSlug}`;

  const newPage = {
    _id: new ObjectId().toString(),
    slug: cleanSlug,
    path: path,
    title: body.title,
    isSystem: false,
    status: body.status || 'published',
    templateType: body.templateType || 'custom',
    seo: {
      metaTitle: body.seo?.metaTitle || `${body.title} - Studywiz`,
      metaDescription: body.seo?.metaDescription || `ข้อมูลและรายละเอียดเกี่ยวกับ ${body.title}`,
      ogImage: body.seo?.ogImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
    },
    sections: body.sections || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    const db = await getDb();
    const existing = await db.collection('pages').findOne({ slug: cleanSlug });
    if (existing) {
      throw createError({ statusCode: 409, statusMessage: `A page with slug '${cleanSlug}' already exists` });
    }
    await db.collection('pages').insertOne(newPage);
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw createError({ statusCode: 500, statusMessage: err.message });
  }

  return {
    success: true,
    message: 'Page created successfully',
    data: newPage
  };
});
