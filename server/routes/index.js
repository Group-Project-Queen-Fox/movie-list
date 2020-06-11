const router = require('express').Router();
const MovieApiController = require('../controllers/MovieApiController');

router.get('/movie', MovieApiController.get);

module.exports = router;
