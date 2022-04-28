const express = require('express')

const app = express()
const PORT = 8080

const frase = 'Hola mundo esta es una frase larga en express'

app.get('/api/frase', (req, res) => {
    res.send({frase: frase})
})

app.get('/api/letras/:num', (req, res) => {
    const num = parseInt(req.params.num)

    if (isNaN(num)){
        return res.send({error: "Error el parametro ingresado no es un numero"})
    }

    if (num < 1 || num > frase.length ){
        return res.send({error: "Error el parametro ingresado esta fuera de rango"})
    }
    res.send(frase[num-1])

})

app.get('/api/palabras/:num', (req, res) => {
    const num = parseInt(req.params.num)

    if (isNaN(num)){
        return res.send({error: "Error el parametro ingresado no es un numero"})
    }
    const palabras = frase.split(' ')
    if (num < 1 || num > frase.length ){
        return res.send({error: "Error el parametro ingresado esta fuera de rango"})
    }
    res.send(palabras[num-1])
    
})



const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})