import MongoContainer from "../../container/MongoContainer.js";
import Cart from "../../models/Cart.js";

class CartMongoDAO extends MongoContainer{
  constructor() {
    super(Cart);
  }

} 

export default CartMongoDAO