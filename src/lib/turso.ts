import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// Initialize table
export async function initDB() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export async function getContacts(): Promise<Contact[]> {
  const result = await client.execute('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10');
  return result.rows as unknown as Contact[];
}

export async function addContact(name: string, email: string, message: string): Promise<Contact> {
  const result = await client.execute({
    sql: 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?) RETURNING *',
    args: [name, email, message]
  });
  return result.rows[0] as unknown as Contact;
}

export default client;
