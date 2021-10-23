const { isAuth } = require("../auth");
const express = require("express");
const router = express.Router();

router.get("/:id", isAuth, (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    const { id } = req.params;
    sql = `SELECT   i.*, 
                    p.pil_nombre,
                    p.pil_apellido,
                    p.pil_dni,
                    p.pil_fecNac
      FROM inscripciones i 
      INNER JOIN pilotos AS p ON i.ins_pil = p.pil_id
      WHERE i.ins_evt =${id}`;
    con.query(sql, (errorq, results) => {
      if (errorq) {
        console.error(errorq);
        res.send(400);
      } else {
        const inscriptos = [];
        results?.forEach((piloto) => {
          const inscripto = {
            id: piloto["pil_id"],
            nombre: piloto["pil_nombre"],
            apellido: piloto["pil_apellido"],
            dni: piloto["pil_dni"],
            fecNac : piloto["pil_fecNac"]
          };
          inscriptos.push(inscripto);
        });
        res.send(inscriptos);
      }
    });
  });
});

router.get("/", isAuth, (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    sql =
      "SELECT * FROM eventos e INNER JOIN cat_evt_tipos as cet ON e.evt_tipo = cet.cet_id";
    con.query(sql, (errorq, results) => {
      if (errorq) console.error(errorq);
      console.log(results);
      results ? res.json(results) : res.sendStatus(204);
    });
  });
});

router.post("/", isAuth, (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    sql = `INSERT INTO inscripciones(ins_evt, ins_pil, ins_us) 
            VALUES (${req.body.ins_evt}, '${req.body.ins_pil}', ${req.usuario.id})`;
    con.query(sql, (err, result) => {
      if (err) console.error(err);
      res.json(result);
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
      if (err) console.error(err);
      res.json(result);
    });
  });
});

router.delete("/:id", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    const { id } = req.params;
    sql = `DELETE FROM eventos WHERE ${id}`;
    con.query(sql, (err, result) => {
      if (err) console.error(err);
      res.sendStatus(204);
    });
  });
});
module.exports = router;
