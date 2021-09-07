const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Usuarios = require('../modelos/Usuarios')
const {isAuth} = require('../auth/')

const router = express.Router()

const signToken = (_id) => 
{
    return jwt.sign({ _id }, 'orJuanPablo@2021',
    {
        expiresIn: 60*60*24*365,
    })
}

router.post('/registro', (req, res) => 
{
    console.log(req.body)
    const { userName, password } = req.body
    crypto.randomBytes(16, (err, salt) => 
    {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 256, 64, 'sha1', (err, key) =>
        {
            const encryptedPass = key.toString('base64')
            Usuarios.findOne({ userName }).exec()
             .then(usuario => {
                 if(usuario)
                 {
                     return res.send('el nombre de usuario ya ha sido tomado')
                 }
                 Usuarios.create(
                     {
                         userName,
                         password: encryptedPass,
                         salt: newSalt
                     })
                       .then(()=>
                     {
                         res.send('Usuario creado con éxito')
                     } )
             })
        })
    })
})

router.post('/login', (req,res) => 
{
    console.log(req.body)
    const {userName, password} = req.body
    Usuarios.findOne({userName}).exec()
     .then(usuario => 
        {
            if(!usuario)
            {
                return res.send('usuario y/o contraseña incorrectos')
            }
            console.log(usuario)
            crypto.pbkdf2(password, usuario.salt, 256, 64, 'sha1', (err, key) => 
            {
               const encryptedPass = key.toString('base64')
               if(usuario.password === encryptedPass)
               {
                    const token = signToken(usuario._id)
                    return res.send({ token })
               }
               res.send('usuario y/o contraseña incorrectos')
            })
        })
})

router.get('/me', isAuth, (req,res) =>
{
    res.send(req.body.usuario)
})
module.exports = router
