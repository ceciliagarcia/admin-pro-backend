const { Router } = require('express');


const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const { getBusqueda, getDocumentosColeccion } = require('../controllers/busquedas');

router.get('/:busqueda', validarJWT, getBusqueda);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);


module.exports = router;