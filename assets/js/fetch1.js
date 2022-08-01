const obtenerProductos = async () => {
    const response = await fetch("https://api.jsonbin.io/v3/b/62e1ec38248d43754f085708");
    const data = await response.json();
    productosLS = data.record;
    localStorage.setItem("productosLS", JSON.stringify(productosLS))
    data.record.forEach((producto) => {
        let contenido = document.createElement("div");
        contenido.className = "col-lg-3 col-md-4 col-sm-6 py-3 cardProductos";

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

        contenido.appendChild(card);
    
        document.getElementById("productos").appendChild(contenido);
    })
}

obtenerProductos()





