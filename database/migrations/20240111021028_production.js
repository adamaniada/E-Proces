const TABLE_NAMES = {
    USERS: 'users',
    CASES: 'cases',
    PAYMENTS: 'payments',
    DOCUMENTS: 'documents',
    MEDIATIONS: 'mediations',
    AUDIENCES: 'audiences',
    DECISIONS: 'decisions',
    APPEALS: 'appeals',
    HEARINGS: 'hearings',
    JUDGMENTS: 'judgments',
    PARTICIPANTS: 'participants',
    CONTRACTS: 'contracts',
};

function addTimestamps(table) {
    table.timestamps(true, true);
}

exports.up = function (knex) {
    return knex.schema
        .createTable(TABLE_NAMES.USERS, function (table) {
            table.string('id', 36).primary();
            table.string('last_name', 255).notNullable();
            table.string('first_name', 255).notNullable();
            table.string('username', 150).notNullable().unique();
            table.string('email', 255).notNullable().unique();
            table.text('password').notNullable(); // hashed password
            table.string('role', 50).notNullable();
            table.json('contact_information');
            table.string('professional_id', 255).nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.CASES, function (table) {
            table.string('id', 36).primary();
            table.string('judge_id', 36).references('id').inTable(TABLE_NAMES.USERS).nullable();
            table.string('plaintiff_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('defendant_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('case_number', 20).notNullable().unique();
            table.string('status', 50).defaultTo('pending');
            table.string('file_number', 255).notNullable().unique();
            table.string('dispute_type', 255).nullable();
            table.text('details').nullable();
            table.dateTime('creation_date').notNullable();
            table.dateTime('closure_date').nullable();
            table.text('final_decision').nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.PAYMENTS, function (table) {
            table.string('id', 36).primary();
            table.string('user_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('amount', 50).notNullable();
            table.dateTime('payment_date').notNullable();
            // Add other payment-specific information columns
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.CONTRACTS, function (table) {
            table.string('id', 36).primary();
            table.string('user_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('contract_type', 255).notNullable();
            table.dateTime('start_date').notNullable();
            table.dateTime('end_date').nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.DOCUMENTS, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.string('document_id', 36).references('id').inTable('cases').notNullable();
            table.string('title', 255).notNullable();
            table.string('document_type', 50).nullable();
            table.text('document_content').nullable();
            table.string('author_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('path', 255).notNullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.MEDIATIONS, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.dateTime('start_date').notNullable();
            table.dateTime('end_date').nullable();
            table.string('status', 50).nullable();
            table.string('mediator_id', 36).references('id').inTable(TABLE_NAMES.USERS).nullable();
            table.text('mediation_notes').nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.AUDIENCES, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.dateTime('start_datetime').notNullable();
            table.dateTime('end_datetime').notNullable();
            table.json('participants').nullable(); // Assuming Participants is an array of user IDs
            table.text('session_summary').nullable();
            table.string('session_judge_id', 36).references('id').inTable(TABLE_NAMES.USERS).nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.DECISIONS, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.text('decision_text').notNullable();
            table.dateTime('decision_date').nullable();
            table.string('decision_judge_id', 36).references('id').inTable(TABLE_NAMES.USERS).nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.APPEALS, function (table) {
            table.string('id', 36).primary();
            table.string('case_id', 36).references('id').inTable(TABLE_NAMES.CASES).notNullable();
            table.text('appeal_reasons').nullable();
            table.text('final_appeal_decision').nullable();
            table.dateTime('appeal_date').nullable();
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
        .dropTableIfExists(TABLE_NAMES.APPEALS)
        .dropTableIfExists(TABLE_NAMES.DECISIONS)
        .dropTableIfExists(TABLE_NAMES.AUDIENCES)
        .dropTableIfExists(TABLE_NAMES.MEDIATIONS)
        .dropTableIfExists(TABLE_NAMES.DOCUMENTS)
        .dropTableIfExists(TABLE_NAMES.CONTRACTS)
        .dropTableIfExists(TABLE_NAMES.PAYMENTS)
        .dropTableIfExists(TABLE_NAMES.CASES)
        .dropTableIfExists(TABLE_NAMES.USERS);
};
