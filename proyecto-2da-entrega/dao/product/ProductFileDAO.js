import FileContainer from '../../container/FileContainer.js'

class ProductFileDAO extends FileContainer {
    constructor() {
        super('/data/product.json')
    }

}

export default ProductFileDAO