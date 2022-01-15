const {request, response} = require("express")
const { validationResult } = require('express-validator')

const validarCampos = (req = request, res = response, next) => {

    const errores = validationResult(req)
    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            erroores: errores.mapped()
        })
    }

    next()

}

module.exports = {
    validarCampos
}