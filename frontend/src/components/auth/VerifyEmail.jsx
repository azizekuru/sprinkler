import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Doğrulama kodu bulunamadı. Lütfen email\'inizdeki linke tıklayın.');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  // Başarılı doğrulama sonrası geri sayım
  useEffect(() => {
    if (status === 'success' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (status === 'success' && countdown === 0) {
      navigate('/communities');
    }
  }, [status, countdown, navigate]);

  const verifyEmail = async (token) => {
    try {
      console.log('🔵 Email doğrulama başladı, token:', token);
      
      const response = await authService.verifyEmail(token);
      console.log('🟢 Email doğrulama başarılı:', response);
      
      // Eğer backend token ve user döndürüyorsa, otomatik giriş yap
      if (response.tokens && response.user) {
        login(response.user, response.tokens);
      }
      
      setStatus('success');
      setMessage('Email adresiniz başarıyla doğrulandı! 🎉');
      
    } catch (error) {
      console.error('🔴 Email doğrulama hatası:', error);
      
      setStatus('error');
      
      const errorMessage = error.response?.data?.message || error.message;
      
      if (errorMessage.includes('expired')) {
        setMessage('Doğrulama kodunun süresi dolmuş. Lütfen yeni bir doğrulama kodu isteyin.');
      } else if (errorMessage.includes('invalid')) {
        setMessage('Geçersiz doğrulama kodu. Lütfen email\'inizdeki linki kontrol edin.');
      } else {
        setMessage(`Doğrulama başarısız: ${errorMessage}`);
      }
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setStatus('verifying');
      setMessage('Yeni doğrulama kodu gönderiliyor...');
      
      await authService.sendVerificationEmail();
      
      setStatus('success');
      setMessage('Yeni doğrulama kodu email adresinize gönderildi. Lütfen kontrol edin.');
    } catch (error) {
      setStatus('error');
      setMessage('Doğrulama kodu gönderilemedi. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6">
          {status === 'verifying' && (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full">
              <svg className="w-10 h-10 text-orange-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          )}
          
          {status === 'success' && (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full animate-bounce">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          
          {status === 'error' && (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Başlık */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {status === 'verifying' && 'Email Doğrulanıyor...'}
          {status === 'success' && 'Email Doğrulandı!'}
          {status === 'error' && 'Doğrulama Başarısız'}
        </h1>

        {/* Mesaj */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message || 'Lütfen bekleyin, email adresiniz doğrulanıyor...'}
        </p>

        {/* Geri Sayım */}
        {status === 'success' && (
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-green-700 font-semibold">
              {countdown} saniye sonra ana sayfaya yönlendiriliyorsunuz...
            </p>
            <div className="mt-3 bg-green-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-green-600 h-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Butonlar */}
        <div className="space-y-3">
          {status === 'success' && (
            <button
              onClick={() => navigate('/communities')}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
            >
              Hemen Git
            </button>
          )}

          {status === 'error' && (
            <>
              <button
                onClick={resendVerificationEmail}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Yeni Doğrulama Kodu Gönder
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Giriş Sayfasına Dön
              </button>
            </>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default VerifyEmail;