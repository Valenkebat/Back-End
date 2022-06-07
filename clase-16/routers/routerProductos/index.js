const express = require("express")
const {Router} = express
const optionsMysql = require('../.././container/mysql/config')
const Contenedor = require('../.././container/container')

const productos = new Contenedor(optionsMysql.optionsMysql,'productos')

const routerProductos = new Router()

routerProductos.get('/productos', async function(req, res){
    const productosR = await productos.getAll()
    if (productosR.length > 0) {
        res.json(productosR)
    } else {
        res.json([])
    }
})


module.exports = routerProductos