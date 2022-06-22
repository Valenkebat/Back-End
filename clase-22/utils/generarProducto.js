import  faker from 'faker' 
faker.locale = 'es'

function generarProducto() {
  return {
    title: faker.commerce.product(),
    price: Number(faker.commerce.price()),
    thumbnail:faker.image.imageUrl(),
  }
}

export default {generarProducto}