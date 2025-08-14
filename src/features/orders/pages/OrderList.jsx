import React, { useEffect } from 'react';
import { Container, Table, Button, Spinner, Card } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { useOrders } from '../context';

export default function OrderList() {
  const {
    orders,
    fetchOrders,
    loading,
  } = useOrders();
  

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
              <Table hover>
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
                  {orders.map((order) => (
                    <tr key={order.id} className="align-middle text-center">
                      <td>{order.user_id}</td>
                      <td>{order.product}</td>
                      <td>${order.price}</td>
                      <td>{order.payment_status}</td>
                      <td>{order.status}</td>
                      <td>{order.address || '-'}</td>
                      <td>{order.notes || '-'}</td>
                      <td>
                        <Button variant="outline-primary" size="sm">
                          <BsPencilSquare className="me-1" /> Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
