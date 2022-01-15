const {request, response} = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok:false,
            mensaje: 'No esta autenticado'
        })
    }

    try {

        const {uid, name} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        req.name = name
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            mensaje: 'Token no valido'
        })
    }

    next()

}

module.exports = {
    validarJWT
}