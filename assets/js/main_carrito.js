function renderProductosCarrito(){
    let productos = obtenerProductosCarrito();
    let contenido = `
    
        <p class="alert alert-warning text-center col-md-6 offset-md-3" role="alert">No hay productos seleccionados</p>
        `;
    

    if (productos != "") {
        
        contenido = `
        <p class="text-end">
            <a href="#" class="btn btn-warning" onclick="vaciarCarrito()" title="Vaciar Carro">Vaciar Carro
                <img src="../assets/img/trash.png" width="20">
            </a>
        </p>
        <table class="table">
        `;

        let total = 0;
        
        for (let producto of productos) {
            let precio = producto.precio * producto.cantidad;
            contenido += `
                <tr>
                    <td><img src="/assets/img/productos/${producto.imagen}" class="img-carrito" alt="${producto.title}"></td>
                    <td class="align-middle text-center">${producto.title}</td>
                    <td class="align-middle text-center">${producto.cantidad}</td>
                    <td class="align-middle text-center"><b>$ ${precio}</b></td>
                    <td class="text-end"><a href="#" class="btn" onclick="eliminarItem(${producto.id})"><img src="../assets/img/eliminarItem.png" width="20" title="Eliminar item"></a></td>
                </tr>
            `;
            total += precio;
            
        }
        
        contenido += `
            <tr class="alert alert-success" role="alert">
                <td>&nbsp;</td>
                <td class="text-center"><b>Total a pagar</b></td>
                <td>&nbsp;</td>
                <td class="text-center"><b>$ ${total}</b></td>
                <td class="text-end"><a href="https://www.webpay.cl/" target="_blank" class="btn btn-success">Finalizar compra</a></td>
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

    if (productos_carrito[posicion].cantidad == 0) {
        productos_carrito.splice(posicion, 1);
    }

    guardarProductosCarrito(productos_carrito);
    actualizarBotonCarrito();
    renderProductosCarrito();
}

actualizarBotonCarrito();
renderProductosCarrito();