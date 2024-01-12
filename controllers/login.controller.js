const path = require('path');
// const pool = require("../database/config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000;

const loginController = {
    renderLoginPage : (req, res) => {
        res.render('login', {
            currentPage: 'login',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },
    handleLogin : (req, res) => {
        // Vous devez ajouter ici la logique d'authentification réelle
        const { username, password } = req.body;
      
        // Exemple simple : vérification si le nom d'utilisateur et le mot de passe sont corrects
        if (username === 'utilisateur' && password === 'motdepasse') {
          // Authentification réussie (dans une application réelle, vous devriez utiliser une stratégie plus sécurisée)
          res.send('Authentification réussie!');
        } else {
          // Authentification échouée
          res.send('Authentification échouée. Vérifiez vos identifiants.');
        }
    },
    submitLoginData: async (req, res) => {
        try {
            const { phoneNumber, password } = req.body;
    
            if (!phoneNumber || !password) {
                return res.status(400).send("Both phone number and password are required");
            }
    
            // Use the LIMIT 1 clause in the SQL query since you're checking for a unique user
            const [users, fields] = await pool.query("SELECT * FROM users WHERE phoneNumber = ? LIMIT 1", [phoneNumber]);
    
            if (users.length > 0) {
                const user = users[0]; // Since you're using LIMIT 1, directly access the first user
    
                if (await bcrypt.compare(password, user.password)) {
                    const { id, user_type, role, created_at, updated_at } = user;
    
                    const token = jwt.sign({ id, phoneNumber, user_type, role, created_at, updated_at }, process.env.JWT_SECRET, {
                        algorithm: "HS256",
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
    
                    res.cookie("token", token, { maxAge: COOKIE_MAX_AGE });
                    console.log(`User is authenticated, phoneNumber: ${phoneNumber}`);
                    return res.status(200).json({ data: user });
                }
            }
    
            res.status(401).send("Invalid Credentials");
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }    
};

module.exports = loginController;
