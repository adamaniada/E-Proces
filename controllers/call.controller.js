// controllers/callController.js
const dotenv = require('dotenv');

dotenv.config();

const callController = {
    getCallPage: (req, res) => {
        res.render('call', {
            currentPage: 'call',
            siteTitle: process.env.SITE_TITLE || 'e-proces',
        });
    },

    processData: (req, res) => {
        // Récupérez les données envoyées depuis le corps de la requête
        const data = req.body;

        // Faites quelque chose avec les données, par exemple, loggez-les
        console.log('Received data:', data);

        // Répondez à la requête avec un message ou une redirection
        res.status(200).send('Data received successfully');
    },
};

module.exports = callController;
