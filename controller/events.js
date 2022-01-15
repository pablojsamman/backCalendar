const {request, response} = require("express")
const Evento = require('../models/eventos/Evento')

const getEventos = async(req = request, res = response) => {
    
    try {
    
        const eventos = await Evento.find().populate('user', 'name')
        
        res.status(201).json({
            ok: true,
            eventos
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: "Habla al admin perro"
        })        
    }
}

const crearEvento = async (req = request, res = response) => {

    const evento = new Evento( req.body )

    try {

        evento.user = req.uid

        const eventoDb = await evento.save()

        res.status(200).json({
            ok: true,
            evento: eventoDb
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: "Habla al admin perro"
        }) 
    }
}

const actualizarEvento = async(req = request, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventoId)

        if( !evento ) {
            return res.status(400).json({
                ok: true,
                msj: "evento no existe para ese id"
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: true,
                msj: "no tiene privilegio de edicion"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} )

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: "Habla al admin perro"
        }) 
    }
}

const borrarEvento = async(req = request, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventoId)

        if( !evento ) {
            return res.status(400).json({
                ok: true,
                msj: "evento no existe para ese id"
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: true,
                msj: "no tiene privilegio de edicion"
            })
        }

        const eventoBorrado = await Evento.findByIdAndDelete( eventoId )

        res.status(200).json({
            ok: true,
            evento: eventoBorrado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mensaje: "Habla al admin perro"
        }) 
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}