document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Por favor, completa todos los campos antes de iniciar sesión.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda el token en localStorage
            localStorage.setItem('token', data.token);
            alert('Inicio de sesión exitoso');
            // Redirige al index
            window.location.href = 'index.html';
        } else {
            alert(data.message || 'Error al iniciar sesión.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('No se pudo conectar al servidor.');
    }
});