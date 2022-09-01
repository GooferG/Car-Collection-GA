const express = require('express');
const router = express.Router();
const carsCtrl = require('../controllers/cars');
// Require the auth middleware
const isLoggedIn = require('../config/auth');

router.get('/', carsCtrl.index);
router.get('/new', carsCtrl.new);
router.get('/:id', carsCtrl.show);
router.post('/', isLoggedIn, carsCtrl.create);

router.get('/:id/edit', carsCtrl.edit)
router.put('/:id', carsCtrl.update)

module.exports = router;
