document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  
  if (!username || !email || !password) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  try {
    
    const response = await fetch('http://localhost:3000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
      // Respuesta exitosa
      const data = await response.json();
      alert('Registro exitoso');
      window.location.href = 'login.html';
    } else {
      // Manejo de errores del servidor
      const errorText = await response.json();
      alert(errorText.message || 'Error al registrarse');
    }
  } catch (error) {
    // Manejo de errores de conexión u otros problemas
    console.error('Error al registrarse:', error);
    alert('Hubo un problema al conectarse al servidor. Intenta de nuevo.');
  }
});