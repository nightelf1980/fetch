function renderFinalizarCompra(){
    let productos = obtenerProductosCarrito();
    console.log(productos);
    
    let contenido = `
    
        <p class="alert alert-warning text-center col-md-6 offset-md-3" role="alert">No hay productos seleccionados</p>
        `;
    
    if (productos != "") {
        
        contenido = `
        <table class="table">

        `;

        let total = 0;
        let totalItems = 0;

        
        for (let producto of productos) {
            let precio = producto.precio * producto.cantidad;
            contenido += `

                <tr></tr>

            `;
            total += precio;
            totalItems += producto.cantidad;
            
        }
        
        contenido += `
            <tr class="alert" role="alert">
                <td class="text-center" colspan="2"><b>Total a pagar</b></td>
                <td class="text-center">${totalItems} productos</td>
                <td class="text-center"><b>$ ${total}</b></td>
                <td class="text-end"><a href="../views/carrito.html" class="btn btn-success">Ver carrito</a></td>
                <td class="text-end"><a href="https://www.webpay.cl" class="btn btn-primary">Ir a pagar</a></td>
            </tr>
        `

        contenido += `</table>`

    }

    document.getElementById("finalizar_compra").innerHTML = contenido;

}

renderFinalizarCompra();