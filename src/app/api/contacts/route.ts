import { NextRequest, NextResponse } from "next/server";
import { getContacts, addContact, initDB } from "@/lib/turso";
import { notifyContact } from "@/lib/telegram";
import { rateLimit } from "@/lib/rate-limit";

// Initialize database on first request
let initialized = false;

export async function GET() {
  try {
    if (!initialized) {
      await initDB();
      initialized = true;
    }
    
    const contacts = await getContacts();
    return NextResponse.json({ 
      success: true, 
      data: contacts 
    });
  } catch (error: any) {
    console.error('Turso GET error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch contacts' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Rate limit: 5 requests per minute per IP
    if (!rateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Terlalu banyak permintaan. Coba lagi dalam 1 menit.' 
        },
        { status: 429 }
      );
    }

    if (!initialized) {
      await initDB();
      initialized = true;
    }

    const { name, email, message, website } = await request.json();

    // Honeypot check - if website field is filled, it's a bot
    if (website) {
      // Silently reject but return success to fool bots
      return NextResponse.json({ 
        success: true, 
        data: { id: 0, name, email, message, created_at: new Date().toISOString() }
      });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, email, and message are required' 
        },
        { status: 400 }
      );
    }

    const newContact = await addContact(name, email, message);

    // Send Telegram notification
    await notifyContact({ name, email, message });

    return NextResponse.json({ 
      success: true, 
      data: newContact
    });
  } catch (error: any) {
    console.error('Turso POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to add contact' 
      },
      { status: 500 }
    );
  }
}
