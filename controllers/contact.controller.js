require('dotenv').config();

const contactController = {
  renderContactPage: (req, res) => {
    res.render('contact', {
      currentPage: 'contact',
      pageTitle: 'Contactez-nous', 
      siteTitle: process.env.SITE_TITLE || 'E-Proces',
    });
  },
  handleContact: (req, res) => {
    // Récupérez les données du formulaire depuis req.body
    const { name } = req.body;

    // Vous pouvez ici traiter les données comme l'envoi d'un e-mail, les enregistrer dans une base de données, etc.

    // Redirigez l'utilisateur vers une page de confirmation avec un message de succès dans l'URL
    res.redirect('/contact?success=true&name=' + encodeURIComponent(name));
  },
};

module.exports = contactController;
