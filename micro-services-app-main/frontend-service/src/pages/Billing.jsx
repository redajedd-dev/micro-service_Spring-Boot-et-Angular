import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Receipt, Calendar, User } from 'lucide-react';

const Billing = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await api.get('/billing-service/api/bills');
                const data = response.data._embedded ? response.data._embedded.bills : response.data;
                setBills(data);
            } catch (err) {
                console.error("Error fetching bills:", err);
                setError("Failed to load bills.");
            } finally {
                setLoading(false);
            }
        };

        fetchBills();
    }, []);

    if (loading) return <div className="container">Loading bills...</div>;
    if (error) return <div className="container" style={{ color: 'var(--danger)' }}>{error}</div>;

    return (
        <div className="container">
            <h2 className="page-title">Billing</h2>

            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Bill ID</th>
                            <th>Date</th>
                            <th>Customer ID</th>
                            <th>Items Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill.id}>
                                <td style={{ width: '80px', color: 'var(--text-secondary)' }}>#{bill.id}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={14} color="var(--accent-secondary)" />
                                        {new Date(bill.billingDate).toLocaleDateString()}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={14} color="var(--text-secondary)" />
                                        {bill.customerId}
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-warning">
                                        {/* If productItems are not loaded in list view, handle gracefully */}
                                        {bill.productItems ? bill.productItems.length : 'N/A'} Items
                                    </span>
                                </td>
                                <td>
                                    <button className="btn" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bills.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No bills found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Billing;
