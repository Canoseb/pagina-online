document.addEventListener('DOMContentLoaded', async () => {
    const orderHistoryElement = document.getElementById('order-history');
    const token = localStorage.getItem('token'); // Obtenemos el token de sesión del usuario

    if (!token) {
        alert('Por favor, inicia sesión para acceder a tu cuenta.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/ordenes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const orders = await response.json();

            if (orders.length === 0) {
                orderHistoryElement.innerHTML = '<li>No tienes pedidos registrados.</li>';
                return;
            }

            orders.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `Pedido #${order.id}: ${order.items.join(', ')} - Total: $${order.total}`;
                orderHistoryElement.appendChild(li);
            });
        } else {
            alert('Hubo un problema al cargar tu historial de pedidos.');
        }
    } catch (error) {
        console.error('Error al cargar el historial de pedidos:', error);
        alert('No se pudo conectar con el servidor.');
    }
});