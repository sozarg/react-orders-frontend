import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import PaymentSelector from '../../../components/PaymentSelector'
import DeliverySelector from '../../../components/DeliverySelector';
import NotesInput from '../../../components/NotesInput';
import { useOrders } from '../context';


function OrderForm() {
  const [form, setForm] = useState({
    product: '',
    price: '',
    user_id: '',
    payment_status: '',
    status: '',
    address: '',
    notes: '',
  });
  const { createOrder, loading } = useOrders();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder(form);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4 text-center gradient-text">Crear Nuevo Pedido</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Precio en ARS"
                    required
                  />
                </Form.Group>

                <PaymentSelector value={form.payment_status} onChange={handleChange} />

                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_id"
                    value={form.user_id}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </Form.Group>

                <DeliverySelector value={form.status} onChange={handleChange} />

                <Form.Group className="mb-3">
                  <Form.Label>Dirección (opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Calle Falsa 123"
                  />
                </Form.Group>

                <NotesInput value={form.notes} onChange={handleChange} />

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Guardando...
                      </>
                    ) : (
                      'Guardar Pedido'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderForm;
