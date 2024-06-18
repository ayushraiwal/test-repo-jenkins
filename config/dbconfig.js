import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
  host: process.env.LDB_HOST,
  user: process.env.LDB_USER,
  password: process.env.LDB_PASSWORD,
  database: process.env.LDB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

const db = {
  query: async (sql, params) => {
    const [results] = await pool.execute(sql, params);
    return results;
  }
};

export default db;