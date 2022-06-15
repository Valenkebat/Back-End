import MongoContainer from "../../container/MongoContainer.js";
import Product from "../../models/Product.js";

class ProductMongoDAO extends MongoContainer{
  constructor() {
    super(Product);
  }

} 

export default ProductMongoDAO;