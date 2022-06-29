const fs = require('fs')
// manejo de archivos async


// Leer Archivos
let data = 'No leido'


data =  fs.readFile('./archivos/text.txt', 'utf-8', (err,contenido) => {
    if (err) {
        console.log('Error logueado ' + err)
    }else{
        console.log(contenido)
    }
})

//- Sobree escribir archivos

fs.writeFile('./archivos/text.txt', 'Hola Bienvenido', err => {
    if (err) {
        console.log('Error logueado ' + err)
    }else{
        console.log('Se escribio correctamente')
    }
})


//- Sobree escribir archivos (Append)
fs.appendFile('./archivos/text.txt', ' a la clase', err => {
    if (err) {
        console.log('Error logueado ' + err)
    }else{
        console.log('Se agregó correctamente')
    }
})

// Eliminar Archivos

fs.unlink('./archivos/text.txt', err => {
    if (err) {
        console.log('Error logueado ' + err)
    }else{
        console.log('Se elimino correctamente')
    }
})


// Crea Carpetas
fs.mkdir('./achivos/carpetaNueva', err => {
    if (err) {
        console.log('Error logueado ' + err)
    }else{
        console.log('Se creó la carpeta correctamente')
    }
})