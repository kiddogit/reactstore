import React, { useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import ProductDetails from './ProductDetails'
import EditProduct from './EditProduct';
import ProductDelete from './ProductDelete';
import { BsFillTicketDetailedFill, BsFillTrashFill, BsPencil } from "react-icons/bs";

const Products = ({ products, getallproducts, countCartProducts }) => {

    const [ProductDetailModal, setProductDetailModal] = useState(false);
    const [productId, setProductId] = useState();

    const showHideProductModal = (productId) => {
        setProductDetailModal(!ProductDetailModal);
        setProductId(productId);
    }

    const [EditProductModal, setEditProductModal] = useState(false);
    const [id, setId] = useState();

    const showHideEditProductModal = (id) => {
        setEditProductModal(!EditProductModal);
        setId(id);
    }

    const [productDeleteModal, setProductDeleteModal] = useState(false);

    const showHideProductDeleteModal = (id) => {
        setProductDeleteModal(!productDeleteModal);
        setId(id);
    }

    return (
        <>
            <Row>
                <Col>
                    <Table hover bordered striped responsive>
                        <thead>
                            <tr className='text-center'>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products && products.map((p, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{p.title}</td>
                                    <td>{p.category}</td>
                                    <td>{p.price}</td>
                                    <td className='text-center'>{p.rating && p.rating.rate}</td>
                                    <td>
                                        <Row>
                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    onClick={() => showHideProductModal(p.id)}
                                                    className='mt-2 mb-2 btn-sm border-0 shadow-0'
                                                >
                                                    <BsFillTicketDetailedFill />
                                                </Button>
                                            </Col>

                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    onClick={() => showHideEditProductModal(p.id)}
                                                    className='mt-2 mb-2 btn-sm border-0 shadow-0'
                                                >
                                                    <BsPencil />
                                                </Button>
                                            </Col>

                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    onClick={() => showHideProductDeleteModal(p.id)}
                                                    variant='danger'
                                                    className='mt-2 mb-2 btn-sm border-0 shadow-0'
                                                >
                                                    <BsFillTrashFill />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {ProductDetailModal && (
                <ProductDetails hide={showHideProductModal} productId={productId} countCartProducts={countCartProducts} />
            )}

            {/* getallproducts prop dashboard bato product component ma pathayera, 
                3rd component EditProduct ma pathaieyo so yeslai prop drilling vaniyo */}

            {/* yaha neri getallproducts props dashboard bato drill garera EditProduct component ma pathaieyo */}
            {EditProductModal && (
                <EditProduct hide={showHideEditProductModal} id={id} getallproducts={getallproducts} />
            )}

            {productDeleteModal && (
                <ProductDelete hide={showHideProductDeleteModal} id={id} />
            )}

        </>
    )
}

export default Products; 
