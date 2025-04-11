import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'moi',
  });

  try {
    const [rows] = await connection.execute('SELECT * FROM homepage_content');
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await connection.end();
  }
}
