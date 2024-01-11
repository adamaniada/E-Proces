const express = require("express")
const router = express.Router()

const callController = require("../controllers/call.controller")

router.get('/', callController.getCallPage)
router.post('/process-data', callController.processData)

module.exports = router
