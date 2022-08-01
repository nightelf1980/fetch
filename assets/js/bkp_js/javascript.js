function guardarProductosLS(productos) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function obtenerProductosLS() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function buscarProducto(id){
    let productos = obtenerProductosLS();
    return productos.find(x => x[id] == id);
}

function obtenerProductosCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarProductosCarrito(productos) {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

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

function renderProductosCarrito(){
    let productos = obtenerProductosCarrito();
    let contenido = `
        <div class="container">
            <p class="alert alert-warning text-center col-md-6 offset-md-3" role="alert">No hay productos seleccionados</p>
        </div>
        `;
    

    if (productos != "") {
        
        contenido = `
        <div class="container">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col" class="align-middle text-center">Imagen</th>
                    <th scope="col" class="align-middle text-center">Descripción</th>
                    <th scope="col" class="align-middle text-center">Cantidad</th>
                    <th scope="col" class="align-middle text-center">Total</th>
                    <th scope="col" class="align-middle text-center"></th>
                    </tr>
                </thead>
        `;

        let total = 0;
        let totalItems = 0;
        
        for (let producto of productos) {
            let precio = producto.precio * producto.cantidad;
            contenido += `
                <tr>
                    <td class="align-middle text-center"><img src="../assets/img/productos/${producto.imagen}" class="img-carrito" alt="${producto.title}"></td>
                    <td class="align-middle text-center">${producto.title} <p>Precio unitario: $ ${producto.precio}</p></td>
                    <td class="align-middle text-center">
                        <a href="#!" class="btn" onclick="agregarItem(${producto.id})"><img src="../assets/img/agregarItem.png" width="15" title="Agregar"></a>
                        <b>${producto.cantidad}</b>
                        <a href="#!" class="btn" onclick="eliminarItem(${producto.id})"><img src="../assets/img/eliminarItem.png" width="15" title="Eliminar"></a>
                    </td>
                    <td class="align-middle text-center"><b>$ ${precio}</b></td>
                    <td class="align-middle text-center" width="50">
                        <a href="#!" class="btn" onclick="quitarItem(${producto.id})" title="Quitar del carro"><i class="fa-solid fa-trash"></i></td>
                    </tr>
            `;
            total += precio;
            totalItems += producto.cantidad;
            
        }
        
        contenido += `
            <tr class="alert alert-success" role="alert">
                <td class="text-center" colspan="2"><b>Total a pagar</b></td>
                <td class="text-center">${totalItems} productos</td>
                <td class="text-center" ><b>$ ${total}</b></td>
                <td></td>
            </tr>
            <tr>
                <td class="text-end" colspan="5"><a href="../views/finalizarCompra.html" class="btn btn-success" title="Finalizar">Finalizar compra <i class="fa-solid fa-check"></i></a></td>
            </tr>
        `

        contenido += `
            </table>
                <p class="text-end">
                    <a href="#" class="btn btn-warning py-10" onclick="vaciarCarrito()" title="Vaciar Carro">Vaciar Carro
                        <i class="fa-solid fa-trash-can"></i>
                    </a>
                </p>
        </div>
        `
    }

    document.getElementById("productos_carrito").innerHTML = contenido;
}

function agregarItem(id) {
    let productos_carrito = obtenerProductosCarrito();
    let posicion = productos_carrito.findIndex(x => x.id == id); // ENCUENTRA LA POSICIÓN DEL PRODUCTO

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
        productos_carrito[posicion].cantidad += 1; // AUMENTA LA POSICIÓN ENCONTRADA
    } else {
        let producto = buscarProducto(id);
        producto.cantidad = 1;
        productos_carrito.push(producto); 
    }
       
    guardarProductosCarrito(productos_carrito);
    actualizarBotonCarrito();
    renderProductosCarrito();
}

function eliminarItem(id) {
    let productos_carrito = obtenerProductosCarrito();
    let posicion = productos_carrito.findIndex(x => x.id == id); // ENCUENTRA LA POSICIÓN DEL PRODUCTO
    productos_carrito[posicion].cantidad -= 1; // DISMINUYE LA POSICIÓN ENCONTRADA

    Toastify({
        text: "Item eliminado",
        duration: 1500,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to left, #ff9e0d, #f13000)",
        },
        className: "bt-toast",
        onClick: function(){} // Callback after click
      }).showToast();

    if (productos_carrito[posicion].cantidad == 0) {
        productos_carrito.splice(posicion, 1);
    }

    guardarProductosCarrito(productos_carrito);
    actualizarBotonCarrito();
    renderProductosCarrito();
}

actualizarBotonCarrito();
renderProductosCarrito();

