const express = require("express");
const { check } =require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require("../controller/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");
const router = express.Router()

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene un formato correcto').isEmail(),
    check('password', 'El pass debe tener mas de 5 caracteres').isLength({min: 6}),
    validarCampos
], crearUsuario)

router.post('/', [
    check('email', 'El email no tiene un formato correcto').isEmail(),
    check('password', 'El pass debe tener mas de 5 caracteres').isLength({min: 6}),
    validarCampos
], loginUsuario)

router.get('/renew', [
    validarJWT
], revalidarToken)

module.exports = router;