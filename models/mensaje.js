const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId, // existe en las coleccion de datos
        ref: 'Usuario',
        required: true,
    },
    para: {
        type: Schema.Types.ObjectId, // existe en las coleccion de datos
        ref: 'Usuario',
        required: true,
    },
    mensaje: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


// por defecto mongoose agrega una s al final de cada modelo creado 
// por eso solo se define el modelo como Mensaje 
// pero en la base de datos se creara el modelo Mensajes
module.exports = model('Mensaje', MensajeSchema);
