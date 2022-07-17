const productos = [
    {id:1,title:"Agave Attenuata",precio:"4500",descripcion:"",imagen:"agaveattenuata.jpg",categoria:"interioryexterior"},
    {id:2,title:"Alegria Nueva Guinea",precio:"3000",descripcion:"",imagen:"alegrianuevaguinea.jpg",categoria:"interioryexterior"},
    {id:3,title:"Aloe Vera",precio:"2500",descripcion:"",imagen:"aloevera.jpg",categoria:"interioryexterior"},
    {id:4,title:"Anthurium Andreanum",precio:"7500",descripcion:"",imagen:"anthuriumandreanum.jpg",categoria:"interioryexterior"},
    {id:5,title:"Anthurium Coriaceum",precio:"4800",descripcion:"",imagen:"anthuriumcoriaceum.jpg",categoria:"interioryexterior"},
    {id:6,title:"Aralia Japonica",precio:"4500",descripcion:"",imagen:"araliajaponica.jpg",categoria:"interioryexterior"},
    {id:7,title:"Aspidistra Variegada",precio:"6500",descripcion:"",imagen:"aspidistravariegada.jpg",categoria:"interioryexterior"},
    {id:8,title:"Bacopa",precio:"5000",descripcion:"",imagen:"bacopa.jpg",categoria:"interioryexterior"},
    {id:9,title:"Begonia",precio:"5500",descripcion:"",imagen:"begonia.jpg",categoria:"interioryexterior"},
    {id:10,title:"Begonia Dragon Wing",precio:"6500",descripcion:"",imagen:"begoniadragonwing.jpg",categoria:"interioryexterior"},
    {id:11,title:"Cactus Grusonii",precio:"120000",descripcion:"",imagen:"cactusgrusonii.jpg",categoria:"interioryexterior"},
    {id:12,title:"Cactus injertado",precio:"12000",descripcion:"",imagen:"cactusinjertado.jpg",categoria:"interioryexterior"},
    {id:13,title:"Cactus San Pedro",precio:"8000",descripcion:"",imagen:"cactussanpedro.jpg",categoria:"interioryexterior"},
    {id:14,title:"Caladium Rojo",precio:"18000",descripcion:"",imagen:"caladiumrojo.jpg",categoria:"interioryexterior"},
    {id:15,title:"Calathea Insignis",precio:"20000",descripcion:"",imagen:"calatheainsignis.jpg",categoria:"interioryexterior"},
    {id:16,title:"Calathea Makoyana",precio:"21000",descripcion:"",imagen:"calatheamakoyana.jpg",categoria:"interioryexterior"},
    {id:17,title:"Chamaedorea elegans",precio:"13500",descripcion:"",imagen:"chamaedoreaelegans.jpg",categoria:"interioryexterior"},
    {id:18,title:"Cica",precio:"4500",descripcion:"",imagen:"cica.jpg",categoria:"interioryexterior"},
    {id:19,title:"Cissus",precio:"6000",descripcion:"",imagen:"cissus.jpg",categoria:"interioryexterior"},
    {id:20,title:"Coleo",precio:"4800",descripcion:"",imagen:"coleo.jpg",categoria:"interioryexterior"},
    {id:21,title:"Crassula Arborescens",precio:"2500",descripcion:"",imagen:"crassulaarborescens.jpg",categoria:"interioryexterior"},
    {id:22,title:"Crassula Ovata",precio:"3000",descripcion:"",imagen:"crassulaovata.jpg",categoria:"interioryexterior"},
    {id:23,title:"Crassula Tetragona",precio:"3500",descripcion:"",imagen:"crassulatetragona.jpg",categoria:"interioryexterior"},
    {id:24,title:"Croton",precio:"4000",descripcion:"",imagen:"croton.jpg",categoria:"interioryexterior"},
    {id:25,title:"Tierra de hoja, 100% orgánica formato 40L",precio:"4500",descripcion:"40L",imagen:"sustratos.jpg",categoria:"sustratos"},
    {id:26,title:"Tierra de hoja, 100% orgánica formato 50L",precio:"6000",descripcion:"50L",imagen:"sustratos.jpg",categoria:"sustratos"},
    {id:27,title:"Sustrato para plantas de interior formato 3L",precio:"2500",descripcion:"3L",imagen:"sustratos.jpg",categoria:"sustratos"},
    {id:28,title:"Sustrato para plantas de interior formato 10L",precio:"7500",descripcion:"10L",imagen:"sustratos.jpg",categoria:"sustratos"}
];

function obtenerProductosLS() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductosLS(productos) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function buscarProducto(id){
    let productos = obtenerProductosLS();
    return productos.find(x => x.id == id);
}

function obtenerProductosCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarProductosCarrito(productos) {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

function renderProductosDOM() {
    let productos = obtenerProductosLS();
    for (let producto of productos){
        let columna = document.createElement("div");
        columna.className = "col-md-3 py-3";

        let card = document.createElement("div");
        card.className ="card";

        let imagen = document.createElement("img");
        imagen.src = `/assets/img/productos/${producto.imagen}`;
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

        let comprar = document.createElement("p");
        comprar.className = "card-footer text-center";
        comprar.innerHTML = `<a href="#!" class="btn btn-secondary" title="Agregar al carro" onclick="agregarCarrito(${producto.id})">Comprar</a></p>`;
        
        card_body.appendChild(imagen);
        card_body.appendChild(titulo);
        card_body.appendChild(precio);
                
        card.appendChild(card_body);
        card.appendChild(comprar);

        columna.appendChild(card);
                
        document.getElementById("productos").appendChild(columna);
    }
};

function actualizarBotonCarrito(){
    let productos = obtenerProductosCarrito();
    let contenido = `<button type="button" class="btn btn-success position-relative">
    <img src="/assets/img/cart.png" width="24">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
</button>`;
    let total = 0;
    

    if(productos.lenght != 0) {
        for (let producto of productos) {
            total += producto.cantidad;
        }
        contenido = `<button type="button" class="btn btn-success position-relative">
        <img src="/assets/img/cart.png" width="24">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${total}</span>
    </button>`;
    
    }

    document.getElementById("boton_carrito").innerHTML = contenido;
}

function agregarCarrito(id) {
    let productos_carrito = obtenerProductosCarrito();
    let posicion = productos_carrito.findIndex(x => x.id == id);

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
    localStorage.removeItem("carrito");
    actualizarBotonCarrito();
    renderProductosCarrito();
}

guardarProductosLS(productos);
actualizarBotonCarrito();
renderProductosDOM();
