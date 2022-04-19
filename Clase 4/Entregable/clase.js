const fs = require('fs')

class Contenedor {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
        this.init()
    }
    
    init() {
        let file = this.fileName
        try {
			let data = fs.readFileSync(file);
			this.content = JSON.parse(data);
            console.log(data)
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('Aún no hay archivo');
		}
    }

    async write() { 
        try {
            const escribir = await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
            console.log('success');
        } catch (error) {
			console.log('Error al escribir');
		}
    }

    save(object) {
        this.countID++ 
        const objAdd = {
            title: object.title,
            price: object.price,
            tumbnail: object.tumbnail,
            id: this.countID 
        }
        this.content.push(objAdd) 
        this.write() 
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
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() 
            result = `Producto fue eliminado`
        } else {
            result = `Archivo vacío o el Producto no se encontró`
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


