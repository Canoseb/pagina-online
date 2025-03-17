document.addEventListener('DOMContentLoaded', () => {
    // Array para almacenar los productos en el carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para agregar un producto al carrito
    function agregarAlCarrito(productId, nombre, precio) {
        const productoExistente = carrito.find(item => item.productId === productId);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            const producto = { productId, nombre, precio, cantidad: 1 };
            carrito.push(producto);
        }
        console.log(carrito); 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Función para actualizar el carrito en la página del carrito de compras
    function actualizarCarrito() {
        const tablaCarrito = document.querySelector('tbody');
        if (!tablaCarrito) return; // Si la tabla no existe, salir de la función

        tablaCarrito.innerHTML = '';

        carrito.forEach((producto, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio * producto.cantidad}</td>
                <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
            `;
            tablaCarrito.appendChild(fila);
        });

        // Actualizar el total
        const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
        const totalElement = document.querySelector('.total h3');
        if (totalElement) {
            totalElement.textContent = `Total: $${total}`;
        }

        // Vincular botones de eliminar
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                const index = boton.getAttribute('data-index');
                eliminarDelCarrito(index);
            });
        });
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Agregar eventos a los botones de "Agregar al Carrito"
    document.querySelectorAll('.producto button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.parentElement.dataset.productId;
            const nombre = button.parentElement.querySelector('h3').textContent;
            const precio = parseFloat(button.parentElement.querySelector('p').textContent.replace('$', '').replace('.', ''));
            agregarAlCarrito(productId, nombre, precio);
        });
    });

    // Funcionalidad del botón "Proceder al Pago"
    const botonPagar = document.getElementById('pagar-btn');

    if (botonPagar) {
        botonPagar.addEventListener('click', () => {
            const token = localStorage.getItem('token');
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            if (!token) {
                alert('Debes iniciar sesión antes de proceder al pago.');
                window.location.href = 'login.html'; // Redirige al usuario al inicio de sesión
                return;
            }

            if (carrito.length === 0) {
                alert('El carrito está vacío. Agrega productos antes de proceder al pago.');
                return;
            }

            alert('Procediendo al pago...');
        });
    }

    // Inicializar el carrito al cargar la página
    actualizarCarrito();
});
