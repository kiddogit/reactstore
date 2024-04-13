import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Modal, Row } from 'react-bootstrap'

const ProductDetails = ({ hide, productId, countCartProducts }) => {

    const [productDetails, setProductDetail] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [disableButton, setDisableButton] = useState(false);

    const incQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const checkDisableButton = () => {
        if (quantity === 1) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }

    const getProductDetails = () => {
        axios.get(`https://fakestoreapi.com/products/${productId}`
        ).then((res) => {
            setProductDetail(res.data);
        }).catch((err) => {
            console.log(err.response);
        })
    }

    useEffect(() => {
        getProductDetails();
        checkDisableButton();
    }, [quantity]);

    const addToCart = () => {
        let products = sessionStorage.getItem('products');

        if (products === null) {
            products = [];
            console.log(products);
        } else {
            products = JSON.parse(products);
        }

        const addToProduct = {
            productId: productDetails.id,
            quantity,
        };

        const existingProductIndex = products.findIndex((item) => item.productId === productDetails.id);
        if (existingProductIndex !== -1) {
            products[existingProductIndex].quantity += quantity;
        } else {
            products.push(addToProduct);
        }

        sessionStorage.setItem('products', JSON.stringify(products));
        countCartProducts();
        alert('Product added to the cart successfully!');
    }

    return (
        // ByDefault modal is set to show.
        <Modal show={true} size='lg' onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Product Details {productDetails.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col>
                        <Image
                            src={productDetails.image}
                            alt=''
                            thumbnail
                        />
                    </Col>

                    <Col>
                        <p>Category: {productDetails.category} </p>
                        <p className='p-3'>{productDetails.description}</p>
                        <p>Price: ${productDetails.price} </p>
                        <p>Rating: {productDetails.rating && productDetails.rating.rate} </p>

                        <Row className='my-2'>
                            <Col>
                                <Button
                                    className='btn-sm btn-info rounded-0 border-0 mx-2'
                                    disabled={disableButton}
                                    onClick={decQuantity}
                                >
                                    -
                                </Button>
                                {quantity}

                                <Button
                                    className='btn-sm btn-info rounded-0 border-0 mx-2'
                                    onClick={incQuantity}
                                >
                                    +
                                </Button>
                            </Col>
                        </Row>

                        <Button
                            variant='primary'
                            className='btn-sm'
                            type='submit'
                            onClick={addToCart}
                        >
                            Add To Cart
                        </Button>

                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default ProductDetails;
