const { Pool } = require('pg');

const pool = new Pool({
    user: 'zernab',         // PostgreSQL username
    host: 'localhost',      // Database server
    database: 'histoviz',   // database name
    password: '',
    port: 5432,             // Default PostgreSQL port
});

module.exports = pool;
