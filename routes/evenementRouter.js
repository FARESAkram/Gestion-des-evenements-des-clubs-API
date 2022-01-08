const express = require('express')
const router = express.Router()
const evenementValidator = require('../validators/evenementValidator')
const evenementContoller = require('../controllers/evenementController')

router.route('/')
    .get(evenementValidator.getAllEvenement,evenementContoller.getAllEvenement)
    .post(evenementValidator.addEvenement,evenementContoller.addEvenement)

router.route('/:id')
    .get(evenementValidator.getEvenement,evenementContoller.getEvenement)
    .delete(evenementValidator.deleteEvenement,evenementContoller.deleteEvenement)
    .put(evenementValidator.updateEvenement,evenementContoller.updateEvenement)

module.exports = router;