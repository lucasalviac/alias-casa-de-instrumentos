class Producto {
    constructor(codigo, marca, modelo, precio) {
        this.codigo = codigo
        this.marca = marca
        this.modelo = modelo
        this.precio = precio
    }
    descripcion() {
        return "\n" + this.codigo + "-" + this.marca + "-" + this.modelo + "-" + "$" + this.precio
    }
}

let arregloProductos = new Array()
arregloProductos.push(new Producto("1", "Fender", "Stratocaster", 1500000))
arregloProductos.push(new Producto("2", "Fender", "Telecaster", 1250000))
arregloProductos.push(new Producto("3", "Gibson", "SG", 2000000))
arregloProductos.push(new Producto("4", "Gibson", "Les Paul", 2500000))

for (let i = 0; i < arregloProductos.length; i++) {
    let prod = arregloProductos[i]
    crear_caja_instrumento(prod)
}

let carrito = new Array()

funcionVaciarCarrito()

window.onload = function(){
let carritoJson = localStorage.getItem("carrito")
if(carritoJson){
    carrito = JSON.parse(carritoJson)
}
renderizarCarrito()
}

function crear_caja_instrumento(producto) {
    let divProductos = document.getElementById("cards")
    let ctn = document.createElement("div");
    let name = document.createElement("h2");
    name.textContent = producto.descripcion();
    let boton = document.createElement("button")
    boton.innerText = "comprar"
    boton.addEventListener("click", () => {

        let productoElegido = ""
        productoElegido = new Producto(producto.codigo, producto.marca, producto.modelo, producto.precio)
        agregarAlCarrito(productoElegido)
    })

    ctn.appendChild(name)
    ctn.appendChild(boton)
    divProductos.appendChild(ctn)
}

function funcionVaciarCarrito() {
    let divCarrito = document.getElementById("vaciarCarrito")
    let divCarrito2 = document.getElementById("carrito")
    let boton2 = document.createElement("button")
    boton2.innerText = "vaciar"
    boton2.addEventListener("click", () => {
        divCarrito2.innerHTML = "El carrito está vacío"
        carrito = []
        guardarCarrito()
    })
    divCarrito.appendChild(boton2)
}

function guardarCarrito() {
    let carritoJson = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJson)
}

function renderizarCarrito(){
    let divCarrito = document.getElementById("carrito")
    divCarrito.innerHTML = ""

    if (carrito.length=== 0){
        let divCarrito2 = document.createElement("div")
        divCarrito2.innerHTML = "El carrito está vacío"
        divCarrito.appendChild(divCarrito2)
    }else{
        for(let i = 0; i<carrito.length; i++){
        let divCarrito2 = document.createElement("div")
        divCarrito2.innerHTML = carrito[i]
        divCarrito.appendChild(divCarrito2)
    }
}
}

function agregarAlCarrito(producto){
    carrito.push(producto)
    guardarCarrito()
    renderizarCarrito()
}