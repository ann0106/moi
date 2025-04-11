// app/api/images/route.js

import connection from '../../../lib/db';

export async function GET() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM images', (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(new Response(JSON.stringify(results), { status: 200 }));
    });
  });
}
