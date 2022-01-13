const jwt = require('jsonwebtoken');

const { validationResult } = require("express-validator");

const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    console.log(token);

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    } 

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        // se agrega al req
        req.uid = uid;
    
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}



module.exports = {
    validarJWT
}