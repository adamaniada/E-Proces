const TABLE_NAMES = {
    USERS: 'users',
    CASES: 'cases',
    DOCUMENTS: 'documents',
    HEARINGS: 'hearings',
    JUDGMENTS: 'judgments',
    PARTICIPANTS: 'participants',
};

function addTimestamps(table) {
    table.timestamps(true, true);
}

exports.up = function (knex) {
    return knex.schema
        .createTable(TABLE_NAMES.USERS, function (table) {
            table.string('id', 36).primary();
            table.string('username', 150).notNullable().unique();
            table.string('email', 150).notNullable().unique();
            table.text('password').notNullable();
            table.string('accountType', 40).nullable();
            table.text('token').nullable();
            table.string('role', 40).nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.CASES, function (table) {
            table.string('id', 36).primary();
            table.string('judge_id', 36).references('id').inTable(TABLE_NAMES.USERS).nullable();
            table.string('plaintiff_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('defendant_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('caseNumber', 20).notNullable().unique();
            table.string('status', 50).defaultTo('pending');
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.DOCUMENTS, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.string('title', 255).notNullable();
            table.string('path', 255).notNullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.HEARINGS, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.dateTime('datetime').notNullable();
            table.string('location', 255).notNullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.JUDGMENTS, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.text('summary').nullable();
            table.text('decision').nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.PARTICIPANTS, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.string('user_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('role', 50).notNullable();
            addTimestamps(table);
        });
};
  
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists(TABLE_NAMES.PARTICIPANTS)
        .dropTableIfExists(TABLE_NAMES.JUDGMENTS)
        .dropTableIfExists(TABLE_NAMES.HEARINGS)
        .dropTableIfExists(TABLE_NAMES.DOCUMENTS)
        .dropTableIfExists(TABLE_NAMES.CASES)
        .dropTableIfExists(TABLE_NAMES.USERS);
};
