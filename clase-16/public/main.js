const socket = io.connect();

let username = sessionStorage.getItem("username");
if (!username) {
  username = prompt("Ingrese email");
}
$("#username").html(username);

function renderMesajes(data) {
  if (data.lenght != undefined) {
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

function renderProductos() {
  fetch("http://localhost:8080/productos")
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        const html = data
        console.log(data)
         data.map((elem) => {
            return `
                    <tr>
                        <th scope="row">${elem.id}</th>
                        <td>${elem.title}</td>
                        <td>${elem.price}</td>
                        <td>${elem.thumbnail}</td>
                    </tr>    
                `;
          })
          .join(" ");
        $("cuerpoTabla").prepend(html);
      }
    });
}

socket.on("messages", (data) => {
  renderMesajes(data);
});

socket.on("productos", (data) => {
  renderProductos(data);
});

//enviar Mensaje
$("#myChat").on("submit", (e) => {
  e.preventDefault();

  const message = {
    author: username,
    text: $("#text").val(),
  };

  socket.emit("new-message", message);
});

//Guardar Producto
const form = document.getElementById("form-products");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: form[0].value,
    price: form[1].value,
    thumbnail: form[2].value,
  };
  socket.emit("new-product", data);
  socket.on("productos", (data) => {
    renderProductos(data);
  });
});
