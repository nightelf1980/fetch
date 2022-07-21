function renderProductosDOM() {
    let productos = obtenerProductosLS();
    for (let producto of productos){
        if(producto.categoria == 2) {
            let columna = document.createElement("div");
            columna.className = "col-md-3 py-3";

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
        }
    }
};

actualizarBotonCarrito();
renderProductosDOM();