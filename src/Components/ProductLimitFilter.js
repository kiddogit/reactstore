import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const ProductLimitFilter = ({ limit, handleChange, category, categoryName, setCategoryName }) => {
    return (
        <Form className='mb-3'>
            <Row>
                <Col md={{ span: 3 }}>
                    <Form.Group controlId='LimitProduct'>
                        <Form.Label>Total Product</Form.Label>
                        <Form.Control
                            name='limit'
                            type='text'
                            placeholder='Limit Products'
                            value={limit}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>

                <Col md='3'>
                    <Form.Group controlId='SelectCategory'>
                        <Form.Label>Select Category</Form.Label>
                        <Form.Control
                            as='select'
                            name='categoryName'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        >
                            <option value='all'>All</option>
                            {category && category.map((c, index) => (
                                <option
                                    key={index} value={c} name='categoryName'
                                >{c}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default ProductLimitFilter;
