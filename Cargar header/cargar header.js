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
            <a href="#" class="iniciar-sesion"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</a>
        </div>
    </div>
    `;

    // Agregar estructura del modal del carrito al cuerpo del HTML
    document.body.innerHTML += `
    <div id="carritoModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Tu Carrito</h2>
            <div id="carritoItems"></div>
        </div>
    </div>
    `;

    // Agregar estructura del modal de inicio de sesión al cuerpo del HTML
    document.body.innerHTML += `
    <div id="loginModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Iniciar Sesión</h2>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Nombre de usuario">
                <input type="password" id="password" placeholder="Contraseña">
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
    `;

    const carritoIcon = document.querySelector('.carrito');
    const modalCarrito = document.getElementById("carritoModal");
    const spanCarrito = document.getElementsByClassName("close")[0];

    carritoIcon.onclick = async function() {
        await cargarCarrito();
        modalCarrito.style.display = "block";  
    }

    spanCarrito.onclick = function() {
        modalCarrito.style.display = "none";
    }

    // Función para cargar el carrito
    async function cargarCarrito() {
        try {
            const res = await fetch('https://fakestoreapi.com/carts/user/2');
            const listaCarrito = await res.json();
            imprimirCarrito(listaCarrito);
        } catch (error) {
            console.log("error", error);
        }
    }

    // Función para imprimir el carrito en la ventana modal
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

    const iniciarSesionIcon = document.querySelector('.iniciar-sesion');
    const modalLogin = document.getElementById("loginModal");
    const spanLogin = document.getElementsByClassName("close")[1];

    iniciarSesionIcon.onclick = function() {
        modalLogin.style.display = "block";  
    }

    spanLogin.onclick = function() {
        modalLogin.style.display = "none";
    }

    // Escuchar el envío del formulario de inicio de sesión
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario
        // Aquí puedes agregar la lógica para procesar el inicio de sesión
        // Por ahora, simplemente cerramos la ventana modal
        modalLogin.style.display = "none";
    });
});
