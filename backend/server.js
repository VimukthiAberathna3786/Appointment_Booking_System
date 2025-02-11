// Load environment variables
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';


// Load .env file
dotenv.config();

// Database configuration from .env
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'booking_appointment_db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
};

// Test database connection
async function testDatabaseConnection() {
  let connection;
  try {
    // Log connection details (excluding password)
    console.log('Attempting to connect with:');
    console.log(`Host: ${dbConfig.host}`);
    console.log(`User: ${dbConfig.user}`);
    console.log(`Database: ${dbConfig.database}`);
    console.log(`Port: ${dbConfig.port}`);

    // Attempt to create a connection
    connection = await mysql.createConnection(dbConfig);
    
    // Run a simple query
    const [rows] = await connection.execute('SELECT NOW() as current_time');

    console.log('\n✅ Database Connection Successful!');
    console.log('Current Database Time:', rows[0].current_time);

    // Additional diagnostic queries
    const [dbVersion] = await connection.execute('SELECT VERSION() as mysql_version');
    console.log('MySQL Version:', dbVersion[0].mysql_version);
  } catch (err) {
    console.error('\n❌ Database Connection Failed');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    
    // Detailed error diagnosis
    if (err.code === 'ECONNREFUSED') {
      console.error('\n🔍 Connection Troubleshooting:');
      console.error('- Verify MySQL server is running');
      console.error('- Check host and port settings in .env');
      console.error('- Ensure MySQL service is started');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔍 Access Denied Troubleshooting:');
      console.error('- Verify username and password');
      console.error('- Check user permissions');
      console.error('- Ensure user has database access');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('\n🔍 Database Error:');
      console.error('- Specified database does not exist');
      console.error('- Create the database or check database name');
    }
  } finally {
    // Close the connection if it was established
    if (connection) {
      await connection.end();
    }
  }
}

// Run the connection test
testDatabaseConnection();
