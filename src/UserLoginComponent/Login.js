import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const Login = () => {
    const [userForm, setUserForm] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserForm({ ...userForm, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            username: userForm.username,
            password: userForm.password
        }
        axios.post('https://fakestoreapi.com/auth/login', payload)
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    navigate('/');
                }
            })
    }

    return (
        <Card>
            <Card.Header>
                User Login
            </Card.Header>

            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md='4' controlId='username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                name='username'
                                value={userForm.username}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                name='password'
                                value={userForm.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Card.Body>

            <Card.Footer>
                <Button
                    onClick={handleSubmit}
                    variant='primary'
                    type='submit'
                >
                    Login
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default Login;
