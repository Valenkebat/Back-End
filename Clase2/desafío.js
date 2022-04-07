class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return `Usuario: ${this.nombre} ${this.apellido}`;
    }

    addMascota(m){
        this.mascotas.push(m)
    }

    countMascotas(){
        console.log(typeof(this.mascotas))

        console.log(this.mascotas.length)
        if((this.mascotas.length == 0) | (this.mascotas.length == null)){
            return 0
        }else{
            return this.mascotas.length
        }
    }

    addBook(nombre,autor){
        let libro = {
            nombre: nombre,
            autor: autor
        }
        this.libros.push(libro)
    }

    getBookNames(){
        let array = this.libros.map(function(libro) {
            return libro.nombre;
          });
        return array         
    }
}


let usuario1 = new Usuario('Juan','Perez',[{nombre:'Viaje al fin de la noche',autor:'Louis-Ferdinand Céline	'}],["perro","gato","pez"])
console.log(usuario1.getFullName())

console.log("Mascotas: ")
console.log(usuario1.countMascotas())
console.log("Arrray de Libros: ")
console.log(usuario1.getBookNames())
usuario1.addBook("El Seño de los Anillos","JRR Tolkien")
console.log("libro Agregado")
console.log("Arrray de Libros: ")
console.log(usuario1.getBookNames())

usuario1.addMascota("pajaro")
console.log("Mascota Agregada... ")
console.log(usuario1.countMascotas())

