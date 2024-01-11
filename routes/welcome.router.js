// controllers/welcomeController.js
const express = require("express")
const router = express.Router()

const welcomeController = require("../controllers/welcome.controller")

router.get('/', welcomeController.index)

module.exports = router
