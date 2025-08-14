import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';

const DashboardLayout = ({ currentView, onViewChange, children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <h2>Nombre Empresa</h2>
          <Button 
            variant={currentView === 'create' ? 'primary' : 'outline-primary'} 
            size="lg" 
            onClick={() => onViewChange('create')}
          >
            Crear Pedido
          </Button>
          <Button 
            variant={currentView === 'list' ? 'primary' : 'outline-primary'} 
            size="lg" 
            onClick={() => onViewChange('list')}
          >
            Lista de Pedidos
          </Button>
          <Button 
            variant={currentView === 'completed' ? 'primary' : 'outline-primary'} 
            size="lg" 
            onClick={() => onViewChange('completed')}
          >
            Pedidos Completados
          </Button>
        </Col>
        <Col md={10} className="content">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

DashboardLayout.propTypes = {
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default DashboardLayout;
