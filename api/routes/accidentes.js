const express = require("express");

const router = express.Router();

router.get('/:id', (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    const { id } = req.params;
    sql = `SELECT   e.evt_fec, 
                    cet.cet_nombre,
                    ces.ces_nombre, 
                    cpr.cpr_nombre,
                    clo.clo_nombre 
      FROM eventos e 
      INNER JOIN cat_evt_tipos as cet ON e.evt_tipo = cet.cet_id
      INNER JOIN cat_evt_estado as ces ON e.estado = ces.ces_id
      INNER JOIN cat_provincias as cpr ON e.evt_prov = cpr.cpr_id
      INNER JOIN cat_localidades as clo ON e.evt_loc = clo.clo_id
      WHERE evt_id =${id}`;
    con.query(sql, (errorq, result) => {
      if (errorq) console.error(errorq);
      result
        ? res.json(result)
        : res.send("No hay resultados");
    });
  });
});

router.get("/", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    sql =
      "SELECT * FROM eventos e INNER JOIN cat_evt_tipos as cet ON e.evt_tipo = cet.cet_id";
    con.query(sql, (errorq, results) => {
      if (errorq) console.error(errorq);
      console.log(results)
      results 
        ? res.json(results)
        : res.sendStatus(204);
    });
  });
});


router.post("/", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error( error);
    sql = `INSERT INTO eventos(evt_tipo, evt_fec, evt_prov, evt_loc, estado) 
            VALUES (${req.body.tipo}, '${req.body.fecha}', ${req.body.prov}, ${req.body.loc}, ${req.body.estado})`;
    con.query(sql, (err, result) => {
      if (err) console.error( err);
      res.json(result);
    });
  });
});

router.put("/:id", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error( error);
    const {id} = req.params
    console.log(req.params)
    sql = `UPDATE eventos SET evt_tipo = ${req.body.tipo}, evt_fec = ${req.body.fecha}, evt_prov = ${req.body.prov}
            evt_loc = ${req.body.loc}, estado = ${req.body.estado} WHERE evt_id = ${id}`;
    con.query(sql, (err, result) => {
      if (err) console.error( err);
      res.json(result);
    });
  });
})

router.delete("/:id", (req,res) => {
  req.getConnection((error, con) => {
    if(error) console.error( error)
    const {id} = req.params
    sql =  `DELETE FROM eventos WHERE ${id}`;
    con.query(sql, (err, result) => {
      if(err) console.error( err )
      res.sendStatus(204)
    })   
  })
});
module.exports = router;
/*
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
})*/
