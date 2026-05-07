import React from 'react';
import { Mail, Shield, CheckCircle, LogOut } from 'lucide-react';
import { Card, Button } from '../components/common/Common';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mening profilim</h1>
        <p className="text-gray-500">Shaxsiy ma'lumotlaringizni boshqaring</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="h-32 bg-blue-600"></div>
        <div className="px-8 pb-8">
           <div className="relative -mt-12 mb-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-white shadow-lg overflow-hidden">
                 <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                    {user.full_name?.charAt(0).toUpperCase()}
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div>
                 <h2 className="text-2xl font-bold text-gray-900">{user.full_name}</h2>
                 <p className="text-gray-500 flex items-center gap-2">
                    <Mail className="h-4 w-4" /> {user.email}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                       <Shield className="h-5 w-5 text-blue-600" />
                       <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Rol</span>
                    </div>
                    <p className="font-bold text-gray-900 capitalize">{user.role}</p>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                       <CheckCircle className="h-5 w-5 text-green-600" />
                       <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Holat</span>
                    </div>
                    <p className="font-bold text-gray-900">
                       {user.is_email_verified ? 'Tasdiqlangan' : 'Tasdiqlanmagan'}
                    </p>
                 </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                 <Button 
                   variant="danger" 
                   className="gap-2"
                   onClick={handleLogout}
                 >
                    <LogOut className="h-5 w-5" /> Tizimdan chiqish
                 </Button>
              </div>
           </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
