const express = require('express')
const Provincias = require('../models/Provincias')


const router = express.Router()

router.get('/',(req,res)=>{
    req.getConnection((error, con) => {
        if (error) console.error(error);
        sql = "SELECT * FROM cat_provincias";
        con.query(sql, (errorq, results) => {
          if (errorq) console.error(errorq);
          results ? res.json(results) : res.send("No hay resultados");
        });
      });
})

// router.get('/', (req,res) => {
//     Provincias.find()
//      .exec()
//      .then(x => res.status(200).send(x))
// })

// router.get('/:id', (req,res) => {
//     Provincias.findById(req.params.id)
//      .exec()
//      .then(x => res.status(200).send(x))
// })

// router.post('/', (req,res) => {
//     Provincias.create(req.body)
//      .then(x => res.status(201).send(x))
// })

// router.put('/:id', (req,res) => {
//     Provincias.findOneAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(204))
// })

// router.delete('/:id', (req,res) => {
//     Provincias.findOneAndDelete(req.params.id).exec()
//     .then(() => res.sendStatus(204))
// })
module.exports = router
