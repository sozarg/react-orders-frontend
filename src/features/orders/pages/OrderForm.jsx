import React, { useState, useMemo } from 'react';
import { Form, Button, Card, Container, Row, Col, Spinner, InputGroup } from 'react-bootstrap';
import PaymentSelector from '../../../components/PaymentSelector'
import DeliverySelector from '../../../components/DeliverySelector';
import NotesInput from '../../../components/NotesInput';
import { useOrders } from '../context';
import { validateOrder, getFirstInvalidField, isValidPrice } from '../../../utils/validators';
import { formatPrice } from '../../../utils/formatters';


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

  const isFormValid = useMemo(() => !validateOrder(form), [form]);

  const [touched, setTouched] = useState({ payment_status: false, status: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePriceChange = (e) => {
    const raw = e.target.value;
    // Allow only digits and comma/period as decimal separators
    const sanitized = raw.replace(/[^0-9.,]/g, '');
    setForm({ ...form, price: sanitized });
  };

  const handlePriceBlur = () => {
    if (form.price === '') return;
    const normalized = String(form.price).replace(',', '.');
    const num = Number(normalized);
    if (!Number.isNaN(num)) {
      setForm({ ...form, price: num.toFixed(2) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Price validation
    if (!isValidPrice(form.price)) {
      window.dispatchEvent(new CustomEvent('app:toast', { detail: { variant: 'danger', message: 'Precio inválido. Use números y decimales (ej: 1234,56).' } }));
      const node = document.querySelector('[name="price"]');
      if (node) { node.scrollIntoView({ behavior: 'smooth', block: 'center' }); node.focus(); }
      return;
    }
    const firstInvalid = getFirstInvalidField(form);
    if (firstInvalid) {
      const node = document.querySelector(`[name="${firstInvalid}"]`);
      if (node) { node.scrollIntoView({ behavior: 'smooth', block: 'center' }); node.focus(); }
      return;
    }
    createOrder(form).then((ok) => {
      if (ok) {
        setForm({
          product: '',
          price: '',
          user_id: '',
          payment_status: '',
          status: '',
          address: '',
          notes: '',
        });
        window.dispatchEvent(new CustomEvent('app:toast', { detail: { variant: 'success', message: 'Pedido creado exitosamente.' } }));
      } else {
        window.dispatchEvent(new CustomEvent('app:toast', { detail: { variant: 'danger', message: 'No se pudo crear el pedido.' } }));
      }
    });
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="shadow-sm glass" style={{ maxWidth: '960px', margin: '0 auto' }}>
            <Card.Body className="p-4 p-md-5">
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
                  <InputGroup>
                    <InputGroup.Text>ARS</InputGroup.Text>
                    <Form.Control
                      inputMode="decimal"
                      name="price"
                      value={form.price}
                      onChange={handlePriceChange}
                      onBlur={handlePriceBlur}
                      placeholder="Precio"
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <PaymentSelector
                  value={form.payment_status}
                  onChange={handleChange}
                  onBlur={() => setTouched((t) => ({ ...t, payment_status: true }))}
                  isInvalid={touched.payment_status && !form.payment_status}
                />

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

                <DeliverySelector
                  value={form.status}
                  onChange={handleChange}
                  onBlur={() => setTouched((t) => ({ ...t, status: true }))}
                  isInvalid={touched.status && !form.status}
                />

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

                <div className="d-grid mt-3">
                  <Button variant="primary" type="submit" disabled={loading || !isFormValid} className="w-100">
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
