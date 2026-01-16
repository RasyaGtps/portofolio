const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured');
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}

export async function notifyVisitor(info: {
  ip: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  page?: string;
}) {
  const time = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  const message = `
🌐 <b>New Visitor!</b>

📍 IP: <code>${info.ip}</code>
🌍 Location: ${info.city || 'Unknown'}, ${info.country || 'Unknown'}
📱 Device: ${info.device || 'Unknown'}
🔍 Browser: ${info.browser || 'Unknown'}
📄 Page: ${info.page || '/'}
🕐 Time: ${time}
  `.trim();

  await sendTelegramMessage(message);
}

export async function notifyContact(info: {
  name: string;
  email: string;
  message: string;
}) {
  const time = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  const msg = `
📩 <b>New Contact Message!</b>

👤 Name: ${info.name}
📧 Email: ${info.email}
💬 Message:
${info.message}

🕐 Time: ${time}
  `.trim();

  await sendTelegramMessage(msg);
}
