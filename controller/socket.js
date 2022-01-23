const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');


const usuarioConectado = (uid = '') => {
    return usuarioEstado(uid, true);
}

const usuarioDesconectado = (uid = '') => {
    return usuarioEstado(uid);
}

const usuarioEstado = async ( uid = '', estado = false) => {
    const usuario = await Usuario.findById(uid);
    
    usuario.online = estado;
    await usuario.save();

    return usuario;
}

const grabarMensaje = async (payload) => {
    /*
        payload = {
            de: '',
            para: '',
            mensaje: '',
        }
    */
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();
        return true;
    } catch (error) {
        return false;
    }
}



module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}









