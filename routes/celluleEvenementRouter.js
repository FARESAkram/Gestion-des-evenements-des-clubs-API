const express = require('express')
const router = express.Router({mergeParams: true})
const celluleEvenementValidator = require('../validators/celluleEvenementValidator')
const celluleEvenementContoller = require('../controllers/celluleEvenementController')

router.route('/')
    .get(celluleEvenementValidator.getAllCelluleEvenement,celluleEvenementContoller.getAllCelluleEvenement)
    .post(celluleEvenementValidator.addCelluleEvenement,celluleEvenementContoller.addCelluleEvenement)

router.route('/:id')
    .get(celluleEvenementValidator.getCelluleEvenement,celluleEvenementContoller.getCelluleEvenement)
    .put(celluleEvenementValidator.updateCelluleEvenement,celluleEvenementContoller.updateCelluleEvenement)
    .delete(celluleEvenementValidator.deleteCelluleEvenement,celluleEvenementContoller.deleteCelluleEvenement)

module.exports = router;