// const UserModel = require('../models/User');
require('dotenv').config();

const welcomeController = {
    index: (req, res) => {
        res.render('index', {
            currentPage: 'index',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },
};

module.exports = welcomeController;
