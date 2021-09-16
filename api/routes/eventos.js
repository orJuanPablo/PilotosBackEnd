const express = require('express')
const Eventos = require('../models/Eventos')



const router = express.Router()

router.get('/', (req,res) => {
    Eventos.find()
     .exec()
     .then(x => res.status(200).send(x))
})

router.get('/:id', (req,res) => {
    Eventos.findById(req.params.id)
     .exec()
     .then(x => res.status(200).send(x))
})

router.post('/', (req,res) => {
    Eventos.create(req.body).then(x => res.status(201).send(x))
})

router.put('/:id', (req,res) => {
    Eventos.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req,res) => {
    Eventos.findOneAndDelete(req.params.id).exec()
    .then(() => res.sendStatus(204))
})
module.exports = router