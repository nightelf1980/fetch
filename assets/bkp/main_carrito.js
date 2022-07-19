function renderProductosCarrito(){
    let productos = obtenerProductosCarrito();
    let contenido = `
    
        <p class="alert alert-warning text-center col-md-6 offset-md-3" role="alert">No hay productos seleccionados</p>
        `;
    

    if (productos != "") {
        
        contenido = `
        <p class="text-end">
            <a href="#" class="btn btn-warning py-10" onclick="vaciarCarrito()" title="Vaciar Carro">Vaciar Carro
                <img src="../assets/img/trash.png" width="20">
            </a>
        </p>
        <table class="table">
        <thead>
        <tr>
          <th scope="col" class="align-middle text-center">Imagen</th>
          <th scope="col" class="align-middle text-center">Descripción</th>
          <th scope="col" class="align-middle text-center">Cantidad</th>
          <th scope="col" class="align-middle text-center">Precio</th>
          <th scope="col" class="align-middle text-center">Agregar/Eliminar Item</th>
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
                    <td class="align-middle text-center">${producto.title}</td>
                    <td class="align-middle text-center">${producto.cantidad}</td>
                    <td class="align-middle text-center"><b>$ ${precio}</b></td>
                    <td class="text-end"><a href="#" class="btn" onclick="eliminarItem(${producto.id})"><img src="../assets/img/eliminarItem.png" width="20" title="Eliminar item"></a></td>
                </tr>
            `;
            total += precio;
            totalItems += producto.cantidad;
            
        }
        
        contenido += `
            <tr class="alert alert-success" role="alert">
                <td class="text-center" colspan="2"><b>Total a pagar</b></td>
                <td class="text-center">${totalItems} productos</td>
                <td class="text-center"><b>$ ${total}</b></td>
                <td class="text-end"><a href="../views/finalizarCompra.html" class="btn btn-success">Finalizar compra</a></td>
            </tr>
        `

        contenido += `</table>`
    }

    document.getElementById("productos_carrito").innerHTML = contenido;
}

function eliminarItem(id) {
    let productos_carrito = obtenerProductosCarrito();
    let posicion = productos_carrito.findIndex(x => x.id == id);
    productos_carrito[posicion].cantidad -= 1;

    Toastify({
        text: "Item eliminado",
        duration: 1500,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to left, #f13000, #ffe600)",
        },
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