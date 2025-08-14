import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { BsPlusCircle, BsListUl, BsCheck2All } from 'react-icons/bs';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar glass d-flex flex-column shadow-sm" style={{ width: '260px', position: 'fixed' }}>
      <div className="brand mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="url(#g)" strokeWidth="1.5"/>
          <defs>
            <linearGradient id="g" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7c5cff"/>
              <stop offset="1" stopColor="#1dd3b0"/>
            </linearGradient>
          </defs>
        </svg>
        <span>Detta3D</span>
      </div>
      <Nav className="flex-column">
        <Nav.Item className="mb-2">
          <Link to="/" className={`btn ${isActive('/') ? 'btn-primary' : 'btn-outline-primary'} w-100 d-flex align-items-center`}>
            <BsPlusCircle className="me-2" /> Crear Pedido
          </Link>
        </Nav.Item>
        <Nav.Item className="mb-2">
          <Link to="/orders" className={`btn ${isActive('/orders') ? 'btn-primary' : 'btn-outline-primary'} w-100 d-flex align-items-center`}>
            <BsListUl className="me-2" /> Lista de Pedidos
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/completed" className={`btn ${isActive('/completed') ? 'btn-primary' : 'btn-outline-primary'} w-100 d-flex align-items-center`}>
            <BsCheck2All className="me-2" /> Completados
          </Link>
        </Nav.Item>
      </Nav>
      <div className="mt-auto text-muted small">
        <span>v1.0 · Futurist UI</span>
      </div>
    </aside>
  );
};

export default Sidebar;
