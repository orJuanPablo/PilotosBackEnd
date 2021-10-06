const express = require("express");
const { isAuth } = require("../auth/index");

const router = express.Router();

router.get("/:id", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    const { id } = req.params;
    sql = `SELECT   p.pil_id,  
                    p.pil_nombre,
                    p.pil_apellido,
                    p.pil_dni,
                    p.pil_fecNac,
                    p.pil_tel,
                    p.pil_email,
                    p.pil_prov,
                    p.pil_loc,
                    p.pil_dom                 
      FROM pilotos AS p 
      INNER JOIN cat_provincias as cpr ON p.pil_prov = cpr.cpr_id
      INNER JOIN cat_localidades as clo ON p.pil_loc = clo.clo_id
      WHERE p.pil_id =${id}`;
    con.query(sql, (errorq, result) => {
      if (errorq) {
        res.sendStatus("Bad Request");
      } else {
        if (result[0]) {
          const piloto = {
            id: result[0]["pil_id"],
            nombre: result[0]["pil_nombre"],
            apellido: result[0]["pil_apellido"],
            dni: result[0]["pil_dni"],
            fecNac: result[0]["pil_fecNac"],
            tel: result[0]["pil_tel"],
            email: result[0]["pil_email"],
            prov: result[0]["pil_prov"],
            loc: result[0]["pil_loc"],
            dom: result[0]["pil_dom"],
          };
          res.send(piloto);
        } else {
          res.send("No hay resultados");
        }
      }
    });
  });
});

router.get("/", isAuth, (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    sql = "SELECT * FROM pilotos ;";
    con.query(sql, (errorq, results) => {
      if (errorq) {
        console.error(errorq);
      } else {
        const pilotos = [];
        results?.forEach((element) => {
          const piloto = {
            id: element["pil_id"],
            nombre: element["pil_nombre"],
            apellido: element["pil_apellido"],
            dni: element["pil_dni"],
            fecNac: element["pil_fecNac"],
            tel: element["pil_tel"],
            email: element["pil_email"],
            prov: element["pil_prov"],
            loc: element["pil_loc"],
            dom: element["pil_dom"],
          };
          pilotos.push(piloto);
        });
        res.json(pilotos);
      }
    });
  });
});

router.post("/", (req, res) => {
  req.getConnection((error, con) => {
    if (error) console.error(error);
    sql = `INSERT INTO pilotos
          (pil_nombre, pil_apellido, pil_dni, pil_fecNac, pil_tel, pil_email, pil_prov, pil_loc, pil_dom)
     VALUES
          ('${req.body.nombre}','${req.body.apellido}',${req.body.dni},'${req.body.fecNac}','${req.body.tel}','${req.body.email}',${req.body.prov},${req.body.loc},'${req.body.dom}')`;
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
    sql = `UPDATE pilotos SET
                    pil_nombre = '${req.body.nombre}',
                    pil_apellido = '${req.body.apellido}',
                    pil_dni = ${req.body.dni},
                    pil_fecNac = '${req.body.fecNac}',
                    pil_tel = '${req.body.tel}',
                    pil_email = '${req.body.email}',
                    pil_prov = ${req.body.prov},
                    pil_loc = ${req.body.loc},
                    pil_dom = '${req.body.dom}'
                WHERE
                    pil_id =${id}`;
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
    if (id > 0) {
      sql = `DELETE FROM pilotos WHERE pil_id = ${id}`;
      con.query(sql, (err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});
module.exports = router;
