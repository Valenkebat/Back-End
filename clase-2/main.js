let lista = [1, 2, 3, 4];

let f = function (a) {
  if ((a == 0) | (a == null)) {
    console.log("lista Vacia");
  } else {
    for (let i = 0; i < a.length; i++) {
      console.log(a[i]);
    }
  }
};

// Corregir Este
(function (a) {
    if ((a == 0) | (a == null)) {
      console.log("lista Vacia En función Anónima");
    } else {
      for (let i = 0; i < a.length; i++) {
        console.log(a[i]);
      }
    }
  })([3,4,2])

function crearMultiplicador(a){
    let b = 5
    (function(b){
       a * b
    })(b)
}

console.log(crearMultiplicador(5))