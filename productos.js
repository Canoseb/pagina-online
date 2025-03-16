document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones "Agregar al Carrito"
    const buttons = document.querySelectorAll('.add-to-cart');
    
    // Asigna un evento 'click' a cada botón
    buttons.forEach(button => {
        button.addEventListener('click', async (event) => {
            // Identifica el producto relacionado al botón
            const productElement = event.target.closest('.producto');
            const productId = productElement.dataset.productId; // ID del producto
            const productName = productElement.querySelector('h3').textContent; // Nombre del producto
            const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', '').replace('.', '')); // Precio del producto
            
            // Crea un objeto del producto
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1 // Cantidad predeterminada de 1 al agregar al carrito
            };

            try {
                // Obtiene el token de sesión desde localStorage
                const token = localStorage.getItem('token');

                // Verifica si el usuario está autenticado
                if (!token) {
                    alert('Debes iniciar sesión antes de agregar productos al carrito.');
                    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
                    return;
                }

                // Envía el producto al servidor
                const response = await fetch('http://localhost:3000/carrito', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Envía el token en el encabezado
                    },
                    body: JSON.stringify({ product }) // Envía el producto en el cuerpo
                });

                if (response.ok) {
                    alert(`¡${product.name} Agregado al carrito!`);
                } else {
                    const errorData = await response.json();
                    alert(`Error al agregar al carrito: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error al agregar el producto al carrito:', error);
                alert('No se pudo conectar con el servidor. Por favor, inténtalo más tarde.');
            }
        });
    });
});