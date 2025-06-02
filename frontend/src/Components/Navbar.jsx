import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log('Tipo de usuário:', parsedUser.tipo);
                setUser(parsedUser);
            } catch (e) {
                console.error("Erro ao parsear user:", e);
            }
        }
    }, []);

    if (!user) return null;

    const isMedico = user?.especialidade !== undefined;

    return (
        <header className="navbar" id="main-header">
            <nav className="navbar-menu">
                <ul>
                    <div className='logo'>MediSched</div>

                    {!isMedico && (
                        <li><Link to="/" className="nav-link">Home</Link></li>
                    )}

                    <li><Link to="/listagem-consultas" className="nav-link">Lista de consultas</Link></li>

                    {!isMedico && (
                        <li><Link to="/agendar-consulta" className="nav-link">Agendar Consulta</Link></li>
                    )}

                    <li><Link to="/login" className="nav-link">Sair</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
