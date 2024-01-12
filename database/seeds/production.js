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

const bcrypt = require('bcrypt');
const faker = require('faker');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAMES.USERS).del();
  await knex(TABLE_NAMES.CASES).del();
  await knex(TABLE_NAMES.PAYMENTS).del();
  await knex(TABLE_NAMES.DOCUMENTS).del();
  await knex(TABLE_NAMES.MEDIATIONS).del();
  await knex(TABLE_NAMES.AUDIENCES).del();
  await knex(TABLE_NAMES.DECISIONS).del();
  await knex(TABLE_NAMES.APPEALS).del();

  // Seed data for the users table
  const users = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    last_name: faker.name.lastName(),
    first_name: faker.name.firstName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', 10),
    role: faker.random.arrayElement(['Applicant', 'Defendant', 'Judge', 'Lawyer', 'Expert Witness', 'Electronic Judicial Officer', 'Online Dispute Resolution (ODR) Actor', 'Technician/Administrator of the Digital Court', 'Electronic Clerk', 'Interested Third Party']),
    contact_information: {
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
    },
    professional_id: faker.random.alphaNumeric(6),
  }));

  await knex(TABLE_NAMES.USERS).insert(users);

  // Seed data for the cases table
  const cases = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    judge_id: faker.random.number({ min: 1, max: 10 }),
    plaintiff_id: faker.random.number({ min: 1, max: 10 }),
    defendant_id: faker.random.number({ min: 1, max: 10 }),
    case_number: faker.random.alphaNumeric(10),
    status: faker.random.arrayElement(['Pending', 'InProgress', 'Closed']),
    file_number: faker.random.alphaNumeric(8),
    dispute_type: faker.lorem.word(),
    details: faker.lorem.sentence(),
    closure_date: faker.date.future(),
    final_decision: faker.lorem.paragraph(),
  }));

  await knex(TABLE_NAMES.CASES).insert(cases);

  // Seed data for the payments table
  const payments = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    user_id: faker.random.number({ min: 1, max: 10 }),
    amount: faker.random.number({ min: 50, max: 5000 }).toFixed(2),
    payment_date: faker.date.past(),
  }));

  await knex(TABLE_NAMES.PAYMENTS).insert(payments);

  // Seed data for the documents table
  const documents = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    case_id: faker.random.number({ min: 1, max: 5 }),
    document_id: faker.random.number({ min: 1, max: 10 }),
    title: faker.lorem.words(),
    document_type: faker.random.arrayElement(['Preuve', 'Plainte', 'Réponse', 'Mémoire Juridique', 'Référé', 'Ordonnance du Tribunal', 'Protocole d\'Accord', 'Appel', 'Rapport d\'Expertise', 'Convocation à l\'Audience', 'Compte Rendu d\'Audience', 'Accord de Médiation', 'Autre']),
    document_content: faker.lorem.paragraph(),
    author_id: faker.random.number({ min: 1, max: 10 }),
    path: faker.system.filePath(),
  }));

  await knex(TABLE_NAMES.DOCUMENTS).insert(documents);

  // Seed data for the mediations table
  const mediations = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    case_id: faker.random.number({ min: 1, max: 5 }),
    start_date: faker.date.future(),
    end_date: faker.date.future(),
    status: faker.random.arrayElement(['Pending', 'InProgress', 'Successful', 'Terminated', 'Cancelled']),
    mediator_id: faker.random.number({ min: 1, max: 10 }),
    mediation_notes: faker.lorem.paragraph(),
  }));

  await knex(TABLE_NAMES.MEDIATIONS).insert(mediations);

  // Seed data for the audiences table
  const audiences = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    case_id: faker.random.number({ min: 1, max: 5 }),
    start_datetime: faker.date.future(),
    end_datetime: faker.date.future(),
    participants: [], // Assuming Participants is an array of user IDs
    session_summary: faker.lorem.paragraph(),
    session_judge_id: faker.random.number({ min: 1, max: 10 }),
  }));

  await knex(TABLE_NAMES.AUDIENCES).insert(audiences);

  // Seed data for the decisions table
  const decisions = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    case_id: faker.random.number({ min: 1, max: 5 }),
    decision_text: faker.lorem.paragraph(),
    decision_date: faker.date.past(),
    decision_judge_id: faker.random.number({ min: 1, max: 10 }),
  }));

  await knex(TABLE_NAMES.DECISIONS).insert(decisions);

  // Seed data for the appeals table
  const appeals = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    case_id: faker.random.number({ min: 1, max: 5 }),
    appeal_reasons: faker.lorem.paragraph(),
    final_appeal_decision: faker.lorem.paragraph(),
    appeal_date: faker.date.future(),
  }));

  await knex(TABLE_NAMES.APPEALS).insert(appeals);
};
