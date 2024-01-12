const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Affiche le formulaire d'inscription
router.get('/register', AuthController.showRegisterForm);

// Gère la soumission du formulaire d'inscription
router.post('/register', AuthController.register);

// Affiche le formulaire de connexion
router.get('/login', AuthController.showLoginForm);

// Gère la soumission du formulaire de connexion
router.post('/login', AuthController.login);

// Déconnexion de l'utilisateur
router.get('/logout', AuthController.logout);

// Affiche le formulaire pour réinitialiser le mot de passe
router.get('/reset-password', AuthController.showResetPasswordForm);

// Gère la soumission du formulaire de réinitialisation du mot de passe
router.post('/reset-password', AuthController.resetPassword);

// Affiche le profil de l'utilisateur
router.get('/profile', AuthController.showProfile);

// Affiche le formulaire de changement de mot de passe
router.get('/change-password', AuthController.showChangePasswordForm);

// Gère la soumission du formulaire de changement de mot de passe
router.post('/change-password', AuthController.changePassword);

// Affiche le formulaire pour mettre à jour le profil
router.get('/update-profile', AuthController.showUpdateProfileForm);

// Gère la soumission du formulaire de mise à jour du profil
router.post('/update-profile', AuthController.updateProfile);

// Autres routes...

module.exports = router;
