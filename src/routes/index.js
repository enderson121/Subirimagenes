const {Router} = require('express');
const router = Router();

const IndexController = require('../controllers/index');

//importamos el metodo de isLoggedIn que me va a permitir preguntar por una session si ya esta iniciada
const {isLoggedIn,isNotLoggedIn } =  require('../controllers/auth'); 

//renderizamos las vistas cuando se llama por URL
router.get('/', IndexController.index);

router.get('/subir/:id', isLoggedIn, IndexController.subir);

//DE ESTA FORMA TAMBIEN SE PUEDE TRABAjar EL passport para dar manejo 
router.post('/signin', isNotLoggedIn, IndexController.postlogueo);


module.exports = router;