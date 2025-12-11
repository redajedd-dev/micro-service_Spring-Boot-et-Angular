import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Package, DollarSign, BarChart2 } from 'lucide-react';

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/inventory-service/api/products');
                const data = response.data._embedded ? response.data._embedded.products : response.data;
                setProducts(data);
            } catch (err) {
                console.error("Error fetching inventory:", err);
                setError("Failed to load inventory.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="container">Loading inventory...</div>;
    if (error) return <div className="container" style={{ color: 'var(--danger)' }}>{error}</div>;

    return (
        <div className="container">
            <h2 className="page-title">Inventory</h2>

            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const isLowStock = product.quantity < 10;
                            return (
                                <tr key={product.id}>
                                    <td style={{ width: '80px', color: 'var(--text-secondary)' }}>
                                        <span title={product.id}>{product.id.substring(0, 8)}...</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                background: 'rgba(139, 92, 246, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--accent-secondary)'
                                            }}>
                                                <Package size={16} />
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{product.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontWeight: 600 }}>
                                            <DollarSign size={14} />
                                            {product.price.toFixed(2)}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <BarChart2 size={14} color="var(--text-secondary)" />
                                            {product.quantity}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${isLowStock ? 'badge-danger' : 'badge-success'}`}>
                                            {isLowStock ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
