const socket = io.connect()

let username = sessionStorage.getItem("username");
if (!username) {
  username = prompt("Ingrese email");
}
$("#username").html(username);


function renderMesajes(data) {
  console.log(data)
  if(data.lenght != undefined){
  data.forEach((info) => {
    $("#messages").prepend(`
      <div>
          <em class="text-primary fw-bold">${info.author}</em>
          [<em class="text-danger">${info.time}</em>]: <em class="text-success fst-italic">${info.text}</em>
      </div>
    `);
  });
}
}

function renderProductos(data){
  if(data.lenght != undefined){
  data.forEach((info) => {
    $("#tabla-productos").prepend(`
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Título</th>
          <th scope="col">Precio</th>
          <th scope="col">URL imagen</th>
        </tr>
      </thead>
      <tbody>
          <tr>
              <th scope="row">${info.id}</th>
              <td>${info.title}</td>
              <td>${info.price}</td>
              <td>${info.thumbnail}</td>
          </tr>    
      </tbody>
    </table>
    `);
  })
  }
}



socket.on("messages", (data) => {
  renderMesajes(data);
});

socket.on('productos', data =>{ 
  renderProductos(data)
});

//enviar Mensaje
$('#myChat').on('submit', e => {
  e.preventDefault();

  const message = {
    author: username,
    text: $("#text").val()
  };

  socket.emit("new-message", message);
});


//Guardar Producto
const form = document.getElementById('form-products')
form.addEventListener('submit', e => {
    e.preventDefault()
    const data = {title: form[0].value, price: form[1].value, thumbnail: form[2].value}
    socket.emit("new-product", data);
    socket.on('productos', data =>{ 
      renderProductos(data)
    });
})