const { Router } = require('express')
const Pilotos = require('../models/Pilotos')
const {isAuth} = require('../auth/index')



const router = Router()

router.get('/',isAuth,(req,res) => {
    Pilotos.find()
     .exec()
     .then(x => res.status(200).send(x))
})

router.get('/:id', (req,res) => {
    Pilotos.findById(req.params.id)
     .exec()
     .then(x => res.status(200).send(x))
})

router.post('/', isAuth, (req,res) => {
    Pilotos.create(req.body).then(x => res.status(201).send(x))
})

router.put('/:id', isAuth, (req,res) => {
    Pilotos.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', isAuth, (req,res) => {
    Pilotos.findOneAndDelete(req.params.id).exec()
    .then(() => res.sendStatus(204))
})
module.exports = router