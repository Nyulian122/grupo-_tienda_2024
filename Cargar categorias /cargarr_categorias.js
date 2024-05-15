function Cargar_categorias(){
    async function cargar_categorias(){
        try{
            const res = await fetch('https://fakestoreapi.com/products/categories');
            const categorias = await res.json();
            imprimir_categorias(categorias)
            
            
        }catch{error}
    }
    cargar_categorias()
}

function imprimir_categorias(lista_categorias) {
    let div_categorias = document.querySelector(".categorias")
    
    lista_categorias.forEach(element => {
        
        let div = document.createElement("div")
        div.classList = "item_categoria"
        div.innerHTML = `
        <input  type="checkbox" class="cuadro" id="${element}" >
        <label for="${element}" class="txt"> ${element} </label >
        `

        div_categorias.appendChild(div)
    });
}

export {Cargar_categorias}
