import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  History, 
  Book, 
  FileText, 
  User, 
  LogOut, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../common/Common';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Bosh sahifa', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Kurslar', icon: BookOpen, path: '/courses' },
    { name: 'Natijalarim', icon: History, path: '/results' },
    { name: 'Glossariy', icon: Book, path: '/glossary' },
    { name: 'Adabiyotlar', icon: FileText, path: '/references' },
    { name: 'Profil', icon: User, path: '/profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-900/20 backdrop-blur-sm lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 z-30 h-screen w-64 border-r border-slate-200/50 bg-white/60 backdrop-blur-xl transition-transform lg:translate-x-0 outline-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-20 items-center px-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">EduMath</span>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isOpen && toggleSidebar()}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                pathname === item.path || pathname.startsWith(`${item.path}/`)
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-500 transition-all hover:bg-rose-50"
          >
            <LogOut className="h-4 w-4" />
            Chiqish
          </button>
        </nav>
      </aside>
    </>
  );
};

const Navbar = ({ toggleSidebar, user }) => {
  return (
    <header className="sticky top-0 z-10 h-20 px-4 lg:px-8 flex items-center justify-between bg-white/30 backdrop-blur-md border-b border-slate-200/50 shrink-0">
      <button 
        className="rounded-xl p-2.5 hover:bg-white/50 border border-transparent hover:border-slate-200 transition-all lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6 text-slate-700" />
      </button>

      <div className="ml-auto flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-800">{user?.full_name}</p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{user?.role === 'student' ? 'Talaba' : user?.role}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center font-bold text-indigo-600 shadow-sm">
          {user?.full_name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen relative bg-slate-50 overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-tr from-indigo-100/40 via-white to-sky-100/40 -z-10 pointer-events-none"></div>
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} user={user} />
        <main className="p-4 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
