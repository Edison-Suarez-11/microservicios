<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Sistema de Alquiler de Vehículos</title>
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>
<body>
    <div id="mensaje-container"></div>
    <header class="header">
        <nav class="nav-main">
            <h1 class="logo">RentCar</h1>
            <ul class="nav-links">
                <li><a href="#vehiculos">Vehículos</a></li>
                <li><a href="#clientes">Clientes</a></li>
                <li><a href="#reservas">Reservas</a></li>
            </ul>
        </nav>
    </header>

    <main class="main-content">
        <section id="vehiculos" class="section">
            <h2>Gestión de Vehículos</h2>
            <div class="card-container">
                <div class="form-container">
                    <h3>Registrar Vehículo</h3>
                    <form id="vehiculo-form">
                        <input type="text" name="marca" placeholder="Marca" required>
                        <input type="text" name="modelo" placeholder="Modelo" required>
                        <input type="number" name="anio" placeholder="Año" required>
                        <select name="categoria" required>
                            <option value="">Seleccione categoría</option>
                            <option value="economico">Económico</option>
                            <option value="intermedio">Intermedio</option>
                            <option value="lujo">Lujo</option>
                        </select>
                        <button type="submit">Registrar Vehículo</button>
                    </form>
                </div>
                <div class="list-container">
                    <h3>Vehículos Disponibles</h3>
                    <div id="vehiculos-lista" class="lista"></div>
                </div>
            </div>
        </section>

        <section id="clientes" class="section">
            <h2>Gestión de Clientes</h2>
            <div class="card-container">
                <div class="form-container">
                    <h3>Registrar Cliente</h3>
                    <form id="cliente-form">
                        <input type="text" name="nombre" placeholder="Nombre completo" required>
                        <input type="tel" name="telefono" placeholder="Teléfono" required>
                        <input type="email" name="correo" placeholder="Correo electrónico" required>
                        <input type="text" name="numero_licencia" placeholder="Número de licencia" required>
                        <button type="submit">Registrar Cliente</button>
                    </form>
                </div>
                <div class="list-container">
                    <h3>Lista de Clientes</h3>
                    <div id="clientes-lista" class="lista"></div>
                </div>
            </div>
        </section>

        <section id="reservas" class="section">
            <h2>Gestión de Reservas</h2>
            <div class="card-container">
                <div class="form-container">
                    <h3>Nueva Reserva</h3>
                    <form id="reserva-form">
                        <select name="cliente_id" required>
                            <option value="">Seleccione cliente</option>
                        </select>
                        <select name="vehiculo_id" required>
                            <option value="">Seleccione vehículo</option>
                        </select>
                        <input type="date" name="fecha_inicio" required>
                        <input type="date" name="fecha_fin" required>
                        <button type="submit">Crear Reserva</button>
                    </form>
                </div>
                <div class="list-container">
                    <h3>Reservas Activas</h3>
                    <div id="reservas-lista" class="lista"></div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Sistema de Alquiler de Vehículos</p>
    </footer>

    <script>
        const API_URL = '{{ url('api') }}';
    </script>
    <script src="{{ asset('js/main.js') }}"></script>
</body>
</html> 