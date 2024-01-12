// controllers/callController.js
const dotenv = require('dotenv');

dotenv.config();

const privacyController = {
    getPrivacyPage: (req, res) => {
        res.render('privacy', {
            currentPage: 'privacy',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },
};

module.exports = privacyController;
