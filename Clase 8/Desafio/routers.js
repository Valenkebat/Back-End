const express = require('express')
const { Router } = express
const Contenedor = require('./clases')

//Inicializo clase
let fileName  = './productos.txt'
const c = new Contenedor(`${__dirname,fileName}`)

// Router Productos ---------------------------------------
const routerContenedor = new Router()

routerContenedor.use(express.json())

routerContenedor.get('/productos', (req, res) => {
    res.json(c.getAll())
})

routerContenedor.get('/productos/:id', (req, res) => { 
    let id = Number(req.params.id)
    let p = c.getById(id) 
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

routerContenedor.post('/productos', (req, res) => { 
    let product = req.body
    return res.json(c.save(product))
})

routerContenedor.put('/productos/:id', (req, res) => { 
    let id = Number(req.params.id)
    let product = req.body
    let p = c.updateById(id,product)
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

routerContenedor.delete('/productos/:id', (req, res) => { 
    let id = Number(req.params.id)
    let p = c.deleteById(id)
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

module.exports = routerContenedor