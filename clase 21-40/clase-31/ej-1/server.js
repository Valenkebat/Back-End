const express = require('express')
const compression = require('compression')

const app = express()

const mensaje = 'Hola que tal'
const mensajeLargo = mensaje.repeat(1000)

app.get('/saludo', (req,res) => {
    res.semd(mensajeLargo)
})

app.get('/saludozip', compression(), (req,res) => {
    res.send(mensajeLargo)
})

const PORT = 8080 
app.listen(PORT, () => {
    console.log('server listening on port 8080')
})