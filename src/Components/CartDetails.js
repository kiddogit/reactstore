import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap';
import CartProduct from './CartProduct';

const CartDetails = ({ hide, cartId }) => {

    const [cartDetail, setCartDetail] = useState('');

    const getCartDetail = () => {
        axios.get(`https://fakestoreapi.com/carts/${cartId}`
        ).then((res) => {
            setCartDetail(res.data);
        }).catch((err) => {
            console.log(err.response);
        })
    }

    useEffect(() => {
        getCartDetail();
    }, []);

    return (
        <>
            <Modal size='lg' show={true} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col>
                            <p>ID: {cartDetail.id}</p>
                        </Col>

                        {cartDetail.products && cartDetail.products.map((cp) => (
                            <CartProduct productId={cp.productId} quantity={cp.quantity} />
                        ))}
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CartDetails;
