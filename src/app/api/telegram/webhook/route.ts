import { NextRequest, NextResponse } from "next/server";
import { getVisitorStats, initDB } from "@/lib/turso";
import { sendTelegramMessage } from "@/lib/telegram";

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

let initialized = false;

export async function POST(request: NextRequest) {
  try {
    if (!initialized) {
      await initDB();
      initialized = true;
    }

    const body = await request.json();
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

    if (text === "/start" || text === "/help") {
      response = `
🤖 <b>Portfolio Bot Commands</b>

📊 <b>Statistics:</b>
/daily - Statistik hari ini
/weekly - Statistik 7 hari terakhir
/monthly - Statistik 30 hari terakhir
/all - Statistik semua waktu

ℹ️ Bot ini akan mengirim notifikasi otomatis setiap ada visitor baru atau pesan contact.
      `.trim();
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

    await sendTelegramMessage(response);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}
