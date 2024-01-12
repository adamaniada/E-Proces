// database/config.js
require('dotenv').config();
const mysql = require('mysql2');

const poolConfig = {
    client: process.env.DB_CONNECTION, // Assurez-vous d'utiliser le bon client ici (mysql2, mysql, postgres, etc.)
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 10,
        queueLimit: 0
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './database/migrations',
    },
    seeds: {
        directory: './database/seeds',
    },
};

const pool = mysql.createPool(poolConfig).promise();

module.exports = pool;
