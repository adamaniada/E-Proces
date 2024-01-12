// controllers/usersController.js
const userModel = require('../models/user');

module.exports = {
    createUser: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const newUser = { username, email, password };
            await userModel.createUser(newUser);
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserById: async (req, res) => {
        const userId = req.params.id;

        try {
            const user = await userModel.getUserById(userId);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateUser: async (req, res) => {
        const userId = req.params.id;
        const updatedData = req.body;

        try {
            await userModel.updateUser(userId, updatedData);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        const userId = req.params.id;

        try {
            await userModel.deleteUser(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error getting all users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserByUsername: async (req, res) => {
        const username = req.params.username;

        try {
            const user = await userModel.getUserByUsername(username);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error getting user by username:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserByEmail: async (req, res) => {
        const email = req.params.email;

        try {
            const user = await userModel.getUserByEmail(email);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error getting user by email:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
