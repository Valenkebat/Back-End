var admin = require("firebase-admin");

var serviceAccount = require("./db/ecommerce-82364-firebase-adminsdk-g9w2n-ab658fe2f0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

  
  console.log("Conectado a firebase correctamente")
  
  CrearUsuario();
  
  async function CrearUsuario() {
      const db = admin.firestore();
      const query = db.collection("usuarios");
  
      try {
          let id = 1;
          let doc = await query.doc(id.toString())
          await doc.create({nombre: "Marcos", apellido: "Villanueva"})
  
          console.log("Usuario creado")
      } catch (error) {
          console.log(error);
      }
  }
  