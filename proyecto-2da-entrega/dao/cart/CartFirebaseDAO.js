import FirebaseContainer from '../../container/FirebaseContainer.js'

class CartFirebaseContainer extends FirebaseContainer{
    constructor(){
        super('cart');
    }
    async save(cart = { productos: [] }) {
        return super.save(cart)
    }
}

export default CartFirebaseContainer