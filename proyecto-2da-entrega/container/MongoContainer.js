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



}

export default MongoContainer;