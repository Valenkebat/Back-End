const express = require("express");
const Contenedor = require("./clases");
const handlebars = require('express-handlebars');

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const PORT = 8080
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

const productos = new Contenedor(__dirname + "/data/productos.txt");

const messages = new Contenedor(__dirname + "/data/mensajes.txt");


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
  socket.emit("messages", messages.getAll());
  socket.emit("productos", productos.getAll());

  socket.on("new-product", (data) => {
    productos.save(data)
    io.sockets.emit("productos", productos.getAll());
  });

  socket.on("new-message", (data) => {
    data.time = new Date().toLocaleString();
    messages.save(data)
    io.sockets.emit("messages", messages.getAll());
  });
});


// SERVER
httpServer.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${httpServer.address().port}`)
})
httpServer.on('error', error => console.log(`Error en servidor ${error}`))




