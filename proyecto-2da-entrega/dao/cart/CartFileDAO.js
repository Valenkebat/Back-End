import FileContainer from '../../container/FileContainer.js'

class CartFileDAO extends FileContainer {
    constructor() {
        super('../data/cart.json')
    }

}

export default CartFileDAO