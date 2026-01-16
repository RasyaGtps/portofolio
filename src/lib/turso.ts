import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// Initialize tables
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
  
  await client.execute(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT,
      country TEXT,
      city TEXT,
      device TEXT,
      browser TEXT,
      page TEXT,
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

export interface Visitor {
  id: number;
  ip: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  page: string;
  created_at: string;
}

export async function getContacts(): Promise<Contact[]> {
  const result = await client.execute('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10');
  return result.rows as unknown as Contact[];
}

export async function getContactsPaginated(page: number = 1, limit: number = 5): Promise<{ contacts: Contact[]; total: number; totalPages: number }> {
  const offset = (page - 1) * limit;
  
  const countResult = await client.execute('SELECT COUNT(*) as total FROM contacts');
  const total = (countResult.rows[0] as any).total;
  const totalPages = Math.ceil(total / limit);
  
  const result = await client.execute({
    sql: 'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?',
    args: [limit, offset]
  });
  
  return {
    contacts: result.rows as unknown as Contact[],
    total,
    totalPages
  };
}

export async function addContact(name: string, email: string, message: string): Promise<Contact> {
  const result = await client.execute({
    sql: 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?) RETURNING *',
    args: [name, email, message]
  });
  return result.rows[0] as unknown as Contact;
}

export async function addVisitor(data: {
  ip: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  page: string;
}): Promise<void> {
  await client.execute({
    sql: 'INSERT INTO visitors (ip, country, city, device, browser, page) VALUES (?, ?, ?, ?, ?, ?)',
    args: [data.ip, data.country, data.city, data.device, data.browser, data.page]
  });
}

export async function getVisitorStats(period: 'daily' | 'weekly' | 'monthly' | 'all') {
  let dateFilter = '';
  
  if (period === 'daily') {
    dateFilter = "WHERE created_at >= datetime('now', '-1 day')";
  } else if (period === 'weekly') {
    dateFilter = "WHERE created_at >= datetime('now', '-7 days')";
  } else if (period === 'monthly') {
    dateFilter = "WHERE created_at >= datetime('now', '-30 days')";
  }

  const totalResult = await client.execute(`SELECT COUNT(*) as total FROM visitors ${dateFilter}`);
  const total = (totalResult.rows[0] as any).total;

  const uniqueResult = await client.execute(`SELECT COUNT(DISTINCT ip) as unique_visitors FROM visitors ${dateFilter}`);
  const uniqueVisitors = (uniqueResult.rows[0] as any).unique_visitors;

  const deviceResult = await client.execute(`
    SELECT device, COUNT(*) as count FROM visitors ${dateFilter} 
    GROUP BY device ORDER BY count DESC
  `);

  const browserResult = await client.execute(`
    SELECT browser, COUNT(*) as count FROM visitors ${dateFilter}
    GROUP BY browser ORDER BY count DESC
  `);

  const countryResult = await client.execute(`
    SELECT country, COUNT(*) as count FROM visitors ${dateFilter}
    GROUP BY country ORDER BY count DESC LIMIT 5
  `);

  return {
    total,
    uniqueVisitors,
    devices: deviceResult.rows as unknown as { device: string; count: number }[],
    browsers: browserResult.rows as unknown as { browser: string; count: number }[],
    topCountries: countryResult.rows as unknown as { country: string; count: number }[]
  };
}

export default client;
