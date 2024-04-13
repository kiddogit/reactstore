import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import CartDetails from './CartDetails';
import { BsFillTicketDetailedFill } from 'react-icons/bs';

const Cart = () => {

  const [carts, setCarts] = useState('');

  const [cartDetailModal, setCartDetailModal] = useState(false);
  const [cartId, setCartId] = useState();

  const showHideCartModal = (cartId) => {
    setCartDetailModal(!cartDetailModal);
    setCartId(cartId);
  }

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    axios.get('https://fakestoreapi.com/carts')
      .then((response) => {
        setCarts(response.data);    // Assuming the response is an array of objects
      }).catch((error) => {
        console.error(error.response);
      });
  }

  return (
    <>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h1 className='text-center'>Cart List</h1>

          <Table striped bordered hover>
            <thead>
              <tr className='text-center'>
                <th>#</th>
                <th>ID</th>
                <th>User ID</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className='text-center'>
              {carts && carts.map((cart, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cart.id}</td>
                  <td>{cart.userId}</td>
                  <td>{cart.date}</td>
                  <td>
                    <Button
                      onClick={() => showHideCartModal(cart.id)}
                      className='mt-2 mb-2 btn-sm border-0 shadow'
                    >
                      <BsFillTicketDetailedFill />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {cartDetailModal && (
        <CartDetails hide={showHideCartModal} cartId={cartId} />
      )}
    </>
  );
};

export default Cart;

