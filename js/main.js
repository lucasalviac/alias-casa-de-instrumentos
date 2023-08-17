//Creo la clase constructora

class Producto {
    constructor(codigo, marca, modelo, precio, imagen) {
        this.codigo = codigo
        this.marca = marca
        this.modelo = modelo
        this.precio = precio
        this.imagen = imagen
    }
    descripcion() {
        return "\n" + this.codigo + "-" + this.marca + "-" + this.modelo + "-" + "$" + this.precio
    }
    getPrecio() {
        return this.precio
    }
    getImagen() {
        return this.imagen
    }
}

//Llamo a la url del .json
const url = './js/db.json'

fetch(url)

    .then(respuesta => respuesta.json())
    .then(resultado => {
         
        resultado.forEach(producto => {
            //Función para crear las cards de cada producto
            crear_caja_instrumento(producto)
        });
        buscar(resultado)        
    })

//Creo el arreglo carrito
let carrito = new Array()

//Creo la variable precioFinal
let precioFinal = 0

//Función para eliminar todoslos objetos del arreglo carrito
funcionVaciarCarrito()

//Función para completar la compra y resetear el carrito
funcionComprar()

//Recupero lo guardado en el localStorage
let carritoJson = localStorage.getItem("carrito")
if (carritoJson) {
    carrito = JSON.parse(carritoJson)
}

//Función para mostrar en pantalla los objetos del arreglo carrito
renderizarCarrito()


function crear_caja_instrumento(producto) {
    
    //Llamo al elemento que va a contener las cards
    let divProductos = document.getElementById("productos")
    //Creo la card y trabajo con sus propiedades
    let ctn = document.createElement("div");
    let name = document.createElement("h2");
    name.textContent = `${producto.marca} ${producto.modelo}  $${producto.precio}`
    let img = document.createElement("img");
    img.src = producto.imagen;
    img.style.maxWidth = "300px"
    img.style.maxHeight = "300px"
    let boton = document.createElement("button")
    boton.innerText = "Agregar"
    //Evento para añadir objetos al arreglo carrito
    boton.addEventListener("click", () => {

        let productoElegido = ""
        productoElegido = new Producto(producto.codigo, producto.marca, producto.modelo, producto.precio, producto.imagen)
        agregarAlCarrito(productoElegido)
    })
//Hago appendchild de las cards
    ctn.appendChild(name)
    ctn.appendChild(img)
    ctn.appendChild(boton)
    divProductos.appendChild(ctn)
}

function funcionVaciarCarrito() {
    let divCarrito = document.getElementById("vaciarCarrito")
    let divCarrito2 = document.getElementById("carrito")
    //Creo el elemento y trabajo con sus propiedades
    let boton2 = document.createElement("button")
    boton2.innerText = "vaciar"
    boton2.addEventListener("click", () => {
        divCarrito2.innerHTML = "El carrito está vacío"
        //Vacío el arreglo carrito
        carrito = []
        //Actuaizo la información del localStorage
        guardarCarrito()
    })
    //Hago appendChild
    divCarrito.appendChild(boton2)
}

