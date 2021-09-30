const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  req.getConnection((error, con) => {
    if (error) res.send(error.code);
    const { id } = req.params;
    sql = `SELECT   e.evt_fec, 
                    cet.cet_nombre,
                    ces.ces_nombre, 
                    cpr.cpr_nombre,
                    clo.clo_nombre 
      FROM eventos e 
      INNER JOIN cat_evt_tipos as cet ON e.evt_tipo = cet.cet_id
      INNER JOIN cat_evt_estado as ces ON e.evt_estado = ces.ces_id
      INNER JOIN cat_provincias as cpr ON e.evt_prov = cpr.cpr_id
      INNER JOIN cat_localidades as clo ON e.evt_loc = clo.clo_id
      WHERE evt_id =${id}`;
    con.query(sql, (errorq, result) => {
      if (errorq) {
        res.sendStatus(400);
      } else {
        result?.lenght < 1 ? res.json(result) : res.send("No hay resultados");
      }
    });
  });
});

router.get("/", (req, res) => {
  req.getConnection((error, con) => {
    if (error) res.send(error);
    sql =
      "SELECT * FROM eventos e INNER JOIN cat_evt_tipos as cet ON e.evt_tipo = cet.cet_id INNER JOIN cat_localidades as clo ON e.evt_loc = clo.clo_id";
    con.query(sql, (errorq, results) => {
      if (errorq) {
        res.sendStatus(400);
      } else {
        results ? res.json(results) : res.sendStatus(204);
      }
    });
  });
});

router.post("/", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    sql = `INSERT INTO eventos(evt_tipo, evt_fec, evt_prov, evt_loc, estado) 
            VALUES (${req.body.tipo}, '${req.body.fecha}', ${req.body.prov}, ${req.body.loc}, ${req.body.estado})`;
    con.query(sql, (err, result) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(result);
      }
    });
  });
});

router.put("/:id", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    const { id } = req.params;
    console.log(req.params);
    sql = `UPDATE eventos SET evt_tipo = ${req.body.tipo}, evt_fec = ${req.body.fecha}, evt_prov = ${req.body.prov}
            evt_loc = ${req.body.loc}, estado = ${req.body.estado} WHERE evt_id = ${id}`;
    con.query(sql, (err, result) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  });
});

router.delete("/:id", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    const { id } = req.params;
    sql = `DELETE FROM eventos WHERE ${id}`;
    con.query(sql, (err, result) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  });
});
module.exports = router;

/*
router.get("/", (req, res) => {
  Eventos.find()
    .exec()
    .then((x) => res.status(200).send(x));
});

router.get("/:id", (req, res) => {
  Eventos.findById(req.params.id, (err, evento) => {
    Piloto.populate(evento, { path: "pilotosInc" }, (err, eventos) =>
      res.status(200).send(eventos)
    );
  })
    .exec()
    .then((x) => res.status(200).send(x));
});

router.post("/", (req, res) => {
  console.log(req.body);
  try {
    Eventos.create(req.body).then((x) => res.status(201).send(x));
  } catch (error) {
    res.sendStatus(500).send(error);
  }
});

router.put("/:id", (req, res) => {
  Eventos.findOneAndUpdate(req.params.id, req.body).then(() =>
    res.sendStatus(204)
  );
});

router.delete("/:id", (req, res) => {
  Eventos.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});*/
