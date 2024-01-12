-- Insertion des utilisateurs
INSERT INTO users (id, last_name, first_name, username, email, password, role, contact_information, professional_id, created_at, updated_at)
VALUES
('1', 'Doe', 'John', 'john_doe', 'john.doe@example.com', 'hashed_password_1', 'Applicant', '{"phone": "123-456-7890", "address": "123 Main St"}', 'PRO123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('2', 'Smith', 'Jane', 'jane_smith', 'jane.smith@example.com', 'hashed_password_2', 'Lawyer', '{"phone": "987-654-3210", "address": "456 Oak St"}', 'PRO456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('3', 'Johnson', 'Robert', 'robert_j', 'robert.j@example.com', 'hashed_password_3', 'Judge', '{"phone": "555-123-4567", "address": "789 Pine St"}', 'PRO789', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('4', 'Brown', 'Emily', 'emily_b', 'emily.b@example.com', 'hashed_password_4', 'Defendant', '{"phone": "333-555-7777", "address": "987 Elm St"}', 'PRO987', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('5', 'Garcia', 'Carlos', 'carlos_g', 'carlos.g@example.com', 'hashed_password_5', 'Expert Witness', '{"phone": "111-222-3333", "address": "654 Birch St"}', 'PRO654', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('6', 'Clark', 'Megan', 'megan_c', 'megan.c@example.com', 'hashed_password_6', 'Electronic Judicial Officer', '{"phone": "888-999-0000", "address": "321 Cedar St"}', 'PRO321', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('7', 'Anderson', 'David', 'david_a', 'david.a@example.com', 'hashed_password_7', 'Online Dispute Resolution (ODR) Actor', '{"phone": "444-666-8888", "address": "234 Maple St"}', 'PRO234', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('8', 'White', 'Laura', 'laura_w', 'laura.w@example.com', 'hashed_password_8', 'Technician/Administrator of the Digital Court', '{"phone": "777-888-9999", "address": "876 Walnut St"}', 'PRO876', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('9', 'Lee', 'Christopher', 'chris_l', 'chris.l@example.com', 'hashed_password_9', 'Electronic Clerk', '{"phone": "222-333-4444", "address": "567 Pine St"}', 'PRO567', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('10', 'Baker', 'Jennifer', 'jennifer_b', 'jennifer.b@example.com', 'hashed_password_10', 'Interested Third Party', '{"phone": "999-111-2222", "address": "765 Oak St"}', 'PRO765', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
