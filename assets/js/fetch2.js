const obtenerProductos = async () => {
    const response = await fetch("https://api.jsonbin.io/v3/b/62e840401c7f436f211b41c7")
    const data = await response.json()
    productosLS2 = data.record
    localStorage.setItem("productosLS2", JSON.stringify(data.record))
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
    
        document.getElementById("sustratos").appendChild(contenido);
    })
}

obtenerProductos()

function obtenerProductosLS() {
    return JSON.parse(localStorage.getItem("productosLS2")) || [];
}

function buscarProducto(id){
    let productos = obtenerProductosLS();
    return productos.find(x => x[id] == id);
}





