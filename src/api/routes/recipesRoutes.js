const express = require('express');
const validationJWT = require('../auth/validationJWT');
const recipesController = require('../../controllers/recipesController');

const router = express.Router();

router.post('/', validationJWT, recipesController.create);

router.get('/', recipesController.getAllRecipes);

router.get('/:id', recipesController.getRecipeById);

module.exports = router;
