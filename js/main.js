import { Cargar_categorias } from "../Cargar categorias /cargarr_categorias.js";
import { cargar_producto } from "../Cargar productos/cargar productos.js";
let div_principal = document.querySelector(".root");



div_principal.innerHTML = `
<header class="header"></header>
<main class="principal"></main>
<div class="categorias"></div>
<footer class="footer"></footer>
`;
Cargar_categorias()


async function funcion_asincronica(){

    try{
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json();
        cargar_producto(data) 
    }catch(error){
        console.error("Error ", error);
    }



}
funcion_asincronica()