const express = require("express")
const router = express.Router()

const faqController = require("../controllers/faq.controller")

router.get('/', faqController.getFAQPage)

module.exports = router