function funcionComprar() {

    let divCarrito = document.getElementById("vaciarCarrito")
    let divCarrito2 = document.getElementById("carrito")
    let boton3 = document.createElement("button")
    boton3.innerText = "Comprar"
//Añado evento para finalizar la compra 
    boton3.addEventListener("click", () => {
        if (carrito.length === 0) {

            Swal.fire('El carrito está vacío')
        } else {
            let detallesCarrito = carrito.map(producto =>`${producto.marca} ${producto.modelo} $${producto.precio}\n`)
//Uso libreria Sweet alert para confirm y alert
            Swal.fire({
                title: '¿Confirma la compra?',
                text: `Detalles de la compra:\n${detallesCarrito}\nPrecio total: $${precioFinal}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, comprar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        '¡Felicidades!',
                        'La compra fue realizada con éxito.',
                        'success'
                    )
                    divCarrito2.innerHTML = "El carrito está vacío"
                    carrito = []
                    guardarCarrito()
                }
            })

        }
    })

    divCarrito.appendChild(boton3)
}

function guardarCarrito() {
    let carritoJson = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJson)
}

function renderizarCarrito() {
    let divCarrito = document.getElementById("carrito")
    divCarrito.innerHTML = ""

    if (carrito.length === 0) {
        let divCarrito2 = document.createElement("div")
        divCarrito2.innerHTML = "El carrito está vacío"
        divCarrito.appendChild(divCarrito2)
    } else {
        for (let i = 0; i < carrito.length; i++) {
            let divCarrito2 = document.createElement("div")
            divCarrito2.innerHTML = `${carrito[i].marca} ${carrito[i].modelo}  $${carrito[i].precio}`
            divCarrito.appendChild(divCarrito2)

        }

    }


}

function agregarAlCarrito(producto) {
    carrito.push(producto)
    guardarCarrito()
    renderizarCarrito()
//Hago map para obtener el precio de cada objeto y reduce para sumarlos    
    let resumenCompra = carrito.map((element) => element.precio)
    precioFinal = resumenCompra.reduce((acumulador, elemento) => acumulador + elemento, 0)



}


function buscar(resultado){
//Añado elemento de tecla
    document.getElementById("buscador").addEventListener("keyup", () => {

    let q = document.getElementById("buscador").value
    //Comienzo a buscar después de que se tipeen dos letras
    if (q.length >= 2) {
        //Aplico filter para filtrar los objetos del arreglo
        let busqueda = resultado.filter(prod => prod.marca.toLowerCase().includes(q.toLowerCase()) || prod.modelo.toLowerCase().includes(q.toLowerCase()))
        console.log(busqueda)
        //Función que crea nuevas cards de los productos filtrados
        crear_caja_instrumento2(busqueda)
    }else if(q.length === 0){
        //Función que vuelve a mostrar todos los productos
        crear_caja_instrumento3(resultado)
    }


})
}

function crear_caja_instrumento2(busqueda) {
    let divProductos = document.getElementById("productos")
    divProductos.innerHTML = ""

    busqueda.forEach(producto =>{
        let ctn = document.createElement("div");
        let name = document.createElement("h2");
        name.textContent = `${producto.marca} ${producto.modelo}  $${producto.precio}`
        let img = document.createElement("img");
        img.src = producto.imagen;
        img.style.maxWidth = "300px"
        img.style.maxHeight = "300px"
        let boton = document.createElement("button")
        boton.innerText = "Agregar"
        boton.addEventListener("click", () => {
    
            let productoElegido = ""
            productoElegido = new Producto(producto.codigo, producto.marca, producto.modelo, producto.precio, producto.imagen)
            agregarAlCarrito(productoElegido)
        })
    
        ctn.appendChild(name)
        ctn.appendChild(img)
        ctn.appendChild(boton)
        divProductos.appendChild(ctn)
    
    })
}

function crear_caja_instrumento3(resultado) {
    let divProductos = document.getElementById("productos")
    divProductos.innerHTML = ""

    resultado.forEach(producto =>{
        let ctn = document.createElement("div");
        let name = document.createElement("h2");
        name.textContent = `${producto.marca} ${producto.modelo}  $${producto.precio}`
        let img = document.createElement("img");
        img.src = producto.imagen;
        img.style.maxWidth = "300px"
        img.style.maxHeight = "300px"
        let boton = document.createElement("button")
        boton.innerText = "Agregar"
        boton.addEventListener("click", () => {
    
            let productoElegido = ""
            productoElegido = new Producto(producto.codigo, producto.marca, producto.modelo, producto.precio, producto.imagen)
            agregarAlCarrito(productoElegido)
        })
    
        ctn.appendChild(name)
        ctn.appendChild(img)
        ctn.appendChild(boton)
        divProductos.appendChild(ctn)
    
    })
}
    