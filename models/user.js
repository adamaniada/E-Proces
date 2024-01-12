// models/user.js
const knex = require('../config/database');

module.exports = {
    createUser: async (user) => {
        try {
            await knex('users').insert(user);
            console.log('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    getUserById: async (userId) => {
        try {
            const user = await knex('users').where({ id: userId }).first();
            return user;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw error;
        }
    },

    updateUser: async (userId, updatedData) => {
        try {
            await knex('users').where({ id: userId }).update(updatedData);
            console.log('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            await knex('users').where({ id: userId }).del();
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    getAllUsers: async () => {
        try {
            const users = await knex('users');
            return users;
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    },

    getUserByUsername: async (username) => {
        try {
            const user = await knex('users').where({ username }).first();
            return user;
        } catch (error) {
            console.error('Error getting user by username:', error);
            throw error;
        }
    },
    
    getUserByEmail: async (email) => {
        try {
            const user = await knex('users').where({ email }).first();
            return user;
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw error;
        }
    },
};
