const Contenedor =  require('../class/Container')
const path = require('path');
const express = require('express');
const { Router } = express

const Admin = true

const c = new Contenedor(path.join(__dirname, '../data/productos.json'))

const productRouter = new Router()
productRouter.use(express.json())


productRouter.get('/productos/:id?', (req, res) => { 
    const { id } = req.params
    if ( isNaN(id) ){
        return res.json(c.getAll())
    }
    let p = c.getById(Number(id)) 
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

productRouter.post('/productos', (req, res) => { 
    if(!Admin){
        return res.send({error: "Error de autentificación"})
    }
    return res.json(c.save(req.body))
})

productRouter.put('/productos/:id', (req, res) => { 
    if(!Admin){
        return res.send({error: "Error de autentificación"})
    }
    let p = c.updateById(Number(req.params.id),req.body)
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

productRouter.delete('/productos/:id', (req, res) => {
    if(!Admin){
        return res.send({error: "Error de autentificación"})
    }
    let p = c.deleteById(Number(req.params.id))
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

module.exports = productRouter