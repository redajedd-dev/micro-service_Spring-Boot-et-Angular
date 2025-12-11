import React from 'react';
import { Users, Package, Receipt, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, value, icon: Icon, color, to }) => (
    <Link to={to} className="card" style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `rgba(${color}, 0.1)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: `rgb(${color})`
            }}>
                <Icon size={24} />
            </div>
            <ArrowUpRight size={20} color="var(--text-secondary)" />
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>{value}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{title}</div>
    </Link>
);

const Dashboard = () => {
    return (
        <div className="container">
            <h2 className="page-title">Dashboard Overview</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <DashboardCard
                    title="Total Customers"
                    value="Manage"
                    icon={Users}
                    color="99, 102, 241"
                    to="/customers"
                />
                <DashboardCard
                    title="Inventory Items"
                    value="Check"
                    icon={Package}
                    color="139, 92, 246"
                    to="/inventory"
                />
                <DashboardCard
                    title="Recent Bills"
                    value="View"
                    icon={Receipt}
                    color="16, 185, 129"
                    to="/billing"
                />
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>System Status</h3>
                <p style={{ color: 'var(--text-secondary)' }}>All microservices are running and communicating via Gateway Service (Port 8888).</p>
            </div>
        </div>
    );
};

export default Dashboard;
