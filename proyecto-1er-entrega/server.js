const cartRouter = require('./routers/cartRouter')
const productRouter = require('./routers/productRouter')
const express = require("express");


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 


app.use('/api', productRouter)
app.use('/api', cartRouter)

// SERVER
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))