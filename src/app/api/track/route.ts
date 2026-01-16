import { NextRequest, NextResponse } from "next/server";
import { notifyVisitor } from "@/lib/telegram";
import { addVisitor, initDB } from "@/lib/turso";

let initialized = false;

export async function POST(request: NextRequest) {
  try {
    if (!initialized) {
      await initDB();
      initialized = true;
    }

    const body = await request.json();
    
    // Get IP from headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "Unknown";
    
    // Get geo info from IP (using free API)
    let country = "Unknown";
    let city = "Unknown";
    
    try {
      const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`);
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        country = geoData.country || "Unknown";
        city = geoData.city || "Unknown";
      }
    } catch {
      // Ignore geo lookup errors
    }

    const visitorData = {
      ip,
      country,
      city,
      device: body.device || "Unknown",
      browser: body.browser || "Unknown",
      page: body.page || "/"
    };

    // Save to database
    await addVisitor(visitorData);

    // Send Telegram notification
    await notifyVisitor(visitorData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
