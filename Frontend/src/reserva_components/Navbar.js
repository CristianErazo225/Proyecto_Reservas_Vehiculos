import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={styles.navbar}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={styles.brand}>GoReserve</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Reservas */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/reservas" style={styles.link}>
                                <i className="bi bi-calendar-check"></i> Reservas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reserva/crear" style={styles.link}>
                                <i className="bi bi-calendar-plus"></i> Crear Reserva
                            </Link>
                        </li>

                        {/* Facturas */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/facturas" style={styles.link}>
                                <i className="bi bi-file-earmark-earbuds"></i> Facturas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/factura/crear" style={styles.link}>
                                <i className="bi bi-file-earmark-plus"></i> Crear Factura
                            </Link>
                        </li>

                        {/* Clientes */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/clientes" style={styles.link}>
                                <i className="bi bi-person-circle"></i> Clientes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cliente/crear" style={styles.link}>
                                <i className="bi bi-person-plus"></i> Crear Cliente
                            </Link>
                        </li>

                        {/* Vehículos */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/vehiculos" style={styles.link}>
                                <i className="bi bi-car"></i> Vehículos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vehiculo/crear" style={styles.link}>
                                <i className="bi bi-car-front"></i> Crear Vehículo
                            </Link>
                        </li>

                        {/* Mantenimientos */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/mantenimientos" style={styles.link}>
                                <i className="bi bi-tools"></i> Mantenimientos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mantenimiento/crear" style={styles.link}>
                                <i className="bi bi-wrench"></i> Crear Mantenimiento
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        backgroundColor: '#4E73DF',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
    },
    brand: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },
    link: {
        color: '#fff',
        padding: '10px 15px',
        fontSize: '1.1rem',
        fontWeight: '500',
        borderRadius: '5px',
        transition: 'all 0.3s ease',
    },
    linkActive: {
        backgroundColor: '#2C3E50',
        color: '#fff',
    },
};

export default Navbar;
