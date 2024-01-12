const bcrypt = require('bcrypt'); // pour le hachage des mots de passe
const UserModel = require('../models/User'); // Assurez-vous d'importer votre modèle d'utilisateur approprié
require('dotenv').config();

const AuthController = {
    // Affiche le formulaire d'inscription
    showRegisterForm: (req, res) => {
        res.render('auth/register', {
            currentPage: 'register',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    // Gère la soumission du formulaire d'inscription
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Crée un nouvel utilisateur dans la base de données
            const newUser = await UserModel.create({
                username,
                email,
                password: hashedPassword,
            });
    
            // Connecte automatiquement l'utilisateur après l'inscription (vous pouvez ajuster cela selon vos besoins)
            req.session.user = newUser;
        
            res.redirect('/dashboard'); // Redirige vers la page du tableau de bord ou toute autre page appropriée après l'inscription
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'inscription');
        }
    },

    // Affiche le formulaire de connexion
    showLoginForm: (req, res) => {
        res.render('auth/login', {
            currentPage: 'login',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    // Gère la soumission du formulaire de connexion
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Recherche de l'utilisateur dans la base de données
            const user = await UserModel.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                // Connecte l'utilisateur après une connexion réussie (vous pouvez ajuster cela selon vos besoins)
                req.session.user = user;

                res.redirect('/dashboard'); // Redirige vers la page du tableau de bord ou toute autre page appropriée après la connexion
            } else {
                res.render('auth/login', { errorMessage: 'Identifiants incorrects' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la connexion');
        }
    },

    // Déconnexion de l'utilisateur
    logout: (req, res) => {
            req.session.destroy(() => {
            res.redirect('/');
        });
    },

    // Affiche le formulaire pour réinitialiser le mot de passe
    showResetPasswordForm: (req, res) => {
            res.render('auth/reset-password', {
            currentPage: 'reset-password',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    // Gère la soumission du formulaire de réinitialisation du mot de passe
    resetPassword: async (req, res) => {
        // Logique de réinitialisation du mot de passe ici
        res.send('Logique de réinitialisation du mot de passe');
    },

    showProfile: (req, res) => {
        // Assurez-vous que l'utilisateur est connecté avant d'accéder à son profil
        if (req.session.user) {
            res.render('auth/profile', { user: req.session.user });
        } else {
            res.redirect('/login');
        }
    },

    // Affiche le formulaire de changement de mot de passe
    showChangePasswordForm: (req, res) => {
        // Assurez-vous que l'utilisateur est connecté avant d'afficher le formulaire
        if (req.session.user) {
            res.render('auth/change-password');
        } else {
            res.redirect('/login');
        }
    },

    // Gère la soumission du formulaire de changement de mot de passe
    changePassword: async (req, res) => {
        // Logique de changement de mot de passe ici
        res.send('Logique de changement de mot de passe');
    },

    // Affiche le formulaire pour mettre à jour le profil
    showUpdateProfileForm: (req, res) => {
        // Assurez-vous que l'utilisateur est connecté avant d'afficher le formulaire
        if (req.session.user) {
            res.render('auth/update-profile', { user: req.session.user });
        } else {
            res.redirect('/login');
        }
    },

    // Gère la soumission du formulaire de mise à jour du profil
    updateProfile: async (req, res) => {
        // Logique de mise à jour du profil ici
        res.send('Logique de mise à jour du profil');
    },
}

module.exports = AuthController;
