import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button, Input, Card, ErrorMessage } from '../components/common/Common';
import authApi from '../api/authApi';
import { getApiFieldErrors } from '../utils/apiError';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      await authApi.register(formData);
      // Save email for verification page
      localStorage.setItem('temp_email', formData.email);
      navigate('/verify-email');
    } catch (err) {
      const apiErrors = getApiFieldErrors(err);
      setErrors(Object.keys(apiErrors).length ? apiErrors : { detail: 'Ro‘yxatdan o‘tishda xatolik yuz berdi' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-gradient-to-tr from-indigo-100/40 via-white to-sky-100/40 -z-10"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-200/20 blur-[120px] rounded-full -ml-64 -mt-64"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-200/20 blur-[120px] rounded-full -mr-64 -mb-64"></div>

      <div className="w-full max-w-md space-y-10 relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-slate-800">EduMath</span>
          </Link>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ro‘yxatdan o‘tish</h2>
            <p className="text-sm font-medium text-slate-500">
              Platformadan to‘liq foydalanish uchun hisob yarating
            </p>
          </div>
        </div>

        <Card className="p-8 shadow-2xl shadow-indigo-100/50 border-white/50 bg-white/80">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <Input
                label="F.I.SH."
                name="full_name"
                placeholder="Ivanov Ivan"
                value={formData.full_name}
                onChange={handleChange}
                error={errors.full_name?.[0]}
                required
                className="h-12 rounded-2xl"
              />
              <Input
                label="Email manzil"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email?.[0]}
                required
                className="h-12 rounded-2xl"
              />
              <Input
                label="Parol"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password?.[0]}
                required
                className="h-12 rounded-2xl"
              />
            </div>

            {errors.detail && <ErrorMessage message={errors.detail} />}

            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-base shadow-lg shadow-indigo-200"
              isLoading={loading}
            >
              Ro‘yxatdan o‘tish
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm">
            <span className="text-slate-500 font-medium">Hisobingiz bormi?</span>{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Tizimga kiring
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
