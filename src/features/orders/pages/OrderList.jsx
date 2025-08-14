import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Card, Form, Modal } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { useOrders } from '../context';
import { DeliveryMethods, PaymentMethods } from '../orderTypes';

export default function OrderList() {
  const { orders, fetchOrders, loading, updateOrder } = useOrders();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const startEdit = (order) => {
    setEditingId(order.id);
    setEditForm({
      user_id: order.user_id || '',
      product: order.product || '',
      price: String(order.price ?? ''),
      status: order.status || '',
      payment_status: order.payment_status || '',
      notes: order.notes || '',
      address: order.address || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setHasUnsaved(true);
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    const raw = e.target.value;
    const sanitized = raw.replace(/[^0-9.,]/g, '');
    setEditForm((prev) => ({ ...prev, price: sanitized }));
  };

  const blurPrice = () => {
    if (editForm.price === '') return;
    const normalized = String(editForm.price).replace(',', '.');
    const num = Number(normalized);
    if (!Number.isNaN(num)) {
      setEditForm((prev) => ({ ...prev, price: num.toFixed(2) }));
    }
  };

  const saveEdit = async (orderId) => {
    const ok = await updateOrder(orderId, editForm);
    if (ok) {
      window.dispatchEvent(new CustomEvent('app:toast', { detail: { variant: 'success', message: 'Pedido actualizado exitosamente.' } }));
    } else {
      window.dispatchEvent(new CustomEvent('app:toast', { detail: { variant: 'danger', message: 'No se pudo actualizar el pedido.' } }));
    }
    setEditingId(null);
    setHasUnsaved(false);
  };

  const renderReadRow = (order) => (
    <tr key={order.id} className="align-middle text-center">
      <td>{order.user_id}</td>
      <td>{order.product}</td>
      <td>${order.price}</td>
      <td>{order.payment_status}</td>
      <td>{order.status}</td>
      <td>{order.address || '-'}</td>
      <td>{order.notes || '-'}</td>
      <td>
        <Button variant="outline-primary" size="sm" onClick={() => startEdit(order)}>
          <BsPencilSquare className="me-1" /> Editar
        </Button>
      </td>
    </tr>
  );

  const renderEditRow = (order) => (
    <tr key={order.id} className="align-middle text-center" onKeyDown={(e) => handleRowKeyDown(e, order.id)}>
      <td>
        <Form.Control name="user_id" value={editForm.user_id} onChange={handleEditChange} placeholder="Nombre" />
      </td>
      <td>
        <Form.Control name="product" value={editForm.product} onChange={handleEditChange} placeholder="Producto" />
      </td>
      <td>
        <Form.Control name="price" value={editForm.price} onChange={handlePriceChange} onBlur={blurPrice} placeholder="Precio" inputMode="decimal" />
      </td>
      <td>
        <Form.Select name="payment_status" value={editForm.payment_status} onChange={handleEditChange} required>
          <option value="" disabled hidden>Seleccionar…</option>
          {PaymentMethods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </Form.Select>
      </td>
      <td>
        <Form.Select name="status" value={editForm.status} onChange={handleEditChange} required>
          <option value="" disabled hidden>Seleccionar…</option>
          {DeliveryMethods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </Form.Select>
      </td>
      <td>
        <Form.Control name="address" value={editForm.address} onChange={handleEditChange} placeholder="Dirección" />
      </td>
      <td>
        <Form.Control as="textarea" name="notes" value={editForm.notes} onChange={handleEditChange} placeholder="Notas" />
      </td>
      <td className="d-flex gap-2 justify-content-center">
        <Button size="sm" variant="primary" onClick={() => saveEdit(order.id)}>Guardar</Button>
        <Button size="sm" variant="outline-primary" onClick={cancelEdit}>Cancelar</Button>
      </td>
    </tr>
  );

  const handleRowKeyDown = (e, orderId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit(orderId);
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      if (hasUnsaved) setShowConfirm(true); else cancelEdit();
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4 text-center gradient-text">Lista de Pedidos</h3>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead>
                  <tr className="text-center">
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Pago</th>
                    <th>Entrega</th>
                    <th>Dirección</th>
                    <th>Notas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    [...Array(4)].map((_, i) => (
                      <tr key={`sk-${i}`} className="text-center">
                        {Array.from({ length: 8 }).map((__, j) => (
                          <td key={`skc-${i}-${j}`}>
                            <div className="placeholder-wave">
                              <span className="placeholder col-8"></span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                  {!loading && orders.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div className="mb-3">No hay pedidos aún.</div>
                        <Button href="/" variant="primary">Crear pedido</Button>
                      </td>
                    </tr>
                  )}
                  {!loading && orders.length > 0 && (
                    orders.slice().reverse().map((order) => (
                      editingId === order.id ? renderEditRow(order) : renderReadRow(order)
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Descartar cambios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tienes cambios sin guardar. ¿Qué deseas hacer?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancelar</Button>
          <Button variant="outline-primary" onClick={() => { setShowConfirm(false); cancelEdit(); }}>Descartar</Button>
          <Button variant="primary" onClick={() => { setShowConfirm(false); saveEdit(editingId); }}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
