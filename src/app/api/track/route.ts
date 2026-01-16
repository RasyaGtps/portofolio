import { NextRequest, NextResponse } from "next/server";
import { notifyVisitor } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
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

    await notifyVisitor({
      ip,
      country,
      city,
      device: body.device || "Unknown",
      browser: body.browser || "Unknown",
      page: body.page || "/"
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
