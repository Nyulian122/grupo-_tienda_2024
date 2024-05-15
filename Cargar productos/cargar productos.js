
function cargar_producto(productos_list) {
    let div_producto_list = document.querySelector(".principal")
 

    productos_list.forEach(producto => {
        let div = document.createElement("div")
        div.classList = "item_producto"

        let short_text = producto.title.split(' ').slice(0, 5).join(' ');

        div.innerHTML = `
        <div class="img">
        <img src="${producto.image}" alt="">
    </div>        
    <div class="box_description">
        <span class="name">${short_text}</span>
        
        <div class="buy_btn" id="${producto.id}"></div>
        <span class="price">$${producto.price}</span>
        <span class="btn_coomprar">Comprar</span>

        
    </div>
        `
        div_producto_list.appendChild(div)

    });

}




export {cargar_producto}