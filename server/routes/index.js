const router = require('express').Router();
const authetication = require('../middlewares/authentication')
const MovieApiController = require('../controllers/MovieApiController');
const UserController = require('../controllers/UserController');

router.post('/login', UserController.login);
router.post('/oauth', UserController.googleSignIn);
router.post('/register', UserController.register);

router.use(authetication)
router.post('/movie', MovieApiController.get);
router.post('/trailer', MovieApiController.getUrl);
router.post('/cast', MovieApiController.cast);


module.exports = router;
