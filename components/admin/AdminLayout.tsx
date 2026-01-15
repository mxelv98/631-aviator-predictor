import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-50/30">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
