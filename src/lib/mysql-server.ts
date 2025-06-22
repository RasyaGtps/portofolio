import mysql from 'mysql2/promise';

const createPool = () => {
  return mysql.createPool({
    // GANTI DENGAN ENVIRONMENT VARIABLES!
    host: process.env.DB_HOST,      
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,     
    port: parseInt(process.env.DB_PORT || '3306', 10), // Pastikan port di-parse sebagai integer
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    connectTimeout: 30000,
    acquireTimeout: 30000
  });
};

// Buat pool saat modul ini diimpor pertama kali
let pool = createPool();

// Interface untuk data kontak
export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string; // Akan diisi otomatis oleh MySQL
}

// Fungsi untuk menjalankan query
export async function executeQuery<T>(query: string, params: any[] = []): Promise<T> {
  let retries = 3;
  let lastError: any;

  while (retries > 0) {
    try {
      // Pastikan pool terhubung dan hidup
      // Tidak perlu getConnection().then().catch() di sini jika pool sudah dibuat.
      // Pool secara otomatis menangani koneksi saat execute dipanggil.
      // Hanya panggil pool.execute langsung.
      
      const [result] = await pool.execute(query, params);
      return result as T;

    } catch (error: any) {
      console.error(`Database error (retries left: ${retries}):`, error);
      lastError = error;
      retries--;
      
      // Jika error adalah masalah koneksi, coba re-create pool
      if (error.code === 'PROTOCOL_CONNECTION_LOST' || 
          error.code === 'ECONNREFUSED' || 
          error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR' ||
          error.code === 'ETIMEDOUT') { // Tambahkan ETIMEDOUT
        console.warn('Attempting to recreate database pool due to connection error.');
        pool = createPool(); // Recreate the pool
      }
      
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Tunggu sebelum mencoba lagi
        continue;
      }
    }
  }
  // Jika semua retry gagal, lemparkan error terakhir
  throw lastError || new Error('Max retries reached: Failed to execute database query.');
}