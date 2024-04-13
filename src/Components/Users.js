import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import UserDetails from './UserDetails';
import UserLimitFilter from './UserLimitFilter';
import { BsFillTicketDetailedFill, BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import UserDelete from './UserDelete';
import AddNewUser from './AddNewUser';
import EditUser from './EditUser';

const Users = () => {

    const [userData, setUserData] = useState('');
    const [limit, setLimit] = useState(5);

    const [userDetailModal, setUserDetailModal] = useState(false);
    const [userId, setUserId] = useState();

    const showHideUserModal = (userId) => {
        setUserDetailModal(!userDetailModal);
        setUserId(userId);
    }

    const [userDeleteModal, setUserDeleteModal] = useState(false);
    const [id, setId] = useState();

    const showHideUserDeleteModal = (id) => {
        setUserDeleteModal(!userDeleteModal);
        setId(id);
    }

    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const showHideAddUserModal = () => {
        setShowAddUserModal(!showAddUserModal);
    }

    const [showEditUserModal, setShowEditUserModal] = useState(false);

    const showHideEditUserModal = (id) => {
        setShowEditUserModal(!showEditUserModal);
        setId(id);
    }

    useEffect(() => {
        getAllUsers();
    }, [limit]);

    const getAllUsers = () => {
        axios.get(`https://fakestoreapi.com/users?limit=${limit}`)
            .then((res) => {
                setUserData(res.data);
            }).catch((err) => {
                console.log(err.response);
            })
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setLimit(value);
    }

    return (
        <>
            <Button
                onClick={showHideAddUserModal}
                className='float-end mt-3 rounded-0 border-0 shadow btn-sm'
            >
                Add User
            </Button>

            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                <h1 className='text-center'>User List</h1>

                    <UserLimitFilter limit={limit} handleChange={handleChange} />

                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <th>#</th>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone No.</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody className='text-center'>
                            {userData && userData.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name ? user.name.firstname : " "}</td>
                                    <td>{user.address ? user.address.city : ""}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <Row>
                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    onClick={() => showHideEditUserModal(user.id)}
                                                    className='mt-2 mb-2 btn-sm border-0 shadow-0'
                                                >
                                                    <BsPencilFill />
                                                </Button>
                                            </Col>

                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    onClick={() => showHideUserModal(user.id)}
                                                    className='mt-2 mb-2 btn-sm border-0 shadow-0'
                                                >
                                                    <BsFillTicketDetailedFill />
                                                </Button>
                                            </Col>

                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    variant='danger'
                                                    onClick={() => showHideUserDeleteModal(user.id)}
                                                    className='mt-2 mb-2 btn-sm rounded-0 border-0'
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

            {showAddUserModal && (
                <AddNewUser
                    showHideAddUserModal={showHideAddUserModal}
                    getAllUsers={getAllUsers}
                />
            )}

            {showEditUserModal && (
                <EditUser
                    hide={showHideEditUserModal}
                    id={id}
                />
            )}

            {userDetailModal && (
                <UserDetails
                    hide={showHideUserModal}
                    userId={userId}
                />
            )}

            {userDeleteModal && (
                <UserDelete
                    hide={showHideUserDeleteModal}
                    id={id}
                />
            )}
        </>
    )
}

export default Users;
