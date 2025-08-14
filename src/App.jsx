import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import OrderForm from './features/orders/pages/OrderForm';
import OrderList from './features/orders/pages/OrderList';
import CompletedOrders from './features/orders/pages/CompletedOrders';
import { OrderProvider } from './features/orders/context';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Container fluid>
          <Row>
            <Col xs={12} md={3} lg={2} className="px-0">
              <Sidebar />
            </Col>
            <Col xs={12} md={9} lg={10} className="p-4">
              <main className="glass" style={{ minHeight: 'calc(100vh - 2rem)' }}>
                <div className="p-4 p-md-5">
                  <Routes>
                    <Route path="/" element={<OrderForm />} />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/completed" element={<CompletedOrders />} />
                  </Routes>
                </div>
              </main>
            </Col>
          </Row>
        </Container>
      </Router>
    </OrderProvider>
  );
}

export default App;
