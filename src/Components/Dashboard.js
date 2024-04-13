import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Products from './Products';
import ProductLimitFilter from './ProductLimitFilter';
import AddProduct from './AddProduct';
import { BsCart } from 'react-icons/bs';
import { useNavigate } from 'react-router';

const Dashboard = () => {

  const [products, setProducts] = useState('');
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState();
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);

  const [product, setProduct] = useState(0);

  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate('cartProductList');
  }

  const countCartProducts = () => {
    let cartProduct = JSON.parse(sessionStorage.getItem('products'));

    if (cartProduct) {
      setProduct(cartProduct.length);
    }
  }

  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const showHideAddProductModal = () => {
    setShowAddProductModal(!showAddProductModal);
  }

  const getallproducts = () => {
    let productUrl;
    if (categoryName !== undefined && categoryName !== 'all') {
      productUrl = `https://fakestoreapi.com/products/category/${categoryName}/?limit=${limit}`;
    } else {
      productUrl = `https://fakestoreapi.com/products?limit=${limit}`;
    }
    axios.get(productUrl)
      .then((res) => {
        setProducts(res.data);
      }).catch((err) => {
        setError(err.response);
      })
  }

  const getallcategories = () => {
    axios.get(`https://fakestoreapi.com/products/categories`)
      .then((res) => {
        setCategory(res.data);
      })
  }

  useEffect(() => {
    getallproducts();
    getallcategories();
    countCartProducts();
  }, [limit, categoryName]);  // dependency[]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLimit(value);
  }

  return (
    <Container fluid>
      <Row className='mx-3'>
        <Col>
          <h1 className='text-center'>Dashboard</h1>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 8, offset: 1 }}>
          <ProductLimitFilter
            limit={limit}
            handleChange={handleChange}
            setCategoryName={setCategoryName}
            category={category}
            categoryName={categoryName}
          />
        </Col>

        <Col md='2'>
          <Button
            onClick={showHideAddProductModal}
            className='float-end mt-3 rounded-0 border-0 shadow btn-sm'
          >
            Add Product
          </Button>
        </Col>

        <Col>
          <div className='cart-icon float-end'>
            <BsCart onClick={navigateToCart} />
            <sup>{product}</sup>        {/* Add the superscript here */}
          </div>
        </Col>
      </Row>

      {/* Prop Drilling: The Prop, getallproducts, is sent to products component inorder to send it to EditProduct component */}
      <Products
        products={products}
        getallproducts={getallproducts}
        countCartProducts={countCartProducts}
      />

      {showAddProductModal && (
        <AddProduct
          showHideAddProductModal={showHideAddProductModal}
          getallproducts={getallproducts}
        />
      )}

    </Container>
  )
}

export default Dashboard;

