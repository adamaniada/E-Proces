// // database/config.js
// require('dotenv').config();
// const mysql = require('mysql2');

// const poolConfig = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'mydatabase',
//     waitForConnections: true,
//     connectionLimit: 10, // Set the maximum number of connections in the pool
//     queueLimit: 0, // No limit on the number of waiting connections
//     idleTimeout: 60000,
// });

// // const poolConfig = {
// //     client: process.env.DB_HOST, // Assurez-vous d'utiliser le bon client ici (mysql, postgres, etc.)
// //     // client: 'mysql2',
// //     connection: {
// //         host: process.env.DB_HOST,
// //         user: process.env.DB_USER,
// //         password: process.env.DB_PASSWORD,
// //         database: process.env.DB_DATABASE,
// //     },
// //     migrations: {
// //         tableName: 'knex_migrations',
// //         directory: './migrations',
// //     },
// //     seeds: {
// //         directory: './seeds',
// //     },
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     maxIdle: 10,
// //     idleTimeout: 60000,
// //     queueLimit: 0,
// //     enableKeepAlive: true,
// //     keepAliveInitialDelay: 0,
// // };

// const pool = mysql.createPool(poolConfig).promise();

// module.exports = pool;
