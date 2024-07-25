function cargar_producto(productos_list) {
    let div_producto_list = document.querySelector(".principal");
    div_producto_list.innerHTML = ""; // Clear the current product list

    productos_list.forEach(producto => {
        let div = document.createElement("div");
        div.classList = "item_producto";

        let short_text = producto.title.split(' ').slice(0, 5).join(' ');

        div.innerHTML = `
            <div class="img">
                <img src="${producto.image}" alt="">
            </div>        
            <div class="box_description">
                <span class="name">${short_text}</span>
                <div class="buy_btn" id="${producto.id}"></div>
                <span class="price">$${producto.price}</span>
                <span class="btn_comprar">Comprar</span>
            </div>
        `;
        div_producto_list.appendChild(div);
    });
}

export { cargar_producto };

async function Cargar_categorias() {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const categorias = await res.json();
        imprimir_categorias(categorias);
    } catch (error) {
        console.error(error);
    }
}

function imprimir_categorias(lista_categorias) {
    let div_categorias = document.querySelector(".categorias");
    div_categorias.innerHTML = ""; // Clear the current category list

    lista_categorias.forEach(element => {
        let div = document.createElement("div");
        div.classList = "item_categoria";
        div.innerHTML = `
            <input type="checkbox" class="cuadro" id="${element}" >
            <label for="${element}" class="txt"> ${element} </label>
        `;
        div_categorias.appendChild(div);

        // Add event listener to load products based on selected category
        div.querySelector('.cuadro').addEventListener('change', (event) => {
            if (event.target.checked) {
                cargar_productos_por_categoria(element);
            }
        });
    });
}

async function cargar_productos_por_categoria(categoria) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${categoria}`);
        const productos = await res.json();
        cargar_producto(productos);
    } catch (error) {
        console.error(error);
    }
}

export { Cargar_categorias };
