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

let carritoJson = localStorage.getItem("carrito")
let jsonParse = JSON.parse(carritoJson)

let divCarrito = document.getElementById("carrito")
let divCarrito2 = document.createElement("div")
divCarrito2.innerHTML = jsonParse
divCarrito.appendChild(divCarrito2)
/* for(let i = 0; i<jsonParse.length; i++){
    let divCarrito = document.getElementById("carrito")
    let divCarrito2 = document.createElement("div")
    divCarrito2.innerHTML = jsonParse[i]
    divCarrito.appendChild(divCarrito2)
}
 */



let carrito = new Array()
funcionCarrito()






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
        carrito.push(productoElegido)
        console.log(carrito)
        let divCarrito = document.getElementById("carrito")
        let divCarrito2 = document.createElement("div")
        divCarrito2.innerHTML = producto.descripcion()
        divCarrito.appendChild(divCarrito2)
        guardarCarrito()
    })



    ctn.appendChild(name)
    ctn.appendChild(boton)
    divProductos.appendChild(ctn)
}

function funcionCarrito() {
    let divCarrito = document.getElementById("vaciarCarrito")
    let divCarrito2 = document.getElementById("carrito")
    let boton2 = document.createElement("button")
    boton2.innerText = "vaciar"
    boton2.addEventListener("click", () => {
        divCarrito2.innerHTML = ""
        carrito = []
        guardarCarrito()
    })
    divCarrito.appendChild(boton2)
}

function guardarCarrito() {
    /* let carritoJson = JSON.stringify(carrito) */
    localStorage.setItem("carrito", (JSON.stringify(carrito)))
}