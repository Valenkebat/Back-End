const fs = require('fs')

// Leer Archivos
let data = 'No leido'

//try{
//    data =  fs.readFileSync('./archivos/text.txt', 'utf-8')
//} catch(err) {
//    console.log('err')
//}
console.log(data)

//- Sobree escribir archivos

// fs.writeFileSync('./archivos/text.txt', 'Hola Bienvenido')


//- Sobree escribir archivos (Append)
fs.appendFileSync('./archivos/text.txt', ' a la clase')

// Eliminar Archivos

fs.unlinkSync('./archivos/text.txt')

// Crea Carpetas
fs.mkdirSync('./achivos/nuevo.txt')
