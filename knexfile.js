// knexfile.js

require('dotenv').config();

/**
* @type { Object.<string, import("knex").Knex.Config> }
*/

module.exports = {
    production: {
        client: process.env.DB_CLIENT, // Assurez-vous d'utiliser le bon client ici (mysql2, mysql, postgres, etc.)
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        },
        useNullAsDefault: true,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + '/database/migrations',
        },
        seeds: {
            directory: __dirname + '/database/seeds'
        },
    }
}
