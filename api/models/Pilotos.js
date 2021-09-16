const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Pilotos = mongoose.model('Piloto', new Schema(
    {
        name: String,
        lastName: String,
        dni: Number,
        prov: { type: Schema.Types.ObjectId, ref: 'Provincia'},
        loc: { type: Schema.Types.ObjectId, ref: 'Localidad'},
        domicilio: String,
        fecNac: Date,
        email: String,
        telefono: String,
        tutor: {type: Schema.Types.ObjectId, ref: 'Tutor' }
    }))

    module.exports = Pilotos