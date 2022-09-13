const {buildSchema} = require("graphql");
const {ProductoType} = require("./types/Producto.type.js") ;
const {GetAllProductosQuery} = require("./queries/GetAllProductos.query.js")  ;
const {GetProductByIdQuery} = require("./queries/GetProductById.query.js")  ;
const {ProductoNewInput} = require("./inputs/ProductoNew.input.js")  ;
const {CreateProductoMutation} = require("./mutations/CreateProducto.mutation.js")  ;
const {ProductoUpdateInput} = require("./inputs/ProductoUpdate.input.js")  ;
const {UpdateProductByIdMutation} = require("./mutations/UpdateProductById.mutation.js")  ;
const {DeleteProductByIdMutation} = require("./mutations/DeleteProductById.mutation.js") ;

module.export = schema = buildSchema(`
  ${ProductoType}
  ${ProductoNewInput}
  ${ProductoUpdateInput}
  
  type Query {
    ${GetProductByIdQuery}
    ${GetAllProductosQuery}
  }
  
  type Mutation {
    ${CreateProductoMutation}
    ${UpdateProductByIdMutation}
    ${DeleteProductByIdMutation}
  }
`);