// homeController.js

const homeController = {
    getHomePage: (req, res) => {
        res.render('home', {
            currentPage: 'home',
            siteTitle: process.env.SITE_TITLE || 'e-proces',
        });
    },
};

module.exports = homeController;
