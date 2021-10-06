const jwt = require("jsonwebtoken");
const Usuarios = require("../models/Usuarios");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(403);
  }
  jwt.verify(token, "mi@secreto", (err, decoded) => {
    if (err) {
      console.error(err);
      res.sendStatus(403);
    }
    const { _id } = decoded;
    req.getConnection((error, conn) => {
      if (error) console.error(error);
      conn.query(
        `SELECT * FROM usuarios WHERE us_id = ${_id}`,
        (error, result) => {
          if (error) {
            console.error(error);
            res.sendStatus(403);
          }
          if (result[0]) {
            const usuario = {
              id : _id,
              username: result[0].us_username,
              nombre: result[0].us_nombre,
              apellido: result[0].us_apellido,
              rol: result[0].us_rol,
            };
            req.usuario = usuario;
            console.log(req.usuario.username);
            next();
          } else {
            console.log(result)
            res.sendStatus(403);
          }
        }
      );
    });
  });
};
const hasRoles = (roles) => (req, res, next) => {
  if (roles.indexOf(req.usuario.role) > -1) {
    return next();
  }
  res.sendStatus(403);
};
module.exports = { isAuth };
