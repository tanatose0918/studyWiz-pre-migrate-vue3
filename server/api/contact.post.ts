import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 1. Validation
  if (!body.name || !body.phone || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อ, เบอร์โทรศัพท์, อีเมล, ข้อความ)',
    });
  }

  // 2. Logging & Notification Dispatch
  console.log('[Contact Form Received]:', {
    name: body.name,
    phone: body.phone,
    lineId: body.lineId,
    email: body.email,
    subject: body.subject,
    message: body.message,
    timestamp: new Date().toISOString()
  });

  // 3. Optional Line Notify or Webhook forwarding
  const lineToken = process.env.LINE_NOTIFY_TOKEN;
  if (lineToken) {
    try {
      const lineMessage = `\n📩 มีผู้ติดต่อใหม่จากหน้าเว็บ Studywiz!\nชื่อ: ${body.name}\nเบอร์โทร: ${body.phone}\nLine ID: ${body.lineId || '-'}\nอีเมล: ${body.email}\nเรื่อง: ${body.subject || '-'}\nข้อความ: ${body.message}`;
      
      await fetch('https://notify-api.line.me/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${lineToken}`,
        },
        body: new URLSearchParams({ message: lineMessage }),
      });
    } catch (err) {
      console.error('[Line Notify Error]:', err);
    }
  }

  return {
    success: true,
    message: 'ได้รับข้อความของท่านเรียบร้อยแล้ว ทีมงาน Studywiz จะติดต่อกลับโดยเร็วที่สุดครับ'
  };
});
