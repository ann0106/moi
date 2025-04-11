
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'moi',
  });

  try {
    const [rows] = await connection.execute('SELECT * FROM homepage_content'); // Adjust table name if needed
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error('Database fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  } finally {
    await connection.end();
  }
}
