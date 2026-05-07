import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button, Input, Card, ErrorMessage } from '../components/common/Common';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.non_field_errors?.[0] || err.detail || 'Email yoki parol noto‘g‘ri');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-gradient-to-tr from-indigo-100/40 via-white to-sky-100/40 -z-10"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-200/20 blur-[120px] rounded-full -ml-64 -mb-64"></div>

      <div className="w-full max-w-md space-y-10 relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-slate-800">EduMath</span>
          </Link>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Xush kelibsiz</h2>
            <p className="text-sm font-medium text-slate-500">
              Platformaga kirish uchun ma‘lumotlaringizni kiriting
            </p>
          </div>
        </div>

        <Card className="p-8 shadow-2xl shadow-indigo-100/50 border-white/50 bg-white/80">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <Input
                label="Email manzil"
                type="email"
                placeholder="nom@misol.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-2xl"
              />
              <Input
                label="Parol"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-2xl"
              />
            </div>

            {error && <ErrorMessage message={error} />}

            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-base shadow-lg shadow-indigo-200"
              isLoading={loading}
            >
              Kirish
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm">
            <span className="text-slate-500 font-medium">Hisobingiz yo‘qmi?</span>{' '}
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Ro‘yxatdan o‘ting
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
