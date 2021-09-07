const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Accidentes = mongoose.model('Accidente', new Schema(
    {
        fec: Date,
        piloto: { type: Schema.Types.ObjectId, ref: 'Piloto' },
        evento: { type: Schema.Types.ObjectId, ref: 'Evento' },
        lesion: String,
        diagnostico: String,
        asistencia: String,
        medicamentos: String    
    }))

    module.exports = Accidentes