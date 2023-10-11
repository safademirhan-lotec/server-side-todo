const { Pool } = require('pg');

// Test configs
// const pool = new Pool({
//   user: 'postgres',
//   password: 'admin',
//   host: 'localhost',
//   database: 'todo_app',
//   port: 5432,
// });

// Deployment configs
const pool = new Pool({
  user: 'postgres',
  password: 'QoaSrJmqFBYA7qvQG3P1',
  host: 'database-safa.co5qpleyensq.eu-north-1.rds.amazonaws.com',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
