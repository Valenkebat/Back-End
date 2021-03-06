import express from "express";
import CartRouter from "./routers/CartRouter.js";
import ProductRouter from "./routers/ProductRouter.js";


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

app.use('/product', new ProductRouter())
app.use('/cart', new CartRouter())


// SERVER
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))