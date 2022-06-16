import MongoContainer from "../../container/MongoContainer.js";
import Cart from "../../models/Cart.js";

class CartMongoDAO extends MongoContainer{
  constructor() {
    super(Cart);
  }
  
  async new(cart = { productos: [],date: new Date() }) {
    return super.save(cart)
  }

  async addProduct(cart, product) {
    return await super.update(cart, {
      $push: {
        productos: product
      }
    })
  }

  async removeProduct(cart, product) {
    return await super.update(cart, {
      $pull: {
        productos: {
          _id: product._id
        }
      }
    })
  }

} 

export default CartMongoDAO