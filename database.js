const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'QoaSrJmqFBYA7qvQG3P1',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
