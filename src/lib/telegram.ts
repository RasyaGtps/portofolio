const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(message: string, replyMarkup?: object) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured');
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const body: any = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    };
    
    if (replyMarkup) {
      body.reply_markup = JSON.stringify(replyMarkup);
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const result = await response.json();
    if (!result.ok) {
      console.error('Telegram API error:', result);
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}

export async function editTelegramMessage(messageId: number, text: string, replyMarkup?: object) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`;
    const body: any = {
      chat_id: TELEGRAM_CHAT_ID,
      message_id: messageId,
      text,
      parse_mode: 'HTML'
    };
    
    if (replyMarkup) {
      body.reply_markup = JSON.stringify(replyMarkup);
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const result = await response.json();
    if (!result.ok) {
      console.error('Telegram edit error:', result);
    }
  } catch (error) {
    console.error('Failed to edit Telegram message:', error);
  }
}

export async function answerCallbackQuery(callbackQueryId: string) {
  if (!TELEGRAM_BOT_TOKEN) return;
  
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: callbackQueryId })
    });
  } catch (error) {
    console.error('Failed to answer callback query:', error);
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
