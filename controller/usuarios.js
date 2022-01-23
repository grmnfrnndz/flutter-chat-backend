const { response } = require('express');
const Usuario = require('../models/usuario');


const getUsuarios = async (request, response = response) => {

    // console.log(request);

    // se agrega en la url mediante ?desde=12
    const desde = Number( request.query.desde ) || 0;


    const usuarios = await Usuario
        .find({ _id: { $ne: request.uid } })
        .sort('-online')
        .skip(desde)
        .limit(20)
        ;

    return response.json({
        ok: true,
        usuarios,
        desde
    });

}


module.exports = {
    getUsuarios
}

