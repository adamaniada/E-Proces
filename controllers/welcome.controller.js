// welcomeController.js

const welcomeController = {
    index: (req, res) => {
        res.render('index', {
            currentPage: 'index',
            siteTitle: process.env.SITE_TITLE || 'e-proces',
        });
    },
};

module.exports = welcomeController;
