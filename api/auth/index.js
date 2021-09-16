const jwt = require('jsonwebtoken')
const Usuarios = require('../models/Usuarios')

const isAuth = (req, res, next) =>
{
    const token = req.headers.authorization
    if(!token)
    {
        return res.sendStatus(403)
    }
    jwt.verify(token, 'orJuanPablo@2021', (err, decoded) =>
    {
        const { _id } = decoded
        Usuarios.findOne({ _id }).exec()
         .then(usuario => 
            {
                req.usuario = usuario
                next()
            })
    })
}
const hasRoles = roles => (req, res, next) => 
{
    if(roles.indexOf(req.usuario.role) > -1)
    {
        return next()
    }
    res.sendStatus(403)
}
module.exports = {isAuth}