function quitarItem(id){
    /* SWEETALERT */
    Swal.fire({
        title: 'Desea eliminar el producto del carro?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            /* JS CODE */ 
            let productos_carrito = obtenerProductosCarrito();
            let posicion = productos_carrito.findIndex(x => x.id == id); // ENCUENTRA LA POSICIÓN DEL PRODUCTO
            productos_carrito.splice(posicion, 1) // ELIMINA LA POSICIÓN ENCONTRADA
            guardarProductosCarrito(productos_carrito); // GUARDA PRODUCTOS CARRITO
            actualizarBotonCarrito(); // ACTUALIZA # CARRO
            renderProductosCarrito(); // RENDERIZA CARRO

            Swal.fire(
                'Producto eliminado!',
                '',
                'success'
            )
        }
    })
};

function renderFinalizarCompra(){
    let productos = obtenerProductosCarrito();
    let contenido = `
    
        <p class="alert alert-warning text-center col-md-6 offset-md-3" role="alert">No hay productos seleccionados</p>
        `;
    
    if (productos != "") {
        
        contenido = `
        <table class="table">

        `;

        let total = 0;
        let totalItems = 0;
        let costoEnvio = 0;
        let diffEnvio = 0;
        
        for (let producto of productos) {
            let precio = producto.precio * producto.cantidad;
            contenido += `

                <tr></tr>

            `;
            total += precio;
            totalAPagar = total + costoEnvio;
            totalItems += producto.cantidad;
        }

        if(total < 30000) {
            costoEnvio = 4990;
            diffEnvio = 30000 - total;
            totalAPagar = total + costoEnvio;
            
            contenido += `
            <tr class="alert" role="alert">
                <td>Resumen de tu compra: </td>
                <td>${totalItems} productos</td>
            </tr>
            <tr>
                <td class="text-end" colspan="2"><a href="../views/carrito.html" class="btn btn-success"><i class="fa-solid fa-cart-shopping"></i> Ver carro</a></td>
            </tr>
            <tr class="alert" role="alert">
                <td class="text-center"><b>Total productos</b></td>
                <td class="text-center"><b>$ ${total}</b></td>
            </tr>
            <tr >
                <td class="text-center"><b>Costo de envío</b></td>
                <td class="text-center"><b>$ ${costoEnvio}</b></td>
            </tr>
            <tr>
                <td class="text-center"><b>Total a pagar</b></td>
                <td class="text-center"><b>$ ${ totalAPagar}</b></td>
            </tr>
            <tr class="bg-warning bg-opacity-25">
                <td class="text-center" colspan="2"><i class="fa-solid fa-circle-exclamation fa-lg"></i> Faltan <b>$${diffEnvio}</b> en compras para despacho gratis</td>
            </tr>
            <tr>
                <td class="text-end" colspan="2"><a href="https://www.webpay.cl" class="btn btn-primary"><i class="fa-solid fa-hand-holding-dollar "></i> Ir a pagar</a></td>
            </tr>
            <tr class="alert" role="alert">
                <td class="text-center" colspan="2"><i class="fa-solid fa-lock fa-lg"></i> Compra 100% segura</td>
            </tr>
            `
            contenido += `</table>`
            
        } else {
            costoEnvio = 0;
            totalAPagar = total + costoEnvio;

            contenido += `
            <tr class="alert" role="alert">
                <td>Resumen de tu compra: </td>
                <td>${totalItems} productos</td>
            </tr>
            <tr>
                <td class="text-end" colspan="2"><a href="../views/carrito.html" class="btn btn-success"><i class="fa-solid fa-cart-shopping"></i> Ver carrito</a></td>
            </tr>
            <tr class="alert" role="alert">
                <td class="text-center"><b>Total productos</b></td>
                <td class="text-center"><b>$ ${total}</b></td>
            </tr>
            <tr >
                <td class="text-center"><b>Costo de envío</b></td>
                <td class="text-center"><b>$ ${costoEnvio}</b></td>
            </tr>
            <tr>
                <td class="text-center"><b>Total a pagar</b></td>
                <td class="text-center"><b>$ ${ totalAPagar}</b></td>
            </tr>
            <tr class="bg-success bg-opacity-25">
                <td class="text-center" colspan="2"><i class="fa-solid fa-clipboard-check fa-lg"></i> Tienes despacho gratis</td>
            </tr>
            <tr>
                <td class="text-end" colspan="2"><a href="https://www.webpay.cl" class="btn btn-primary"><i class="fa-solid fa-hand-holding-dollar"></i> Ir a pagar</a></td>
            </tr>
            <tr class="alert" role="alert">
                <td class="text-center" colspan="2"><i class="fa-solid fa-lock fa-lg"></i> Compra 100% segura</td>
            </tr>
        `

        contenido += `</table>`

        };

    }

    document.getElementById("finalizar_compra").innerHTML = contenido;

}

renderFinalizarCompra();