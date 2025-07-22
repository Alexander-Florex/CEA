        // Crear partículas flotantes
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Tamaño aleatorio entre 5px y 15px
                const size = Math.random() * 10 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Posición inicial aleatoria
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100 + 100}%`;
                
                // Duración de animación aleatoria entre 10s y 20s
                const duration = Math.random() * 10 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Retraso inicial aleatorio
                particle.style.animationDelay = `${Math.random() * 5}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Efecto ripple en las tarjetas
        document.querySelectorAll('.dashboard-card').forEach(element => {
            element.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Animación de cierre de sesión
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            
            const icon = this.querySelector('i');
            const originalText = this.textContent;
            
            icon.classList.remove('fa-sign-out-alt');
            icon.classList.add('fa-spinner', 'fa-spin');
            this.textContent = ' Cerrando sesión...';
            
            // Simular cierre de sesión
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
        
        // Inicializar partículas al cargar la página
        window.addEventListener('load', () => {
            createParticles();
            
            // Mostrar tarjetas con animación escalonada
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100 + 300);
            });
        });