const { response } = require('express');
const Mensaje = require('../models/mensaje');


const obtenerChat = async (request, response = response) => {

    const miId = request.uid;
    const mensajeDe = request.params.de;


    const last30 = await Mensaje.find({
        $or: [{de: miId, para: mensajeDe}, {de: mensajeDe, para: miId}]
    })
    .sort({createdAt: 'desc'})
    .limit(30);


    return response.json({
        ok: true,
        mensajes: last30
    });

}


module.exports = {
    obtenerChat
}

