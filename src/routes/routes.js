const express = require('express')
const router = express.Router()
const whatsappController = require('../controllers/whatsAppController')

router.get('/', whatsappController.verifyToken)
.post('/',whatsappController.receivedMessages)

module.exports = router

