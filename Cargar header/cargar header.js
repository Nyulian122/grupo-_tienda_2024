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
    <a href="#"><i class="fas fa-shopping-cart carrito" ></i> Carrito</a>
    <a href="#"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</a>
</div>
</div>
`;
async function carrito(){

    try{
        const res = await fetch('https://fakestoreapi.com/carts/user/2');
        const buscar = await res.json();
        console.log("correcto");
    }catch(error){
        console.log("error",error);
    }
}
export {carrito};
document.querySelector(".carrito").addEventListener("click", carrito )

