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
            table.enu('role', [
                'Applicant', 
                'Defendant', 
                'Judge', 
                'Lawyer', 
                'Expert Witness', 
                'Electronic Judicial Officer', 
                'Online Dispute Resolution (ODR) Actor', 
                'Technician/Administrator of the Digital Court', 
                'Electronic Clerk', 
                'Interested Third Party'
            ]).notNullable();
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
            table.enu('status', [
                'En Attente', 
                'Plainte Déposée', 
                'Réponse du Défendeur Attendue', 
                'Médiation en Cours', 
                'Audience Programmée', 
                'Décision en Attente', 
                'Appel en Cours', 
                'Appel en Attente de Décision', 
                'Terminé - Décision Finale', 
                'Clôturé - Sans Suite'
            ]).defaultTo('En Attente');
            table.string('file_number', 255).notNullable().unique();
            table.string('dispute_type', 255).nullable();
            table.text('details').nullable();
            table.dateTime('closure_date').nullable();
            table.text('final_decision').nullable();
            addTimestamps(table);
        })
        .createTable(TABLE_NAMES.PAYMENTS, function (table) {
            table.string('id', 36).primary();
            table.string('user_id', 36).references('id').inTable(TABLE_NAMES.USERS).notNullable();
            table.string('amount', 50).notNullable();
            table.dateTime('payment_date').notNullable();
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
            table.string('document_type', 50).notNullable();
            // table.enu('document_type', [
            //     'Preuve', 
            //     'Plainte', 
            //     'Réponse', 
            //     'Mémoire Juridique', 
            //     'Référé', 
            //     'Ordonnance du Tribunal', 
            //     'Protocole d\'Accord', 
            //     'Appel', 
            //     'Rapport d\'Expertise', 
            //     'Convocation à l\'Audience', 
            //     'Compte Rendu d\'Audience', 
            //     'Accord de Médiation', 
            //     'Autre'
            // ]).notNullable();
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
            // table.enu('status', [
            //     'En Attente de Médiation',
            //     'Médiation en Cours',
            //     'Médiation Réussie',
            //     'Médiation Terminée - Aucun Accord',
            //     'Médiation Annulée',
            //     'Décision du Médiateur Attendue',
            //     'Appel de la Décision du Médiateur',
            //     'Médiation Terminée - Accord Approuvé par le Tribunal',
            //     'Médiation Infructueuse - Affaire Retourne au Tribunal',
            //     'Médiation en Attente de Confirmation des Parties',
            //     'Terminé',
            //     'Autre'
            // ]).notNullable();
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
            table.string('stappeal_reasonsatus', 70).notNullable();
            // table.enu('appeal_reasons', [
            //     'Erreur de droit', 
            //     'Erreur de fait', 
            //     'Interprétation incorrecte des preuves', 
            //     'Procédure irrégulière', 
            //     'Partialité du juge', 
            //     'Nouvelle preuve découverte', 
            //     'Sanction inappropriée', 
            //     'Excès de pouvoir du tribunal', 
            //     'Non-respect des règles de procédure', 
            //     'Décision arbitraire ou capricieuse', 
            //     'Interprétation incorrecte de la loi'
            // ]).nullable();
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
        })
        .then(() => {
            console.log('Tables created successfully');
        })
        .catch((error) => {
            console.error('Error creating tables:', error);
        })
        .finally(() => {
            knex.destroy();
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
