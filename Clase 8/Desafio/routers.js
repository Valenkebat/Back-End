const express = require('express')
const { Router } = express
const Contenedor = require('./clases')
const multer = require('multer')

// Router Productos Config ------------------------------------
const routerContenedor = new Router()
routerContenedor.use(express.json())
//Lista de objetos Product
const objList = []


/* ------------------------------------------------------ */
/* Multer config */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
  })

const upload = multer({ storage: storage })


routerContenedor.post('/subir', upload.single('miArchivo'),(req, res) => {
    const file = req.file
    let filename = __dirname +'/'+ req.file.path;
    if (!file) {
        const error = new Error('Error: No se subio ningun archivo')
        error.httpStatuCode = 400
        return next(error)
    }
    const c =  new Contenedor(filename)
    objList.push(c)
    res.send('Archivo ' + file.originalname + ' se subio correctamente')
})

routerContenedor.get('/productos', (req, res) => {
    res.json(objList[0].getAll())
})

routerContenedor.get('/productos/:id', (req, res) => { 
    let id = Number(req.params.id)
    let p = objList[0].getById(id) 
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

routerContenedor.post('/productos', (req, res) => { 
    let product = req.body
    return res.json(objList[0].save(product))
})

routerContenedor.put('/productos/:id', (req, res) => { 
    let id = Number(req.params.id)
    let product = req.body
    let p = objList[0].updateById(id,product)
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

routerContenedor.delete('/productos/:id', (req, res) => { 
    let id = Number(req.params.id)
    let p = objList[0].deleteById(id)
    if (p === null){
        return res.send({error: "producto no encontrado"})
    }
    return res.json(p)
})

module.exports = routerContenedor