const express = require('express')
const Accidentes = require('../models/Accidentes')



const router = express.Router()

router.get('/', (req,res) => {
    Accidentes.find()
     .exec()
     .then(x => res.status(200).send(x))
})

router.get('/:id', (req,res) => {
    Accidentes.findById(req.params.id)
     .exec()
     .then(x => res.status(200).send(x))
})

router.post('/', (req,res) => {
    Accidentes.create(req.body).then(x => res.status(201).send(x))
})

router.put('/:id', (req,res) => {
    Accidentes.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req,res) => {
    Accidentes.findOneAndDelete(req.params.id).exec()
    .then(() => res.sendStatus(204))
})
module.exports = router