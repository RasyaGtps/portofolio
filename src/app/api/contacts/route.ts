import { NextRequest, NextResponse } from "next/server";
// Pastikan path ke executeQuery benar. Sesuaikan jika letaknya berbeda.
// Contoh: '@/lib/db' atau '@/utils/db'
import { executeQuery, Contact } from "@/lib/mysql-server"; 

export async function GET() {
  try {
    const rows = await executeQuery<Contact[]>(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    
    if (!Array.isArray(rows)) {
      throw new Error('Invalid response format from database');
    }
    
    return NextResponse.json({ 
      success: true, 
      data: rows 
    });
  } catch (error: any) {
    console.error('MySQL GET error:', error);
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

    const result: any = await executeQuery(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    if (!result || typeof result.insertId !== 'number') {
      throw new Error('Failed to insert new contact');
    }

    const newContacts = await executeQuery<Contact[]>(
      'SELECT * FROM contacts WHERE id = ?',
      [result.insertId]
    );

    if (!Array.isArray(newContacts) || newContacts.length === 0) {
      throw new Error('Failed to retrieve newly added contact');
    }

    return NextResponse.json({ 
      success: true, 
      data: newContacts[0]
    });
  } catch (error: any) {
    console.error('MySQL POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to add contact' 
      },
      { status: 500 }
    );
  }
}