const {request, response} = require("express")
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuarios/Usuario")
const { generarJWT } = require("../helpers/jwt")

const crearUsuario = async(req = request, res = response) => {

    const { email, password } = req.body
    
    try {

        let usuario = await Usuario.findOne({ email })

        if(usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: "El correo ya existe"
            }) 
        }

        usuario = new Usuario(req.body)

        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)
    
        await usuario.save()

        const token = await generarJWT(usuario.id, usuario.name)
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: "Habla al admin perro"
        })        
    }
}

const loginUsuario = async (req = request, res = response) => {

    const {email, password} = req.body

    try {

        const usuario = await Usuario.findOne({ email })

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: "Datos incorrectos"
            }) 
        }

        const validPass = bcrypt.compareSync(password, usuario.password)

        if (!validPass) {
            return res.status(400).json({
                ok: false,
                mensaje: "Datos incorrectos"
            }) 
        }

        const token = await generarJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: "Habla al admin perro"
        }) 
    }
}

const revalidarToken = async(req = request, res = response) => {
    
    const { uid, name } = req

    const token = await generarJWT(uid, name)

    res.status(200).json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}