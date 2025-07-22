// login.js

// Simulación de usuarios y roles
const users = {
    'usuario1': { password: 'pass1', role: 'personal' },
    'usuario2': { password: 'pass2', role: 'personal-avanzado' },
    'admin': { password: 'adminpass', role: 'admin' }
};

// Manejo del evento de envío del formulario
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        showError('Por favor complete todos los campos');
        return;
    }
    
    const button = document.querySelector('button');
    const originalButtonText = button.innerHTML;
    button.innerHTML = '<span class="spinner"></span> Verificando...';
    button.disabled = true;
    
    // Simulación de verificación de credenciales
    try {
        // Simulando un retraso como si se estuviera conectando a una base de datos
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar credenciales
        if (users[username] && users[username].password === password) {
            // Redirigir según el rol
            const redirectUrl = {
                'personal': 'personal.html',
                'personal-avanzado': 'personal-avanzado.html',
                'admin': 'admin.html'
            }[users[username].role];
            
            window.location.href = redirectUrl;
        } else {
            showError('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error de conexión con el servidor');
    } finally {
        button.innerHTML = originalButtonText;
        button.disabled = false;
    }
});

function showError(message) {
    let errorElement = document.getElementById('error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.margin = '10px 0';
        errorElement.style.textAlign = 'center';
        document.querySelector('form').appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    
    // Auto-ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        errorElement.textContent = '';
    }, 5000);
}
