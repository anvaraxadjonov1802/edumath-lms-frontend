import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button, Input, Card, ErrorMessage } from '../components/common/Common';
import authApi from '../api/authApi';
import { getApiErrorMessage } from '../utils/apiError';

const VerifyEmailPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const tempEmail = localStorage.getItem('temp_email');
    if (tempEmail) {
      setEmail(tempEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authApi.verifyEmail({ email, code });
      localStorage.removeItem('temp_email');
      navigate('/login', { state: { message: 'Email tasdiqlandi. Tizimga kirishingiz mumkin.' } });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Kod noto‘g‘ri yoki amal qilish muddati tugagan'));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setSuccess('');
    
    try {
      await authApi.resendCode({ email });
      setSuccess('Tasdiqlash kodi qayta yuborildi');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Kodni yuborishda xatolik yuz berdi'));
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EduMath</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Emailni tasdiqlash</h2>
          <p className="mt-2 text-sm text-gray-600">
            {email ? `${email} manziliga yuborilgan tasdiqlash kodini kiriting` : 'Emailingizga yuborilgan tasdiqlash kodini kiriting'}
          </p>
        </div>

        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!localStorage.getItem('temp_email') && (
                 <Input
                    label="Email manzil"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
              )}
              <Input
                label="Tasdiqlash kodi"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            {error && <ErrorMessage message={error} />}
            {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">{success}</div>}

            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
            >
              Tasdiqlash
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
              >
                {resending ? 'Yuborilmoqda...' : 'Kodni qayta yuborish'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
