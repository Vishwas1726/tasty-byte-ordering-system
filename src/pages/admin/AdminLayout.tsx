
import { useState } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import RequireAuth from '@/components/RequireAuth';

const AdminLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Check if the current path is under admin
  const currentPath = location.pathname;
  const active = (path: string) => currentPath === path ? 'bg-food-light text-food-dark' : '';
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/admin/menu-items', label: 'Menu Items', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
    { path: '/admin/orders', label: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' }
  ];
  
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return (
    <RequireAuth allowedRoles={['admin']}>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside 
          className={`bg-gray-50 border-r transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-16'
          } flex flex-col`}
        >
          <div className="p-4 border-b flex items-center justify-between">
            {isSidebarOpen && (
              <Link to="/admin" className="font-bold text-lg">
                Admin Panel
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="ml-auto"
            >
              {isSidebarOpen ? '←' : '→'}
            </Button>
          </div>
          
          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center ${
                      isSidebarOpen ? 'px-4' : 'justify-center px-2'
                    } py-2 ${active(item.path)} hover:bg-gray-100`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <Link 
              to="/" 
              className={`flex items-center ${
                isSidebarOpen ? 'px-4' : 'justify-center px-2'
              } py-2 hover:bg-gray-100`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {isSidebarOpen && <span>Back to Site</span>}
            </Link>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </RequireAuth>
  );
};

export default AdminLayout;
