// config/database.js
const knex = require('knex');
const dotenv = require('dotenv'); // Optional, for loading environment variables from a .env file

dotenv.config(); // Load environment variables if using a .env file

const commonConfig = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USERNAME || 'your_database_username',
        password: process.env.DB_PASSWORD || 'your_database_password',
        database: process.env.DB_NAME || 'your_database_name',
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: __dirname + '/database/migrations',
    },
    seeds: {
        directory: __dirname + '/database/seeds'
    },
    debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
    pool: {
        min: 2,
        max: 10,
    },
};

const config = {
    development: {
        ...commonConfig,
        // Development-specific configurations go here
    },
    production: {
        ...commonConfig,
        // Production-specific configurations go here
    },
    testing: {
        ...commonConfig,
        connection: {
        host: process.env.TEST_DB_HOST || 'localhost',
        user: process.env.TEST_DB_USER || 'test_user',
        password: process.env.TEST_DB_PASSWORD || 'test_password',
        database: process.env.TEST_DB_NAME || 'test_database',
        },
        // Testing-specific configurations go here
    },
};

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

module.exports = db;
