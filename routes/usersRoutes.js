// routes/usersRoutes.js
const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Define routes
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.get('/', usersController.getAllUsers);
router.get('/username/:username', usersController.getUserByUsername);
router.get('/email/:email', usersController.getUserByEmail);

module.exports = router;
