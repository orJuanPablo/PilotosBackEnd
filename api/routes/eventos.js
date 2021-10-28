const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  req.getConnection((error, con) => {
    if (error) res.send(error.code);
    const { id } = req.params;
    sql = `SELECT   e.*, 
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
      if (errorq) res.sendStatus("Bad Request");
      if (result[0]) {
        const evt = {
          id: id,
          fecha: result[0]["evt_fec"],
          tipo: result[0]["evt_tipo"],
          estado: result[0]["evt_estado"],
          prov: result[0]["evt_prov"],
          loc: result[0]["evt_loc"],
        };
        res.send(evt);
      }
    });
  });
});

router.get("/", (req, res) => {
  req.getConnection((error, con) => {
    if (error) res.send(error);
    sql = `SELECT  e.*, 
                   cet.cet_nombre,
                   ces.ces_nombre, 
                   cpr.cpr_nombre,
                   clo.clo_nombre  
      FROM eventos e 
      INNER JOIN cat_evt_tipos as cet ON e.evt_tipo = cet.cet_id
      INNER JOIN cat_evt_estado as ces ON e.evt_estado = ces.ces_id
      INNER JOIN cat_provincias as cpr ON e.evt_prov = cpr.cpr_id
      INNER JOIN cat_localidades as clo ON e.evt_loc = clo.clo_id
      WHERE evt_estado = 1`;
    con.query(sql, (errorq, results) => {
      if (errorq) {
        console.error(errorq);
        res.sendStatus(400);
      } else {
        if (results) {
          const eventos = [];
          results?.forEach((result) => {
            const evt = {
              id: result["evt_id"],
              fecha: result["evt_fec"],
              tipoId: result["evt_tipo"],
              pista: result["evt_pista_desc"],
              tipo: result["cet_nombre"],
              estado: result["evt_estado"],
              provId: result["evt_prov"],
              prov: result["cpr_nombre"],
              locId: result["evt_loc"],
              loc: result["clo_nombre"],
            };
            eventos.push(evt);
          });
          res.send(eventos);
        }
      }
    });
  });
});

router.post("/", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    sql = `INSERT INTO eventos(evt_tipo, evt_fec, evt_prov, evt_loc, estado, evt_pista_desc) 
            VALUES (${req.body.tipo}, '${req.body.fecha}', ${req.body.prov}, ${req.body.loc}, ${req.body.estado},${req.body.pista})`;
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
