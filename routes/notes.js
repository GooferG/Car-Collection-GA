const express = require('express');
const router = express.Router();

const noteCtrl = require('../controllers/notes');

// http://localhost:3000/cars/123/notes
router.post("/cars/:id/notes", noteCtrl.create);

// http://localhost:3000/notes/123
router.delete('/notes/:id', noteCtrl.delete);

module.exports = router;