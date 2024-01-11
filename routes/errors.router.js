const express = require("express");
const router = express.Router();

const errorsController = require("../controllers/errors.controller");

// Routes pour les erreurs 404, 500, 403, 401, 502, 503, 504, etc.
router.use(errorsController.getErrors404Page);
router.use(errorsController.getErrors403Page);
router.use(errorsController.getErrors401Page);
router.use(errorsController.getErrors500Page);
router.use(errorsController.getErrors502Page);
router.use(errorsController.getErrors503Page);
router.use(errorsController.getErrors504Page);


module.exports = router;
