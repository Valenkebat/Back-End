const express = require("express");
const Contenedor = require("./clases");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

const productos = new Contenedor(__dirname + "/productos.txt");

app.set('views', './views/ejs')
app.set('views engine', 'ejs')

app.get('/', (req, res) => {
    let content = productos.getAll()
    return res.render('index.ejs', {content})
})

app.post("/productos", (req, res) => {
    productos.save(req.body)
    let content = productos.getAll()
    return res.render('productos.ejs', {content});
});

app.get("/productos", (req, res) => {
    let content = productos.getAll()
    return res.render('productos.ejs', {content});
});
// SERVER
const PORT = 8080
const server = app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
