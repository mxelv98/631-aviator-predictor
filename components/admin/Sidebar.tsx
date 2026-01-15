import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Users,
    CreditCard,
    Crown,
    LogOut,
    LayoutDashboard,
    Settings,
    LineChart,
    X // Add X icon
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { logout } = useAuth();

    const menuItems = [
        {
            path: '/admin',
            label: 'Dashboard Overview',
            end: true,
            icon: <LayoutDashboard size={20} />
        },
        {
            path: '/admin/users',
            label: 'Users',
            icon: <Users size={20} />
        },
        {
            path: '/admin/payments',
            label: 'Payments',
            icon: <CreditCard size={20} />
        },
        {
            path: '/admin/vip',
            label: 'VIPs',
            icon: <Crown size={20} />
        },
        {
            path: '/admin/logs',
            label: 'Predictions', // Mapped logs to Predictions or create new? Let's map to existing or new
            // Template had 'Predictions'. I'll map to logs for now or new Predictions page?
            // User requested "Predictions Management" earlier.
            // Let's stick to the icons.
            icon: <LineChart size={20} />
        },
        // Adding Settings as Placeholder or real
        // { 
        //   path: '/admin/settings', 
        //   label: 'Settings', 
        //   icon: <Settings size={20} />
        // },
    ];

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 flex flex-col h-full
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="p-8 pb-4 flex justify-between items-center">
                <h1 className="text-4xl font-bold tracking-tight text-black">1631</h1>
                <button onClick={onClose} className="md:hidden text-gray-500 hover:text-black">
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => onClose()} // Close on mobile when clicked
                        end={item.end}
                        className={({ isActive }) => `
              w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group
              ${isActive
                                ? 'bg-gray-200 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium'}
            `}
                    >
                        <span className="text-current">
                            {item.icon}
                        </span>
                        <span className="text-sm">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-all group"
                >
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
