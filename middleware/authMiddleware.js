// authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Récupérez le jeton JWT depuis le cookie, l'en-tête ou tout autre emplacement
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    // Si aucun jeton n'est fourni, renvoyez une réponse non autorisée
    return res.status(401).send('Non autorisé');
  }

  try {
    // Vérifiez la validité du jeton
    const decoded = jwt.verify(token, 'votreSecret'); // Remplacez 'votreSecret' par votre clé secrète

    // Stockez les informations d'authentification dans la requête pour une utilisation ultérieure
    req.user = decoded;

    // Passez au middleware suivant
    next();
  } catch (error) {
    // En cas d'erreur de vérification du jeton, renvoyez une réponse non autorisée
    res.status(401).send('Non autorisé');
  }
}

module.exports = authMiddleware;
