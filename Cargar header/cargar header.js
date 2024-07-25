document.addEventListener("DOMContentLoaded", function() {
    let div_header = document.querySelector(".header");
    div_header.innerHTML = `
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
            <a href="#" class="account"><i class="fas fa-user"></i> Cuenta</a>
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
    const spanCarrito = modalCarrito.querySelector(".close");

    carritoIcon.onclick = async function() {
        await cargarCarrito();
        modalCarrito.style.display = "block";  
    }

    spanCarrito.onclick = function() {
        modalCarrito.style.display = "none";
    }

    const iniciarSesionIcon = document.querySelector('.iniciar-sesion');
    const modalLogin = document.getElementById("loginModal");
    const spanLogin = modalLogin.querySelector(".close");

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

    // Cerrar los modales al hacer clic fuera del contenido del modal
    window.onclick = function(event) {
        if (event.target == modalCarrito) {
            modalCarrito.style.display = "none";
        } else if (event.target == modalLogin) {
            modalLogin.style.display = "none";
        }
    };
});

async function cargarCarrito() {
    try {
        let respuesta = await fetch('https://fakestoreapi.com/products?limit=2');
        let datos = await respuesta.json();

        // Limpiar el contenido actual de carritoItems
        let carritoItems = document.getElementById("carritoItems");
        carritoItems.innerHTML = '';    

        // Crear un div por cada item y añadirlo a carritoItems
        datos.forEach(item => {
            let itemDiv = document.createElement("div");
            itemDiv.className = "carrito-item";

            // Tomar solo las primeras cinco palabras del título para el texto corto
            const shortText = item.title.split(' ').slice(0, 5).join(' ');

            // Usar plantillas literales para el contenido del div
            itemDiv.innerHTML = `
                <div class="box_img">
                    <img src="${item.image}" alt="${shortText}">
                </div>
                <div class="caja_descri">
                    <span class="name">${shortText}</span>
                    <span class="price">Q${item.price}</span>
                </div>
            `;
            carritoItems.appendChild(itemDiv);
        });

        console.log("Datos cargados correctamente en el carrito");
    } catch (error) {
        console.log("Error al cargar el carrito:", error);
    }
}

function inicializarCarritoModal() {
    // Añadir el HTML del modal al body
    document.body.insertAdjacentHTML('beforeend', `
        <!-- Modal -->
        <div id="carritoModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Tu Carrito de Compras</h2>
                <div id="carritoItems"></div>
            </div>
        </div>
    `);

    // Obtener elementos del modal
    let modal = document.getElementById("carritoModal");
    let span = document.getElementsByClassName("close")[0];

    // Abrir el modal al hacer clic en el icono del carrito
    document.querySelector(".carrito").addEventListener("click", function() {
        cargarCarrito();  // Cargar el contenido del carrito
        modal.style.display = "block";
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    span.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}
