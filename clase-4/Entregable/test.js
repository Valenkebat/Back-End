const Contenedor = require("./clase");

let fileName1  = './productos.txt'
let fileName2  = './productos2.txt'

let c1 = new Contenedor(`${__dirname,fileName1}`)
let c2 = new Contenedor(`${__dirname,fileName2}`)

console.log(c1.save({title:"nuevoArticulo",price:30,tumbnail:"dir-img"}))
console.log(c1.save({title:"Articulo",price:30,tumbnail:"dir-img"}))
console.log(c2.save({title:"Pantalón",price:30,tumbnail:"dir-img"}))
console.log(c2.save({title:"Malla",price:30,tumbnail:"dir-img"}))

//////
console.log('Todos los Productos: c1')
console.log(c1.getAll())

console.log('Todos los Productos: c2')
console.log(c2.getAll())
console.log(c2.deleteAll())
console.log('Producto ' +c1.getById(1).title)
c1.deleteById(1)
console.log(c1.getById(1))
console.log('Todos los Productos c2',c2.getAll())
