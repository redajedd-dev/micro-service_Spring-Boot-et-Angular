import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Mail, User } from 'lucide-react';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await api.get('/customer-service/api/customers');
                // Handle Spring Data REST structure
                const data = response.data._embedded ? response.data._embedded.customers : response.data;
                setCustomers(data);
            } catch (err) {
                console.error("Error fetching customers:", err);
                setError("Failed to load customers.");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) return <div className="container">Loading customers...</div>;
    if (error) return <div className="container" style={{ color: 'var(--danger)' }}>{error}</div>;

    return (
        <div className="container">
            <h2 className="page-title">Customers</h2>

            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td style={{ width: '80px', color: 'var(--text-secondary)' }}>#{customer.id}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--accent-primary)'
                                        }}>
                                            <User size={16} />
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{customer.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        <Mail size={14} />
                                        {customer.email}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {customers.length === 0 && (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No customers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;
