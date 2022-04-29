const express = require('express')
const { Router } = express

/* ------------------------ SERVER Config ------------------------------ */
const PORT = 8080
const app = express()
app.use(express.static('public')) 
app.use(express.urlencoded({extended:true}))


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






// Server

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
