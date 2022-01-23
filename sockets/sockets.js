const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controller/socket');

// mensajes de sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    // validando token
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    // verificando conexion
    if (!valido) { return client.disconnect(); }

    console.log('Cliente autenticado');
    usuarioConectado(uid);

    // ingresar al usuario a una sala especifica
    // sala global, client.id, uid
    client.join(uid);


    // escuchar del cliente el mensaje privado
    client.on('mensaje-personal', async (payload) => {
        // console.log(payload);
        // grabar mensaje en la base de datos

        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);

    });


    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });


    // client.on('mensaje', (payload) => {
    //     console.log('mensaje!!!!!', payload);
    //     io.emit('mensaje', {admin: 'saludando a todos'});
    // });





    
});
