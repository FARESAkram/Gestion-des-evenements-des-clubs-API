const express = require('express')
const router = express.Router()
const clubValidator = require('../validators/clubValidator')
const clubContoller = require('../controllers/clubController')

router.route('/')
      .get(clubValidator.getAllClub,clubContoller.getAllClub)
      .post(clubValidator.addClub,clubContoller.addClub)
      
router.route('/:id')
      .get(clubValidator.getClub,clubContoller.getClub)
      .delete(clubValidator.deleteClub,clubContoller.deleteClub)
      .put(clubValidator.updateClub,clubContoller.updateClub)

module.exports = router;