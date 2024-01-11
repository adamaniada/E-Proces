const express = require("express")
const router = express.Router()

const privacyController = require("../controllers/privacy.controller")

router.get('/', privacyController.getPrivacyPage)

module.exports = router
