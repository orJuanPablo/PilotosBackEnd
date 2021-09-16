const express = require('express')
const Localidades = require('../models/Localidades')



const router = express.Router()

router.get('/', (req,res) => {
    Localidades.find()
     .exec()
     .then(x => res.status(200).send(x))
})

router.get('/:id', (req,res) => {
    Localidades.findById(req.params.id)
     .exec()
     .then(x => res.status(200).send(x))
})

router.post('/', (req,res) => {
    Localidades.create(req.body).then(x => res.status(201).send(x))
})

router.put('/:id', (req,res) => {
    Localidades.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req,res) => {
    Localidades.findOneAndDelete(req.params.id).exec()
    .then(() => res.sendStatus(204))
})
module.exports = router