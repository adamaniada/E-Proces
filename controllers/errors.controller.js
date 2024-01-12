const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const errorsController = {
    getErrors404Page: (req, res) => {
        res.status(404).render('errors/404', {
            currentPage: '404',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    getErrors403Page: (req, res) => {
        res.status(403).render('errors/403', {
            currentPage: '403',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    getErrors401Page: (req, res) => {
        res.status(401).render('errors/401', {
            currentPage: '401',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    getErrors500Page: (req, res) => {
        res.status(500).render('errors/500', {
            currentPage: '500',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    getErrors502Page: (req, res) => {
        res.status(502).render('errors/502', {
            currentPage: '502',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    getErrors503Page: (req, res) => {
        res.status(503).render('errors/503', {
            currentPage: '503',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },

    getErrors504Page: (req, res) => {
        res.status(504).render('errors/504', {
            currentPage: '504',
            siteTitle: process.env.SITE_TITLE || 'E-Proces',
        });
    },
};

module.exports = errorsController;
