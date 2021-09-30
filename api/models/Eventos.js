const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Eventos = mongoose.model('Eventos', new Schema(
    {
        desc: String,
        prov: { type: Schema.Types.ObjectId, ref: 'Provincia'},
        loc: { type: Schema.Types.ObjectId, ref: 'Localidad'},
        fec: Date,
        pilotosInsc: [ { type: Schema.Types.ObjectId, ref: 'Piloto' } ],
        estado: Number
    }))

    module.exports = Eventos