const express = require('express')
const routerContenedor = require('./routers')

const PORT = 8080
const app = express()
app.use(express.static('public')) 
app.use(express.urlencoded({extended:true}))

// Carga de Routers

app.use('/api', routerContenedor)

// Levantar Server

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))