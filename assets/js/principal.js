const principal = [
    {id:1, title:"Cactus",text:"Las cactáceas, son conocidas en conjunto como cactos, cactus o cacti",imagen:"cactusCard.jpg",link:"cactus.html"},
    {id:2, title:"Suculentas",text:"La palabra 'Suculenta' viene del latín succulentus, que significa: 'jugoso'",imagen:"suculentasCard.jpg",link:"suculentas.html"},
];

function obtenerPrincipalLS() {
    return JSON.parse(localStorage.getItem("principal")) || [];
}

function renderPrincipalDOM(){
    let productos = obtenerPrincipalLS();
    for (let producto of principal) {
        let columna = document.createElement("div");
        columna.className = "col-md-6 py-3";

        let card = document.createElement("div");
        card.className ="card";

        let imagen = document.createElement("img");
        imagen.src = `/assets/img/principalCard/${producto.imagen}`;
        imagen.className = "card-img-top";
        imagen.alt = producto.title;

        let card_body = document.createElement("div");
        card_body.className ="card-body";

        let titulo = document.createElement("h5");
        titulo.className = "card-title text-center py-1";
        titulo.innerHTML = producto.title;

        let text = document.createElement("p");
        text.className = "card-title text-center";
        text.innerHTML = producto.text;

        let link = document.createElement("div");
        link.className = "card-footer text-center";
        link.innerHTML = `<a href="./views/${producto.link}" class="btn boton-ver btn-secondary">Más información</a>`;
        
        card_body.appendChild(imagen);
        card_body.appendChild(titulo);
        card_body.appendChild(text);
                
        card.appendChild(card_body);
        card.appendChild(link);

        columna.appendChild(card);
                
        document.getElementById("principal").appendChild(columna);
    }
};

renderPrincipalDOM();

const ventaPrincipal = [
    {id:1, title:"Productos a la venta",text:"Hermosas plantas tanto de interior como de exterior. Enorme variedad y belleza",imagen:"interioryexteriorCard.jpg",link:"productos.html"},
];

function obtenerVentaPrincipalLS() {
    return JSON.parse(localStorage.getItem("ventaPrincipal")) || [];
}

function renderVentaPrincipalDOM(){
    let productos = obtenerVentaPrincipalLS();
    for (let producto of ventaPrincipal) {
        let columna = document.createElement("div");
        columna.className = "col-md-6 offset-md-3 py-3";

        let card = document.createElement("div");
        card.className ="card";

        let imagen = document.createElement("img");
        imagen.src = `./assets/img/principalCard/${producto.imagen}`;
        imagen.className = "card-img-top";
        imagen.alt = producto.title;

        let card_body = document.createElement("div");
        card_body.className ="card-body";

        let titulo = document.createElement("h5");
        titulo.className = "card-title text-center py-1";
        titulo.innerHTML = producto.title;

        let text = document.createElement("p");
        text.className = "card-title text-center";
        text.innerHTML = producto.text;

        let link = document.createElement("div");
        link.className = "card-footer text-center";
        link.innerHTML = `<a href="./views/${producto.link}" class="btn boton-ver btn-success">Ir a comprar</a>`;
        
        card_body.appendChild(imagen);
        card_body.appendChild(titulo);
        card_body.appendChild(text);
                
        card.appendChild(card_body);
        card.appendChild(link);

        columna.appendChild(card);
                
        document.getElementById("ventaPrincipal").appendChild(columna);

    }
};

renderVentaPrincipalDOM();
