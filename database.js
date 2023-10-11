const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Deployment configs
const pool = new Pool({
  user: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  database: process.env.db_database,
  port: process.env.db_port,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
