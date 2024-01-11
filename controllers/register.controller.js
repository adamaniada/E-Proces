const path = require('path');
const pool = require("../database/config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000;

const loginController = {
    renderRegisterPage : (req, res) => {
        res.render('register', {
            currentPage: 'register',
            siteTitle: process.env.SITE_TITLE || 'e-proces',
        });
    },
    handleRegister : (req, res) => {
        // Vous devez ajouter ici la logique de gestion d'utilisateurs réelle
        const { username, email, password } = req.body;
      
        // Exemple simple : affichage des informations soumises
        res.send(`Inscription réussie ! Nom d'utilisateur : ${username}, Email : ${email}`);
    },
};

module.exports = loginController;
