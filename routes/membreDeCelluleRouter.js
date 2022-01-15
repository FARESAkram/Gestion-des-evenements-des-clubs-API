const express = require('express')
const router = express.Router({mergeParams: true})
const membreDeCelluleValidator = require('../validators/membreDeCelluleValidator')
const membreDeCelluleContoller = require('../controllers/membreDeCelluleController')

router.route('/')
    .get(membreDeCelluleValidator.getAllMembreDeCellule,membreDeCelluleContoller.getAllMembreDeCellule)
    .post(membreDeCelluleValidator.addMembreDeCellule,membreDeCelluleContoller.addMembreDeCellule)

router.route('/:id')
    .delete(membreDeCelluleValidator.deleteMembreDeCellule,membreDeCelluleContoller.deleteMembreDeCellule)

module.exports = router