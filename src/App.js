// src/App.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './App.css';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import Swal from 'sweetalert2';


function App() {
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleClose = () => {
        setShowForm(false);
        setSelectedUser(null);
    };

    const handleShow = () => setShowForm(true);

    const addOrEdit = (user) => {
        if (selectedUser) {
            setUserList(prev =>
                prev.map(u => (u.id === selectedUser.id ? { ...user, id: selectedUser.id } : u))
            );
        } else {
            const newUser = { ...user, id: Date.now() };
            setUserList([...userList, newUser]);
        }
        handleClose();
        setSelectedUser(null);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };
    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete user ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setUserList(userList.filter(u => u.id !== user.id));

                Swal.fire({
                    title: 'Deleted!',
                    text: `${user.name} has been removed.`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };


    return (
        <div className="App container mt-4">
            <h2>User Form</h2>
            <Button variant="primary" onClick={handleShow}>
                + Add User
            </Button>

            {/* Modal Form */}
            <Modal show={showForm} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedUser ? 'Edit User' : 'Add New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormComponent addOrEdit={addOrEdit} selectedUser={selectedUser} />
                </Modal.Body>
            </Modal>

            <h2 className="mt-5">User List</h2>
            <TableComponent data={userList} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}

export default App;
