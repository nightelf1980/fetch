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