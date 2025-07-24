// src/components/TableComponent.js
import React, { useState } from 'react';

export default function TableComponent({ data, onEdit, onDelete }) {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <div>
            <table border="1" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((user, index) => (
                        <tr key={index}>
                            <td>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button onClick={() => onEdit(user)}>Edit</button>
                                <button onClick={() => onDelete(user)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {paginatedData.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {paginatedData.length > 0 && (
                <div className="pagination-container">
                    <div className="pagination">
                        <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={page === i + 1 ? 'active' : ''}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
}
