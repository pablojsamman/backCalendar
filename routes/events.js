const express = require("express");
const { check } =require('express-validator');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require("../controller/events");
const { isDate } = require("../helpers/isDate");

const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");
const router = express.Router()

router.use(validarJWT)

router.get('/', getEventos)

router.post('/', [
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'fecha inicio obligatoria').custom(isDate),
    check('end', 'fecha finalizacion obligatoria').custom(isDate),
    validarCampos
], crearEvento)

router.put('/:id', actualizarEvento)

router.delete('/:id', borrarEvento)

module.exports = router;