const express = require('express')
const multer = require('multer')
const { Router } = express
const Contenedor = require('./clases')

const cont = ''
// Router Contenedor Config -------------------------------------
const routerContenedor = new Router()
routerContenedor.use(express.json())

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/* ------------------------------------------------------ */
/* Multer config */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
const upload = multer({ storage: storage })

// Endpoints

routerContenedor.post('/subir', upload.single('miArchivo'), (req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Error: No se subio ningun archivo')
        error.httpStatuCode = 400
        return next(error)
    }
    let filename = __dirname +'/'+ req.file.path;
    c = new Contenedor(filename)
    res.send('Archivo ' + file.originalname + ' se subio correctamente')
})

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
    let p = objList[0].updateById(id,product)
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


// Carga de Routers

app.use('/api', routerContenedor)


// SERVER
const PORT = 8080
const server = app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))