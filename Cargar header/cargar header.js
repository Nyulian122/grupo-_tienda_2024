document.addEventListener("DOMContentLoaded", function() {
    let div_header = document.querySelector(".header");
    div_header.innerHTML= `
    <div class="container">
        <!-- Icono como imagen -->
        <div class="logo">
            <img src="tu_icono.png" alt="Logo">
        </div>
        <!-- Barra de búsqueda -->
        <div class="search">
            <input type="text" placeholder="Buscar...">
            <button><i class="fas fa-search"></i></button>
        </div>
        <!-- Opciones de cuenta, carrito e iniciar sesión con iconos independientes -->
        <div class="options">
            <a href="#"><i class="fas fa-user"></i> Cuenta</a>
            <a href="#" class="carrito"><i class="fas fa-shopping-cart"></i> Carrito</a>
            <a href="#"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</a>
        </div>
    </div>
    `;

    // Agregar estructura del modal al cuerpo del HTML
    document.body.innerHTML += `
    <div id="carritoModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Tu Carrito</h2>
            <div id="carritoItems"></div>
        </div>
    </div>
    `;

    const carritoIcon = document.querySelector('.carrito');
    const modal = document.getElementById("carritoModal");
    const span = document.getElementsByClassName("close")[0];

    carritoIcon.onclick = function() {
        cargarCarrito();
        modal.style.display = "block";  
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    async function cargarCarrito() {
        try {
            const res = await fetch('https://fakestoreapi.com/carts/user/2');
            const buscar = await res.json();
            imprimirCarrito(buscar);
            console.log(buscar);
        } catch (error) {
            console.log("error", error);
        }
    }

    function imprimirCarrito(listaCarrito) {
        let carritoItems = document.getElementById("carritoItems");
        carritoItems.innerHTML = ''; // Limpiar contenido previo
        listaCarrito.forEach(element => {
            let div = document.createElement("div");
            div.innerHTML = `
            <div>${element.products}</div>
            <p>Producto: ${element.id} - Cantidad: ${element.userId}</p>`;
            carritoItems.appendChild(div);
        });
    }
});
