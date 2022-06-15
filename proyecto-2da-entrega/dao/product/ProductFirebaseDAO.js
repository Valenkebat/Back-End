import FirebaseContainer from '../../container/FirebaseContainer.js'

class ProductFirebaseContainer extends FirebaseContainer{
    constructor(){
        super('product');
    }
    async save(product = { productos: [] }) {
        return super.save(product)
    }
}

export default ProductFirebaseContainer