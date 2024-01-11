// controllers/callController.js
const dotenv = require('dotenv');

dotenv.config();

const callController = {
    getAboutPage: (req, res) => {
        res.render('about', {
            currentPage: 'about',
            siteTitle: process.env.SITE_TITLE || 'e-proces',
        });
    },
};

module.exports = callController;
