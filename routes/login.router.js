const express = require("express")
const router = express.Router()

const loginController = require("../controllers/login.controller")

router.get('/', loginController.renderLoginPage )
router.post('/', loginController.handleLogin)

module.exports = router
