// migrate.js
const path = require('path');
const knex = require('knex');
// const config = require('./database/config');
const config = require('./knexfile');

const db = knex(config);

// Exécute les migrations
db.migrate.latest()
  .then(() => {
    console.log('Migrations exécutées avec succès');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Erreur lors de l\'exécution des migrations:', err);
    process.exit(1);
  });
