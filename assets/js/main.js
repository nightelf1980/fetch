function renderProductosDOM() {
    let productos = obtenerProductosLS();
        for (let producto of productos){
        if(producto.categoria == 1) {
            let columna = document.createElement("div");
            columna.className = "col-lg-3 col-md-4 col-sm-6 py-3 cardProductos";

            let card = document.createElement("div");
            card.className ="card";

            let imagen = document.createElement("img");
            imagen.src = `../assets/img/productos/${producto.imagen}`;
            imagen.className = "card-img-top";
            imagen.alt = producto.title;

            let card_body = document.createElement("div");
            card_body.className ="card-body";

            let titulo = document.createElement("h6");
            titulo.className = "card-title text-center py-1";
            titulo.innerHTML = producto.title;

            let precio = document.createElement("p");
            precio.className = "card-title text-center";
            precio.innerHTML = `$ ${producto.precio}`;

            let comprar = document.createElement("div");
            comprar.className = "card-footer text-center";
            comprar.innerHTML = `<a href="#!" class="btn btn-secondary" title="Agregar al carro" onclick="agregarCarrito(${producto.id})">Agregar a mi carro</a></div>`;
            
            card_body.appendChild(imagen);
            card_body.appendChild(titulo);
            card_body.appendChild(precio);
                    
            card.appendChild(card_body);
            card.appendChild(comprar);

            columna.appendChild(card);
        
            document.getElementById("productos").appendChild(columna);
        };
    };
};

renderProductosDOM();

function actualizarBotonCarrito(){
    let productos = obtenerProductosCarrito();
    let contenido = `<button type="button" class="btn btn-success position-relative">
    <img src="./cart.png" width="24">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
</button>`;
    let total = 0;
    

    if(productos.lenght != 0) {
        for (let producto of productos) {
            total += producto.cantidad;
        }
        contenido = `<button type="button" class="btn btn-success position-relative">
        <i class="fa-solid fa-cart-shopping"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${total}</span>
    </button>`;
    
    }

    document.getElementById("boton_carrito").innerHTML = contenido;
}

function agregarCarrito(id) {
    let productos_carrito = obtenerProductosCarrito();
    let posicion = productos_carrito.findIndex(x => x.id == id);

    Toastify({
        text: "Item agregado al carro",
        duration: 1500,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        className: "bt-toast",
        onClick: function(){} // Callback after click
      }).showToast();

    if (posicion > -1){
        productos_carrito[posicion].cantidad += 1;
    } else {
        let producto = buscarProducto(id);
        producto.cantidad = 1;
        productos_carrito.push(producto); 
    }
       
    guardarProductosCarrito(productos_carrito);
    actualizarBotonCarrito();
}

function vaciarCarrito(){
    Swal.fire({
        title: 'Estás seguro de vaciar el carro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar el carro',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

            localStorage.removeItem("carrito");
            actualizarBotonCarrito();
            renderProductosCarrito();

          Swal.fire(
            'Carro eliminado!',
            'Tu carro de compras está vacío',
            'success'
          )
        }
      })
}

guardarProductosLS(productos);
actualizarBotonCarrito();
