const knex = require('knex')

module.exports = class Contenedor {
  constructor(options, tableName) {
    this.knex = knex(options)
    this.tableName = tableName
  }
  save(elem) {
      try {
          return this.knex.insert(elem).into(this.tabla)
      } catch (error) {
          throw new Error(`Error al guardar: ${error}`)
      }
  }

  async getAll() {
    try {
      return await knex.from(this.tableName).select("*");
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  async deleteById(id) {
    try {
      return await knex.from(this.tableName).where("id", id).del();
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  async deleteAll() {
    try {
      return await knex.from(this.tableName).del();
    } catch (err) {
      return `Error: ${err}`;
    }
  }
  
}