import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap'

const EditProduct = ({ hide, id, getallproducts }) => {

    const [productForm, setProductForm] = useState({
        id: '',
        title: '',
        price: '',
        description: '',
        image: '',
        category: ''
    })

    const [categorylist, setCategoryList] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const getCategoryData = () => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then((res) => {
                setCategoryList(res.data);
            })
    }

    useEffect(() => {
        getCategoryData();
        getproductlist();
    }, [categoryName, id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        updateProduct(id);
    }

    const updateProduct = () => {
        const payload = {
            id: id,
            title: productForm.title,
            price: productForm.price,
            description: productForm.description,
            image: productForm.image,
            category: productForm.category
        }
        axios.put(`https://fakestoreapi.com/products/${id}`, payload)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    hide();
                    getallproducts();
                }
            }).catch((err) => {
                console.log(err.response);
            })
    }

    const getproductlist = () => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                const data = res.data;

                setProductForm({
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    category: data.category,
                    description: data.description,
                    image: data.image,
                })
            })
    }

    return (
        <Modal show={true} onHide={hide} size='lg'>
            <Form onSubmit={handleUpdate}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md='4' controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                name='title'
                                value={productForm.title}
                                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                name='price'
                                value={productForm.price}
                                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as='select'
                                name='category'
                                value={productForm.category}
                                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
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
                                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
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
                                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                    required
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' className='btn-sm' onClick={hide}>Cancel</Button>
                    <Button variant='primary' className='btn-sm' type='submit'>Save</Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export default EditProduct;
