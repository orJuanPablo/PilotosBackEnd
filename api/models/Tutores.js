const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tutores = mongoose.model('Tutor', new Schema(
    {
        name: String,
        lastName: String,
        dni: Number,
        prov: { type: Schema.Types.ObjectId, ref: 'Provincia'},
        loc: { type: Schema.Types.ObjectId, ref: 'Localidad'},
        domicilio: String,
        parentezco: String,
        email: String,
        telefono: String,
    }))

    module.exports = Tutores