const Contenedor =  require('../class/Container')
const path = require('path');
const express = require('express');
const { Router } = express

const products = new Contenedor(path.join(__dirname, '../data/productos.json'))
const cart = new Contenedor(path.join(__dirname, '../data/carrito.json'))


const cartRouter = new Router()
cartRouter.use(express.json())

cartRouter.get('/carrito/:id/productos', (req, res) => { 
    let p = cart.getById(Number(req.params.id)) 
    if (p === null){
        return res.send({error: "carrito no encontrado"})
    }
    p = c.productos
    return res.json(p)
})

cartRouter.post('/carrito', (req, res) => { 
    const carrito = {
        productos: []
    }
    return res.json(cart.save(carrito))
})

cartRouter.post('/carrito/:id/productos/:id_prod', (req, res) => { 

    c = cart.getById(Number(req.params.id))
    if (c === null){
        return res.send({error: "carrito no encontrado"})
    }
    p = products.getById(Number(req.params.id_prod))
    if (c === null){
        return res.send({error: "producto no encontrado"})
    }
    c.productos.push(p)

    cart.updateById(Number(req.params.id),c)
    return res.send({exito: "producto agregado"})
})

cartRouter.put('/carrito/:id', (req, res) => { 
    let id = Number(req.params.id)
    let product = req.body
    let p = c.updateById(id,product)
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

cartRouter.delete('/carrito/:id', (req, res) => {
    let p = cart.deleteById(Number(req.params.id))
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

cartRouter.delete('/carrito/:id/productos/:id_prod', (req, res) => {
    let p = cart.deleteById(Number(req.params.id))
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

module.exports = cartRouter