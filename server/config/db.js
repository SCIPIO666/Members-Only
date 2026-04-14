const { Pool } = require('pg');

// Configuration
const pool = new Pool({
  user: 'postgres',
  host: 'local',
  database: 'members-only',
  password: process.env.DB_PASSWORD,
  port: 5432
});

module.exports=pool