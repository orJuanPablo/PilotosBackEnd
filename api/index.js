const MONGO_URI="mongodb+srv://orJuanPablo-pil:VAWSFmmG%236zbu.%28@riojapilotscluster.ypkix.mongodb.net/RiojaPilotos-DB?retryWrites=true&w=majority"

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const accidentes = require('./rutas/accidentes')
const pilotos = require('./rutas/pilotos')
const eventos = require('./rutas/eventos')
const localidades = require('./rutas/localidades')
const provincias = require('./rutas/provincias')
const tutores = require('./rutas/tutores')
const auth = require('./rutas/auth')

const app = express()
/*------ Settings ------*/
app.set('port', process.env.PORT || 3000)
/*------ Middlewares ------*/ 
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
/*------ Base de Datos ------*/
mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
//----- Rutas ------
app.use('/api/auth', auth)
app.use('/api/accidentes', accidentes)
app.use('/api/pilotos', pilotos)
app.use('/api/eventos', eventos)
app.use('/api/localidades', localidades)
app.use('/api/provincias', provincias)
app.use('/api/tutores', tutores)

app.listen(3000, () => 
{
    console.log(`Server listen on port ${app.get('port')}`)
})

module.exports = app