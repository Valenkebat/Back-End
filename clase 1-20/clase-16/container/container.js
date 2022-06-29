const knex = require('knex')

module.exports = class Contenedor {
  constructor(options, tableName) {
    this.knex = knex(options)
    this.tableName = tableName
  }
  
  save(elem) {
      try {
          console.log('Elemento Guardado: ',elem)
          return this.knex(this.tableName).insert(elem)          
      } catch (error) {
          throw new Error(`Error al guardar: ${error}`)
      }
  }

  async getAll() {
    try {
      return await this.knex(this.tableName).select("*");
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  async deleteById(id) {
    try {
      return await this.knex.from(this.tableName).where("id", id).del();
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  async deleteAll() {
    try {
      return await this.knex.from(this.tableName).del();
    } catch (err) {
      return `Error: ${err}`;
    }
  }
  
}