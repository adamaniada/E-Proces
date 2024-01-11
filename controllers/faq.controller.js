const dotenv = require('dotenv');

dotenv.config();

const faqController = {
    getFAQPage: (req, res) => {
        res.render('faq', {
            currentPage: 'faq',
            siteTitle: process.env.SITE_TITLE || 'e-proces',
        });
    },
};

module.exports = faqController;
