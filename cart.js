document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    document.querySelectorAll('.btn_coomprar').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.item_producto');
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = productElement.querySelector('.price').innerText;

            const product = { name: productName, price: productPrice };

            cart.push(product);
            updateCartUI();
        });
    });

    function updateCartUI() {
        const cartCountElement = document.querySelector('#cart-count');
        cartCountElement.innerText = cart.length;
    }
});
