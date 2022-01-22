const express = require('express')
const router = express.Router({mergeParams: true})
const MembreDEvenementController = require('../controllers/membreDEvenementController');
const MembreDEvenementValidator = require('../validators/membreDEvenementValidator');


router.route('/')
      .get(MembreDEvenementValidator.getAllMembreDEvenement,MembreDEvenementController.getAllMembreDEvenement)

router.route('/:id_user/evenements/:id_evenement')  
      .post(MembreDEvenementValidator.addMembreDEvenement,MembreDEvenementController.addMembreDEvenement)

router.route('/:id')
      .delete(MembreDEvenementValidator.deleteMembreDEvenemnt,MembreDEvenementController.deleteMembreDEvenement)

module.exports = router; 