import React, { useEffect } from 'react';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useOrders } from '../context'; // corregí la ruta si es necesario
import { BsCheckCircle } from 'react-icons/bs';

function CompletedOrders() {
  const { orders, fetchOrders, loading } = useOrders();

  useEffect(() => {
    fetchOrders(); // ya la tenés en el contexto
  }, [fetchOrders]);

  const completedOrders = orders.filter(order => order.status === 'Completado');

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <h3 className="mb-4 text-center gradient-text">Pedidos Completados</h3>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <div className="mt-2">Cargando pedidos completados...</div>
            </div>
          ) : completedOrders.length === 0 ? (
            <Alert variant="info" className="text-center">
              No hay pedidos completados aún.
            </Alert>
          ) : (
            completedOrders.map((order) => (
              <Card key={order.id} className="mb-3 border-success shadow-sm">
                <Card.Body>
                  <Row>
                    <Col
                      md={1}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <BsCheckCircle size={28} color="green" />
                    </Col>
                    <Col md={11}>
                      <h5 className="mb-2 fw-semibold">{order.product}</h5>
                      <Row>
                        <Col md={6}>
                          <div><strong>Cliente:</strong> {order.user_id}</div>
                          <div><strong>Precio:</strong> ${order.price}</div>
                        </Col>
                        <Col md={6}>
                          <div><strong>Entrega:</strong> {order.status}</div>
                          <div><strong>Pago:</strong> {order.payment_status}</div>
                          {order.notes && (
                            <div><strong>Notas:</strong> {order.notes}</div>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CompletedOrders;
