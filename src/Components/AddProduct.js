import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap'

const AddProduct = ({ showHideAddProductModal, getallproducts }) => {
    const [productForm, setProductForm] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: ''
    })

    const [categorylist, setCategoryList] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductForm({ ...productForm, [name]: value });
    }

    const getCategoryData = () => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then((res) => {
                setCategoryList(res.data);
            })
    }

    useEffect(() => {
        getCategoryData();
    }, [categoryName]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title: productForm.title,
            price: productForm.price,
            description: productForm.description,
            image: productForm.image,
            category: productForm.category
        }
        axios.post('https://fakestoreapi.com/products', payload)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    showHideAddProductModal();
                    getallproducts();
                }
            }).catch((err) => {
                console.log(err.response);
            })
    }

    return (
        <Modal show={true} onHide={showHideAddProductModal} size='lg'>
            <Form onSubmit={handleSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md='4' controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                name='title'
                                value={productForm.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                name='price'
                                value={productForm.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as='select'
                                name='category'
                                value={productForm.category}
                                onChange={handleChange}
                                required
                            >
                                <option value=''>Select Category</option>
                                {categorylist && categorylist.map((c, index) => (
                                    <option
                                        key={index} value={c} name='category'
                                    >{c}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className='mb-3'>
                        <Col md='8'>
                            <FloatingLabel className='mb-3' controlId='floatingtextarea' label='Description'>
                                <Form.Control
                                    as='textarea'
                                    type='text'
                                    name='description'
                                    placeholder='Description here'
                                    value={productForm.description}
                                    onChange={handleChange}
                                    required
                                />
                            </FloatingLabel>
                        </Col>

                        <Col md='4'>
                            <FloatingLabel className='mb-3' controlId='FloatingImage' label='Image'>
                                <Form.Control
                                    type='text'
                                    name='image'
                                    placeholder='Image'
                                    value={productForm.image}
                                    onChange={handleChange}
                                    required
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' className='btn-sm' onClick={showHideAddProductModal}>Cancel</Button>
                    <Button variant='primary' className='btn-sm' type='submit'>Save</Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export default AddProduct;
