import admin from 'firebase-admin'
import { firebaseConfig } from '../config/firebaseConfig.js'
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
})

const db = admin.firestore()

class FirebaseContainer {
  constructor(collection) {
    this.collection = db.collection(collection)
    console.log(`Firebase conectada con la collection ${collection}`)
  }

  async save(document){
    let doc = this.collection.doc()
    let item = await doc.create(document)
    return item
  }

  async getAll(){
    let result = await this.collection.get();
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    return result
  }

  async getById(id){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    let item = result.find(elem => elem.id == id)
    return item
  }

  async delete(id){
    let doc = this.collection.doc(`${id}`)
    let item = doc.delete()
    return ({ status: 'Deleted' })
  }

  async update(id, content){
    let doc = this.collection.doc(`${id}`)
    let item = await doc.update(content)
    return item
  }
}

export default FirebaseContainer