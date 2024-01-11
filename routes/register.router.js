const express = require("express")
const router = express.Router()

const registerController  = require("../controllers/register.controller")

router.get('/', registerController.renderRegisterPage )
router.post('/', registerController.handleRegister)

module.exports = router
