import FileContainer from '../../container/FileContainer.js'

class CartFileDAO extends FileContainer {
    constructor() {
        super('/data/cart.json')
    }
    async new(cart = { productos: [] }) {
        return super.save(cart)
    }
}

export default CartFileDAO