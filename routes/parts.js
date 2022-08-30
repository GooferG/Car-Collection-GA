const express = require('express');
const router = express.Router();
const partsCtrl = require('../controllers/parts');

router.get('/parts/new', partsCtrl.new);
router.post('/parts', partsCtrl.create);

// http://localhost:3000/cars/6305155d63b7f5eefbf7b696/parts
router.post('/cars/:id/parts', partsCtrl.addtoParts);

module.exports = router;