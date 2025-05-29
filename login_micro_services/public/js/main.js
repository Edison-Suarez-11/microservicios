// Configuración de la API
const API_URL = '/api';

// Funciones de utilidad
const mostrarMensaje = (mensaje, tipo) => {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje mensaje-${tipo}`;
    mensajeDiv.textContent = mensaje;
    
    const contenedor = document.getElementById('mensaje-container');
    const mensajeExistente = contenedor.querySelector('.mensaje');
    if (mensajeExistente) {
        mensajeExistente.remove();
    }
    
    contenedor.appendChild(mensajeDiv);
    
    setTimeout(() => {
        mensajeDiv.style.opacity = '0';
        setTimeout(() => mensajeDiv.remove(), 300);
    }, 5000);
};

const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
};

const manejarError = async (response) => {
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error en la operación');
    }
    return response.json();
};

// Gestión de Vehículos
const cargarVehiculos = async () => {
    try {
        const response = await fetch(`${API_URL}/vehiculos`);
        const vehiculos = await manejarError(response);
        const listaVehiculos = document.getElementById('vehiculos-lista');
        listaVehiculos.innerHTML = '';
        
        if (vehiculos.length === 0) {
            listaVehiculos.innerHTML = '<p class="mensaje mensaje-info">No hay vehículos registrados</p>';
            return;
        }
        
        vehiculos.forEach(vehiculo => {
            const elemento = document.createElement('div');
            elemento.className = 'lista-item';
            elemento.innerHTML = `
                <h4>${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.anio})</h4>
                <p>Categoría: ${vehiculo.categoria}</p>
                <p class="estado-${vehiculo.estado.toLowerCase()}">Estado: ${vehiculo.estado}</p>
            `;
            listaVehiculos.appendChild(elemento);
        });

        // Actualizar select de vehículos en el formulario de reservas
        const selectVehiculos = document.querySelector('select[name="vehiculo_id"]');
        selectVehiculos.innerHTML = '<option value="">Seleccione vehículo</option>';
        vehiculos.filter(v => v.estado === 'disponible').forEach(vehiculo => {
            selectVehiculos.innerHTML += `<option value="${vehiculo.id}">${vehiculo.marca} ${vehiculo.modelo}</option>`;
        });
    } catch (error) {
        mostrarMensaje('Error al cargar los vehículos: ' + error.message, 'error');
    }
};

// Gestión de Clientes
const cargarClientes = async () => {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        const clientes = await manejarError(response);
        const listaClientes = document.getElementById('clientes-lista');
        listaClientes.innerHTML = '';
        
        if (clientes.length === 0) {
            listaClientes.innerHTML = '<p class="mensaje mensaje-info">No hay clientes registrados</p>';
            return;
        }
        
        clientes.forEach(cliente => {
            const elemento = document.createElement('div');
            elemento.className = 'lista-item';
            elemento.innerHTML = `
                <h4>${cliente.nombre}</h4>
                <p>Teléfono: ${cliente.telefono}</p>
                <p>Correo: ${cliente.correo}</p>
                <p>Licencia: ${cliente.numero_licencia}</p>
            `;
            listaClientes.appendChild(elemento);
        });

        // Actualizar select de clientes en el formulario de reservas
        const selectClientes = document.querySelector('select[name="cliente_id"]');
        selectClientes.innerHTML = '<option value="">Seleccione cliente</option>';
        clientes.forEach(cliente => {
            selectClientes.innerHTML += `<option value="${cliente.id}">${cliente.nombre}</option>`;
        });
    } catch (error) {
        mostrarMensaje('Error al cargar los clientes: ' + error.message, 'error');
    }
};

// Gestión de Reservas
const cargarReservas = async () => {
    try {
        const response = await fetch(`${API_URL}/reservas`);
        const reservas = await manejarError(response);
        const listaReservas = document.getElementById('reservas-lista');
        listaReservas.innerHTML = '';
        
        if (reservas.length === 0) {
            listaReservas.innerHTML = '<p class="mensaje mensaje-info">No hay reservas registradas</p>';
            return;
        }
        
        reservas.forEach(reserva => {
            const elemento = document.createElement('div');
            elemento.className = 'lista-item';
            elemento.innerHTML = `
                <h4>Reserva #${reserva.id}</h4>
                <p>Cliente: ${reserva.cliente_nombre}</p>
                <p>Vehículo: ${reserva.vehiculo_marca} ${reserva.vehiculo_modelo}</p>
                <p>Fecha inicio: ${formatearFecha(reserva.fecha_inicio)}</p>
                <p>Fecha fin: ${formatearFecha(reserva.fecha_fin)}</p>
                <p class="estado-${reserva.estado.toLowerCase()}">Estado: ${reserva.estado}</p>
            `;
            listaReservas.appendChild(elemento);
        });
    } catch (error) {
        mostrarMensaje('Error al cargar las reservas: ' + error.message, 'error');
    }
};

// Event Listeners para formularios
document.getElementById('vehiculo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const vehiculoData = Object.fromEntries(formData.entries());
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
        const response = await fetch(`${API_URL}/vehiculos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(vehiculoData),
        });
        
        await manejarError(response);
        mostrarMensaje(`¡Éxito! Se ha registrado el vehículo ${vehiculoData.marca} ${vehiculoData.modelo}`, 'exito');
        e.target.reset();
        cargarVehiculos();
    } catch (error) {
        mostrarMensaje('Error al registrar el vehículo: ' + error.message, 'error');
    } finally {
        submitButton.disabled = false;
    }
});

document.getElementById('cliente-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const clienteData = Object.fromEntries(formData.entries());
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
        const response = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(clienteData),
        });
        
        await manejarError(response);
        mostrarMensaje(`¡Éxito! Se ha registrado el cliente ${clienteData.nombre}`, 'exito');
        e.target.reset();
        cargarClientes();
    } catch (error) {
        mostrarMensaje('Error al registrar el cliente: ' + error.message, 'error');
    } finally {
        submitButton.disabled = false;
    }
});

document.getElementById('reserva-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reservaData = Object.fromEntries(formData.entries());
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
        const response = await fetch(`${API_URL}/reservas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(reservaData),
        });
        
        await manejarError(response);
        mostrarMensaje('¡Éxito! Se ha creado la reserva correctamente', 'exito');
        e.target.reset();
        cargarReservas();
        cargarVehiculos();
    } catch (error) {
        mostrarMensaje('Error al crear la reserva: ' + error.message, 'error');
    } finally {
        submitButton.disabled = false;
    }
});

// Cargar datos iniciales
window.addEventListener('load', () => {
    cargarVehiculos();
    cargarClientes();
    cargarReservas();
}); 