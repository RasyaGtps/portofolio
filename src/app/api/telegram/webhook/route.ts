import { NextRequest, NextResponse } from "next/server";
import { getVisitorStats, getContactsPaginated, initDB } from "@/lib/turso";
import { sendTelegramMessage, editTelegramMessage, answerCallbackQuery } from "@/lib/telegram";

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

let initialized = false;

function formatMessagesResponse(data: { contacts: any[]; total: number; totalPages: number }, page: number) {
  if (data.contacts.length === 0) {
    return {
      text: "📭 Belum ada pesan contact.",
      buttons: null
    };
  }

  const messagesList = data.contacts.map((c, i) => {
    const date = new Date(c.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    return `<b>${(page - 1) * 5 + i + 1}. ${c.name}</b>
📧 ${c.email}
💬 ${c.message}
📅 ${date}`;
  }).join("\n\n");

  const text = `📩 <b>Contact Messages</b> (${page}/${data.totalPages})

${messagesList}

Total: ${data.total} pesan`;

  // Create pagination buttons
  const buttons: any[] = [];
  if (page > 1) {
    buttons.push({ text: "⬅️ Prev", callback_data: `messages_${page - 1}` });
  }
  if (page < data.totalPages) {
    buttons.push({ text: "Next ➡️", callback_data: `messages_${page + 1}` });
  }

  return {
    text,
    buttons: buttons.length > 0 ? { inline_keyboard: [buttons] } : null
  };
}

export async function POST(request: NextRequest) {
  try {
    if (!initialized) {
      await initDB();
      initialized = true;
    }

    const body = await request.json();
    
    // Handle callback query (button clicks)
    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const chatId = callbackQuery.message.chat.id.toString();
      const messageId = callbackQuery.message.message_id;
      const data = callbackQuery.data;

      if (chatId !== TELEGRAM_CHAT_ID) {
        return NextResponse.json({ ok: true });
      }

      // Answer callback to remove loading state
      await answerCallbackQuery(callbackQuery.id);

      // Handle messages pagination
      if (data.startsWith("messages_")) {
        const page = parseInt(data.split("_")[1]);
        const messagesData = await getContactsPaginated(page, 5);
        const response = formatMessagesResponse(messagesData, page);
        await editTelegramMessage(messageId, response.text, response.buttons || undefined);
      }

      return NextResponse.json({ ok: true });
    }

    // Handle regular messages
    const message = body.message;

    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id.toString();
    const text = message.text.toLowerCase();

    // Only respond to authorized chat
    if (chatId !== TELEGRAM_CHAT_ID) {
      return NextResponse.json({ ok: true });
    }

    let response = "";
    let replyMarkup = undefined;

    if (text === "/start" || text === "/help") {
      response = `
🤖 <b>Portfolio Bot Commands</b>

📊 <b>Statistics:</b>
/daily - Statistik hari ini
/weekly - Statistik 7 hari terakhir
/monthly - Statistik 30 hari terakhir
/all - Statistik semua waktu

📩 <b>Messages:</b>
/messages - Lihat pesan contact

ℹ️ Bot ini akan mengirim notifikasi otomatis setiap ada visitor baru atau pesan contact.
      `.trim();
    } else if (text === "/messages") {
      const messagesData = await getContactsPaginated(1, 5);
      const formatted = formatMessagesResponse(messagesData, 1);
      response = formatted.text;
      replyMarkup = formatted.buttons || undefined;
    } else if (text === "/daily" || text === "/weekly" || text === "/monthly" || text === "/all") {
      const period = text.replace("/", "") as "daily" | "weekly" | "monthly" | "all";
      const stats = await getVisitorStats(period);

      const periodLabel = {
        daily: "Hari Ini",
        weekly: "7 Hari Terakhir",
        monthly: "30 Hari Terakhir",
        all: "Semua Waktu"
      };

      const deviceList = stats.devices.map(d => `  • ${d.device}: ${d.count}`).join("\n") || "  Tidak ada data";
      const browserList = stats.browsers.map(b => `  • ${b.browser}: ${b.count}`).join("\n") || "  Tidak ada data";
      const countryList = stats.topCountries.map(c => `  • ${c.country}: ${c.count}`).join("\n") || "  Tidak ada data";

      response = `
📊 <b>Statistik ${periodLabel[period]}</b>

👥 Total Kunjungan: <b>${stats.total}</b>
👤 Unique Visitors: <b>${stats.uniqueVisitors}</b>

📱 <b>Device:</b>
${deviceList}

🌐 <b>Browser:</b>
${browserList}

🌍 <b>Top Countries:</b>
${countryList}
      `.trim();
    } else {
      response = "❓ Command tidak dikenal. Ketik /help untuk melihat daftar command.";
    }

    await sendTelegramMessage(response, replyMarkup);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}
