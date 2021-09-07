const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuarios = mongoose.model('Usuario', new Schema(
    {
        userName : String,
        password: String,
        salt: String,
        role: {type: String, default: 'usuario'}
    }))

    module.exports = Usuarios