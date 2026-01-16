import { NextRequest, NextResponse } from "next/server";
import { getContacts, addContact, initDB } from "@/lib/turso";
import { notifyContact } from "@/lib/telegram";

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
    if (!initialized) {
      await initDB();
      initialized = true;
    }

    const { name, email, message } = await request.json();

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
