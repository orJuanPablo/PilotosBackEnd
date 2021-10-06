const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
//const Usuarios = require("../models/Usuarios");
const { isAuth } = require("../auth");

const router = express.Router();

const signToken = (_id) => {
  return jwt.sign({ _id }, "mi@secreto", {
    expiresIn: 60 * 60 * 24 * 365,
  });
};

router.post("/registro", (req, res) => {
  const { username, password, nombre, apellido } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    if (err) console.error(err);
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(password, newSalt, 256, 64, "sha1", (err, key) => {
      const encryptedPass = key.toString("base64");
      req.getConnection((error, con) => {
        if (error) console.error(error);
        con.query(
          `SELECT COUNT(*) AS i FROM usuarios WHERE us_username = '${username}'`,
          (error, result) => {
            if (error) console.error(error);
            if (result[0].i < 1) {
              con.query(
                `INSERT INTO usuarios SET us_username = ?, us_password = ?, us_nombre = ?, us_apellido = ?, us_salt = ?`,
                [username, encryptedPass, nombre, apellido, newSalt],
                (error, result) => {
                  if (error) console.error(error);
                  if (result.affectedRows == 1) {
                    res.send("Usuario creado con éxito");
                  }
                }
              );
            } else {
              res.send("El nombre de usuario ha sido tomado");
            }
          }
        );
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  req.getConnection((error, con) => {
    if (error) console.error(error);
    con.query(
      `SELECT * FROM usuarios WHERE us_username = '${userName}'`,
      (error, result) => {
        if (error) console.error(error);
        if (result == []) {
          res.send(false);
        } else {
          const salt = result[0].us_salt;
          crypto.pbkdf2(password, salt, 256, 64, "sha1", (err, key) => {
            if (err) console.error(error);
            const encryptedPass = key.toString("base64");
            if (result[0].us_password === encryptedPass) {
              const token = {token : signToken(result[0].us_id)};
              res.json(token);
            } else {
              res.send(false);
            }
          });
        }
      }
    );
  });
});

router.get("/me", isAuth, (req, res) => {
  req.usuario.password = "";
  req.usuario.salt = "";
  res.send(req.usuario);
});
module.exports = router;
