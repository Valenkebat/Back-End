import { MONGO_URI } from '../config/config.js';
import mongoose from "mongoose";

class MongoContainer {
  constructor(model) {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Conectado'))

    this.model = model;
  }

  async getAll(){
    return await this.model.find()
  }

  async getById(id){
    return await this.model.findById(id)
  }

  async save(obj){  
    const newObj = new this.model(obj)
    return await newObj.save()
  }

  async update(elem){
    return await this.model.findByIdAndUpdate(elem._id, elem)
  }

  async delete(id){
    return await this.model.findByIdAndDelete(id)
  }

}

export default MongoContainer;