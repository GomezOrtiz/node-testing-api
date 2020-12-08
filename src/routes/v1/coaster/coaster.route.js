const express = require('express');
const validate = require('../../../middlewares/validate');
const coasterValidation = require('../../../validations/coaster/coaster.validation');
const coasterController = require('../../../controllers/coaster/coaster.controller');

const router = express.Router();

router.route('/').get(coasterController.getAllCoasters).post(coasterController.createCoaster);
router.get('/name/:name', validate(coasterValidation.getCoasterByName), coasterController.getCoasterByName);
router
  .route('/:id')
  .get(validate(coasterValidation.getCoasterById), coasterController.getCoasterById)
  .patch(validate(coasterValidation.updateCoaster), coasterController.updateCoaster)
  .delete(validate(coasterValidation.deleteCoaster), coasterController.deleteCoaster);

module.exports = router;
