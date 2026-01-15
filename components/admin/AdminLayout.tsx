import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className="flex-1 overflow-y-auto bg-gray-50/30 flex flex-col">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-200">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-2 font-bold text-lg">Admin Panel</span>
                </div>

                <div className="flex-1 p-4 md:p-0">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
