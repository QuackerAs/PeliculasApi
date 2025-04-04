const express = require('express');
const router = express.Router();
const generoController = require('../../client/controller/generoController');

// Rutas para géneros
router.get('/', generoController.getAll);
router.get('/:id', generoController.getById);

module.exports = router;