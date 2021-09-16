const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Localidades = mongoose.model('Localidad', new Schema(
    {
        name : String,
        prov : {type: Schema.Types.ObjectId, ref: 'Provincia'}
    }))

    module.exports = Localidades