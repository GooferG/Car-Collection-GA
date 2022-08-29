const express = require('express');
const router = express.Router();
const carsCtrl = require('../controllers/cars');
// Require the auth middleware
const isLoggedIn = require('../config/auth');

router.get('/', carsCtrl.index);
router.get('/new', carsCtrl.new);
router.get('/:id', carsCtrl.show);
router.post('/', isLoggedIn, carsCtrl.create);

module.exports = router;
