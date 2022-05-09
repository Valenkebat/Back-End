const fs = require('fs')

class Contenedor {
    /**
     * @param {String} name 
     */
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
        this.#init()
    }
    
    #getIndexById(id){
        return this.content.findIndex((obj => obj.id == id));
    }

    #init() {
        let file = this.fileName
        try {
			let data = fs.readFileSync(file);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('Aún no hay archivo');
		}
    }

    async #write() { 
        try {
            const escribir = await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
        } catch (err) {
			console.log('Error al escribir: ',err);
		}
    }

    /**
     * Producto
     * @typedef {Object} Producto
     * @property {String} title nombre del producto
     * @property {Number} price precio del producto
     * @property {String} tumbnail tumbnail del producto
     * @param {Producto} producto recive un producto como parametro {@link Producto}
     * @returns {String} Retorna el ID del producto añadido
     */
    save(producto) {
        this.countID++ 
        const objAdd = {
            title: producto.title,
            price: producto.price,
            tumbnail: producto.tumbnail,
            id: this.countID 
        }
        this.content.push(objAdd) 
        this.#write() 
        return `El id del objeto añadido es ${this.countID}.` 
    }

    getAll() {
        return this.content
    }

    getById(id) { 
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'Archivo vacío'
        }
        return result
    }

    deleteById(id) { 
        let result
        if (this.content !== []) {
            if(this.getById(id) !== null){
                let newContent = this.content.filter(x => x.id !== id)
                for (let index = this.#getIndexById(id); index < newContent.length; index++) {
                    newContent[index].id = newContent[index].id - 1                     
                }
                this.countID - 1
                this.content = newContent
                this.#write() 
                result = `Producto eliminado`
            }else{
                result = 'Id Inexistente'
            }
        } else {
            result = 'Arrchivo vacío'
        }
        return result
    }

    updateById(id,updateObj){
        let result
        if (this.content !== []) {
            result = this.#getIndexById(id)
            if (result === -1 ) {
                result = null
            }else{
                this.content[result] = updateObj
                this.#write() 
                result = 'success'
            }
        } else {
            result = 'Archivo vacío'
        }
        return result
    }

    deleteAll() { 
        this.content = []
        try {
            const escribir = fs.writeFile(this.fileName, JSON.stringify(this.content))
            console.log('success');
        } catch (error) {
			console.log('Error al escribir');
		}
    }
}

module.exports = Contenedor