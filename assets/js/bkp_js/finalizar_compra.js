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