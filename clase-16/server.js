const express = require("express");
const handlebars = require('express-handlebars');

const routerProductos = require('./routers/routerProductos');

require('./container/mysql/DBscript').DBscript()
require('./container/sqlite/DBscript').DBscript()

const Contenedor = require('./container/container')
const optionsSqlite = require('./container/sqlite/config')
const optionsMysql = require('./container/mysql/config')

const productos = new Contenedor(optionsMysql.optionsMysql,'productos')
const mensajes = new Contenedor(optionsSqlite.optionsSqlite,'mensajes')


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

app.use("/", routerProductos)

/* sockets */
io.on("connection", async (socket) => {  
  console.log('sssss',await mensajes.getAll())
  socket.emit("messages", mensajes.getAll());
  productos.save({title: "producto1", price: "100", thumbnail: "fasf" })
  socket.emit("productos", productos.getAll());
  console.log( productos.getAll())

  socket.on("new-product", async (data) => {
    productos.save(data)
    io.sockets.emit("productos", productos.getAll());
  });

  socket.on("new-message", async (data) => {
    mensajes.save(data)
    io.sockets.emit("messages", mensajes.getAll());
  });
});



// SERVER
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${httpServer.address().port}`)
})
httpServer.on('error', error => console.log(`Error en servidor ${error}`))
