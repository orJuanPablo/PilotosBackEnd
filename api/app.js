const express = require("express");
const mongoose = require("mongoose");
const mySQL = require("mysql");
const myCon = require("express-myconnection");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const accidentes = require("./routes/accidentes");
const pilotos = require("./routes/pilotos");
const eventos = require("./routes/eventos");
const localidades = require("./routes/localidades");
const provincias = require("./routes/provincias");
const tutores = require("./routes/tutores");
const inscripciones = require("./routes/inscripciones");
const auth = require("./routes/auth");

const app = express();
/*------ Settings ------*/
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/*------ Middlewares ------*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
/*------ Base de Datos ------*/
//mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
app.use(
  myCon(
    mySQL,
    {
      host: process.env.hostDB || "localhost",
      user: process.env.userDB || "root",
      password: process.env.passDB || "",
      port: process.env.portDB|| 3306,
      database: process.env.nameDB||"comid-db",
      dateStrings: true,
    },
    "single"
  )
);
//----- Rutas ------
app.use("/api/auth", auth);
app.use("/api/accidentes", accidentes);
app.use("/api/pilotos", pilotos);
app.use("/api/eventos", eventos);
app.use("/api/localidades", localidades);
app.use("/api/provincias", provincias);
app.use("/api/tutores", tutores);
app.use("/api/inscripciones", inscripciones);

app.listen(app.get("port"), () => {
  console.log(`Server listen on port ${app.get("port")}`);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
module.exports = app;
