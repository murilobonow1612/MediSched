import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {

    return (
        <header className="navbar" id="main-header">
            <nav className="navbar-menu">
                <ul>
                    <li> <input type="checkbox" id="checkbox" />
                        <label htmlFor="checkbox" className="toggle">
                            <div className="bars" id="bar1"></div>
                            <div className="bars" id="bar2"></div>
                            <div className="bars" id="bar3"></div>
                        </label></li>
                    <li> <Link to="/login" className="nav-link">Login e cadastro</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Navbar;