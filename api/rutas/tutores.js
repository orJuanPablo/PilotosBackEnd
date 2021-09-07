const express = require('express')
const Tutores = require('../modelos/Tutores')


const router = express.Router()

router.get('/', (req,res) => {
    Tutores.find()
     .exec()
     .then(x => res.status(200).send(x))
})

router.get('/:id', (req,res) => {
    Tutores.findById(req.params.id)
     .exec()
     .then(x => res.status(200).send(x))
})

router.post('/', (req,res) => {
    Tutores.create(req.body).then(x => res.status(201).send(x))
})

router.put('/:id', (req,res) => {
    Tutores.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req,res) => {
    Tutores.findOneAndDelete(req.params.id).exec()
    .then(() => res.sendStatus(204))
})
module.exports = router