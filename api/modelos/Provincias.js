const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Provincias = mongoose.model('Provincia', new Schema(
    {
        name: String,
    }))

    module.exports = Provincias