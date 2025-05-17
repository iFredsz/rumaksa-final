import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebarOpen');
      return stored === 'false' ? false : true;
    }
    return true;
  });

  useLayoutEffect(() => {
    localStorage.setItem('sidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.getItem('isAdmin') === 'true';
  }, [location.pathname]);

  const handleDoubleClickSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const menuItems = [
    {
      label: 'Manage Blog',
      path: '/admin',
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
    },
    {
      label: 'Manage Courses',
      path: '/admin/courses',
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 22 22"
        >
          <path d="M22 12l-10 7L2 12l10-7 10 7z" />
          <path d="M6 16v4h12v-4" />
        </svg>
      ),
    },
    {
      label: 'Manage Hero',
      path: '/admin/hero',
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      ),
    },
  ];
  
  

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        onDoubleClick={handleDoubleClickSidebar}
        className="bg-gray-800 text-white flex flex-col flex-shrink-0 transition-width duration-300 ease-in-out cursor-pointer"
        style={{ width: sidebarOpen ? 240 : 64 }}
      >
        <div className="relative h-16 flex items-center border-b border-gray-700">
          <h1
            className={`text-xl font-bold whitespace-nowrap transition-opacity duration-200 ml-4 ${
              sidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Admin Menu
          </h1>
        </div>

        <nav className="flex-grow mt-3 flex flex-col gap-1">
        {menuItems.map(({ label, path, icon }) => {
  const active = path === '/admin' 
    ? location.pathname === '/admin' 
    : location.pathname.startsWith(path);

  return (
    <button
      key={path}
      onClick={() => navigate(path)}
      className={`group flex items-center gap-4 font-medium px-4 py-3 rounded-r-full transition-colors duration-200 ${
        active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      } focus:outline-none`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span
        className={`overflow-hidden whitespace-nowrap transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionProperty: 'opacity, transform' }}
      >
        {label}
      </span>
    </button>
  );
})}

        </nav>

      </aside>

      <main className="flex-grow overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
