        // Datos de ejemplo
        const sampleUsers = [
            {
                id: 1,
                firstName: "Ana",
                lastName: "Gómez",
                username: "ana.gomez",
                password: "••••••••",
                email: "ana.gomez@example.com",
                role: "admin"
            },
            {
                id: 2,
                firstName: "Carlos",
                lastName: "Martínez",
                username: "carlos.m",
                password: "••••••••",
                email: "carlos@example.com",
                role: "personal"
            },
            {
                id: 3,
                firstName: "Luisa",
                lastName: "Fernández",
                username: "luisa.f",
                password: "••••••••",
                email: "luisa@example.com",
                role: "avanzado"
            }
        ];
        
        // Variables globales
        let users = [];
        let currentSortColumn = null;
        let sortDirection = 1; // 1 para ascendente, -1 para descendente
        let nextId = sampleUsers.length > 0 ? Math.max(...sampleUsers.map(user => user.id)) + 1 : 1;
        
        // Elementos del DOM
        const usersTable = document.getElementById('usersTable');
        const usersTableBody = usersTable.querySelector('tbody');
        const searchInput = document.getElementById('searchInput');
        const newUserBtn = document.getElementById('newUserBtn');
        const userModal = document.getElementById('userModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const userForm = document.getElementById('userForm');
        const logoutBtn = document.getElementById('logoutBtn');
        
        // Inicializar la aplicación
        function init() {
            createParticles();
            loadUsers();
            setupEventListeners();
        }
        
        // Crear partículas flotantes
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 10 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100 + 100}%`;
                
                const duration = Math.random() * 10 + 10;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Cargar usuarios
        function loadUsers() {
            // En una aplicación real, aquí harías una petición AJAX
            users = [...sampleUsers];
            renderUsers(users);
        }
        
        // Renderizar usuarios en la tabla
        function renderUsers(usersToRender) {
            usersTableBody.innerHTML = '';
            
            if (usersToRender.length === 0) {
                const row = document.createElement('tr');
                row.className = 'empty-row';
                row.innerHTML = '<td colspan="8" class="empty-message">No se encontraron usuarios</td>';
                usersTableBody.appendChild(row);
                return;
            }
            
            usersToRender.forEach(user => {
                const row = document.createElement('tr');
                
                // Formatear el rol para mostrarlo mejor
                let roleDisplay;
                switch(user.role) {
                    case 'admin': roleDisplay = 'Administrador'; break;
                    case 'personal': roleDisplay = 'Personal'; break;
                    case 'avanzado': roleDisplay = 'Avanzado'; break;
                    default: roleDisplay = user.role;
                }
                
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.email}</td>
                    <td>${roleDisplay}</td>
                    <td class="actions-cell">
                        <button class="btn-icon btn-edit" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-delete" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                
                usersTableBody.appendChild(row);
            });
        }
        
        // Configurar event listeners
        function setupEventListeners() {
            // Botón nuevo usuario
            newUserBtn.addEventListener('click', () => {
                userModal.classList.add('active');
                userForm.reset();
            });
            
            // Cerrar modal
            closeModalBtn.addEventListener('click', closeModal);
            cancelBtn.addEventListener('click', closeModal);
            
            // Clic fuera del modal para cerrar
            userModal.addEventListener('click', (e) => {
                if (e.target === userModal) {
                    closeModal();
                }
            });
            
            // Enviar formulario
            userForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const newUser = {
                    id: nextId++,
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    username: document.getElementById('username').value,
                    password: '••••••••', // En una app real, esto sería un hash
                    email: document.getElementById('email').value,
                    role: document.getElementById('role').value
                };
                
                // Agregar el nuevo usuario
                users.unshift(newUser);
                renderUsers(users);
                closeModal();
                
                // Mostrar notificación (simulada)
                alert('Usuario creado exitosamente');
            });
            
            // Buscar usuarios
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                if (searchTerm === '') {
                    renderUsers(users);
                    return;
                }
                
                const filteredUsers = users.filter(user => 
                    user.firstName.toLowerCase().includes(searchTerm) ||
                    user.lastName.toLowerCase().includes(searchTerm) ||
                    user.username.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm) ||
                    user.role.toLowerCase().includes(searchTerm)
                );
                
                renderUsers(filteredUsers);
            });
            
            // Ordenar columnas
            document.querySelectorAll('th').forEach((th, index) => {
                if (index < 7) { // Las primeras 7 columnas son ordenables (incluyendo ID)
                    th.addEventListener('click', () => {
                        sortTable(index);
                    });
                }
            });
            
            // Cerrar sesión
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const icon = logoutBtn.querySelector('i');
                const originalText = logoutBtn.textContent;
                
                icon.classList.remove('fa-sign-out-alt');
                icon.classList.add('fa-spinner', 'fa-spin');
                logoutBtn.textContent = ' Volviendo a inicio...';
                
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1500);
            });
        }
        
        // Cerrar modal
        function closeModal() {
            userModal.classList.remove('active');
        }
        
        // Ordenar tabla
        function sortTable(columnIndex) {
            const headers = document.querySelectorAll('th');
            const header = headers[columnIndex];
            
            // Resetear iconos en todas las columnas
            headers.forEach(h => {
                const icon = h.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-sort';
                }
            });
            
            // Determinar dirección de ordenamiento
            if (currentSortColumn === columnIndex) {
                sortDirection *= -1;
            } else {
                currentSortColumn = columnIndex;
                sortDirection = 1;
            }
            
            // Actualizar icono
            const icon = header.querySelector('i');
            icon.className = sortDirection === 1 ? 'fas fa-sort-down' : 'fas fa-sort-up';
            
            // Ordenar usuarios
            users.sort((a, b) => {
                let valueA, valueB;
                
                switch(columnIndex) {
                    case 0: valueA = a.id; valueB = b.id; break;
                    case 1: valueA = a.firstName; valueB = b.firstName; break;
                    case 2: valueA = a.lastName; valueB = b.lastName; break;
                    case 3: valueA = a.username; valueB = b.username; break;
                    case 4: valueA = a.password; valueB = b.password; break;
                    case 5: valueA = a.email; valueB = b.email; break;
                    case 6: valueA = a.role; valueB = b.role; break;
                }
                
                if (valueA < valueB) return -1 * sortDirection;
                if (valueA > valueB) return 1 * sortDirection;
                return 0;
            });
            
            renderUsers(users);
        }
        
        // Iniciar la aplicación cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', init);