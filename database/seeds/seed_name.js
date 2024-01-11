// seeds/seed_name.js
const faker = require('faker');


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      const fakeData = [];
      for (let i = 0; i < 10; i++) { // Adjust the loop for the number of entries you want
        fakeData.push({
          column1: faker.name.firstName(),
          column2: faker.internet.email(),
          // Add more columns and faker methods as needed
        });
      }
      return knex('table_name').insert(fakeData);
    });
};

// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('table_name').del()
//   await knex('table_name').insert([
//     {id: 1, colName: 'rowValue1'},
//     {id: 2, colName: 'rowValue2'},
//     {id: 3, colName: 'rowValue3'}
//   ]);
// };
