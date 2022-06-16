import FirebaseContainer from '../../container/FirebaseContainer.js'

class CartFirebaseContainer extends FirebaseContainer{
    constructor(){
        super('cart');
    }
    async new(cart = { productos: [] }) {
        return super.save(cart)
    }
}

export default CartFirebaseContainer