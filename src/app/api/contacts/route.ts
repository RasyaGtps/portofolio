import { NextRequest, NextResponse } from "next/server";

// Dummy data untuk gimmick
const dummyMessages = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@email.com",
    message: "Portfolio yang keren! Suka banget sama desainnya.",
    created_at: "2025-12-10T10:30:00Z"
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti.n@email.com",
    message: "Wah, skill-nya lengkap banget. Semangat terus ya!",
    created_at: "2025-12-08T14:20:00Z"
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi.s@email.com",
    message: "Tertarik untuk kolaborasi project. Boleh connect?",
    created_at: "2025-12-05T09:15:00Z"
  }
];

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: dummyMessages 
  });
}

export async function POST(request: NextRequest) {
  try {
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

    // Return dummy response (tidak disimpan ke mana-mana)
    const newContact = {
      id: Date.now(),
      name,
      email,
      message,
      created_at: new Date().toISOString()
    };

    return NextResponse.json({ 
      success: true, 
      data: newContact
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process message' 
      },
      { status: 500 }
    );
  }
}
