const express = require("express");
const Contenedor = require("./clases");
const handlebars = require('express-handlebars');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

const productos = new Contenedor(__dirname + "/productos.txt");

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        partialsDir: __dirname + "/views/partials"
    })
)

app.set('views', './views')
app.set('views engine', 'hbs')

app.get('/', (req, res) => {
    let content = productos.getAll()
    return res.render('hbs/index.hbs', {content})
})

app.post("/productos", (req, res) => {
    productos.save(req.body)
    let content = productos.getAll()
    let boolean = content.length !==0
    return res.render('hbs/productos.hbs', {list: content, showList: boolean});
});

app.get("/productos", (req, res) => {
    let content = productos.getAll()
    let boolean = content.length !==0
    return res.render('hbs/productos.hbs', {
        list: content, showList: boolean});
});



// SERVER
const PORT = 8081
const server = app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))




