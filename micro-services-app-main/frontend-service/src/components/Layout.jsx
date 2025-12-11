import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{
                marginLeft: '260px',
                flex: 1,
                padding: '3rem',
                width: 'calc(100% - 260px)'
            }}>
                <div className="fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
