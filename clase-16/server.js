const express = require("express");
const handlebars = require('express-handlebars');

require('./container/mysql/DBscript').DBscript()
require('./container/sqlite/DBscript').DBscript()

const Contenedor = require('./container/container')

const optionsSqlite = require('./container/sqlite/config')
const optionsMysql = require('./container/mysql/config')

const mensajes = new Contenedor(optionsSqlite.optionsSqlite,'mensajes')
const productos = new Contenedor(optionsMysql.optionsMysql,'productos')

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const PORT = 8080
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      defaultLayout: 'main.hbs',
      partialsDir: __dirname + "/views/partials",
    })
  );
app.set("views", "./views");
app.set("views engine", "hbs");
  
app.get("/", (req, res) => {
  return res.render("layouts/main.hbs");
});

/* sockets */
io.on("connection", (socket) => {
  const mensajesList = mensajes.getAll()
  const productosList = productos.getAll()
  
  socket.emit("messages", mensajesList);
  socket.emit("productos", productosList);

  socket.on("new-product", (data) => {
    productos.save(data)
    io.sockets.emit("productos", productosList);
  });

  socket.on("new-message", (data) => {
    mensajes.save(data)
    io.sockets.emit("messages", mensajesList);
  });
});


// SERVER
httpServer.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${httpServer.address().port}`)
})
httpServer.on('error', error => console.log(`Error en servidor ${error}`))
