const express = require('express')
const router = express.Router({mergeParams:true})
const evenementValidator = require('../validators/evenementValidator')
const evenementContoller = require('../controllers/evenementController')


router.route('/all')
    .get(evenementValidator.getAllEvenement,evenementContoller.getAllClubEvenement)
    
router.route('/')
    .get(evenementValidator.getAllEvenement,evenementContoller.getAllEvenement)
    .post(evenementValidator.addEvenement,evenementContoller.addEvenement)

router.route('/:id')
    .get(evenementValidator.getEvenement,evenementContoller.getEvenement)
    .put(evenementValidator.updateEvenement,evenementContoller.udpateEvenement)
    .delete(evenementValidator.deleteEvenement,evenementContoller.deleteEvenement)


module.exports = router;