// pages/api/data.js

import mysql from 'mysql2';

export default async function handler(req, res) {
  // Set up the MySQL connection
  const connection = mysql.createConnection({
    host: 'your-database-host', // e.g., localhost or a cloud database
    user: 'your-database-user',
    password: 'your-database-password',
    database: 'moi',
  });

  try {
    // Connect to the database
    connection.connect();

    // Query to fetch data from a table (adjust table and column names accordingly)
    connection.query('SELECT * FROM your_table_name', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }

      // Send back the data to the client
      res.status(200).json({ data: results });
    });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  } finally {
    connection.end();
  }
}
