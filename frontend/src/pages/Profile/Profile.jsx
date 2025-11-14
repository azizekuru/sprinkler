import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';
import { authService } from '../../services/authService';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  
  // Format date for input type="date" (YYYY-MM-DD)
  const formatDateForInput = (dateValue) => {
    if (!dateValue) return '';
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    dateOfBirth: formatDateForInput(user?.dateOfBirth),
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileSave = () => {
    console.log('Profil güncelleniyor:', profileData);
    setEditMode(false);
    // API çağrısı yapılacak
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log('Şifre değiştiriliyor:', passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    // API çağrısı yapılacak
  };

  const handleSendVerificationEmail = async () => {
    setVerificationMessage('');
    setVerificationLoading(true);
    
    try {
      await authService.sendVerificationEmail();
      setVerificationMessage('✅ Doğrulama linki e-posta adresinize gönderildi!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Doğrulama linki gönderilemedi.';
      setVerificationMessage(`❌ Hata: ${errorMessage}`);
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profil Kartı */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
              {profileData.name?.[0]}{profileData.surname?.[0]}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profileData.name} {profileData.surname}</h2>
              <p className="text-gray-600">{profileData.email}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Aktif Üye
                </span>
                {!user?.isEmailVerified && (
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                    📧 E-posta Doğrulanmamış
                  </span>
                )}
                {user?.isEmailVerified && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ✅ E-posta Doğrulanmış
                  </span>
                )}
              </div>
              {!user?.isEmailVerified && (
                <div className="mt-3">
                  <button
                    onClick={handleSendVerificationEmail}
                    disabled={verificationLoading}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {verificationLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Doğrulama E-postası Gönder
                      </>
                    )}
                  </button>
                  {verificationMessage && (
                    <p className="mt-2 text-sm text-gray-700">{verificationMessage}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-sm text-gray-600">Topluluk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-600">Ağaçlarım</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">42</div>
              <div className="text-sm text-gray-600">Sulama</div>
            </div>
          </div>
        </div>

        {/* Tab Seçimi */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
              activeTab === 'profile'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            Profil Bilgileri
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
              activeTab === 'security'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            Güvenlik
          </button>
        </div>

        {/* Profil Bilgileri Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Kişisel Bilgiler</h3>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                {editMode ? 'İptal' : 'Düzenle'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    editMode 
                      ? 'border-gray-300 bg-white focus:ring-2 focus:ring-orange-500' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                <input
                  type="text"
                  value={profileData.surname}
                  onChange={(e) => setProfileData({...profileData, surname: e.target.value})}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    editMode 
                      ? 'border-gray-300 bg-white focus:ring-2 focus:ring-orange-500' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    editMode 
                      ? 'border-gray-300 bg-white focus:ring-2 focus:ring-orange-500' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doğum Tarihi</label>
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    editMode 
                      ? 'border-gray-300 bg-white focus:ring-2 focus:ring-orange-500' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                />
              </div>

              {editMode && (
                <button
                  onClick={handleProfileSave}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
                >
                  Değişiklikleri Kaydet
                </button>
              )}
            </div>
          </div>
        )}

        {/* Güvenlik Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Şifre Değiştir</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Mevcut şifrenizi girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Yeni şifrenizi girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yeni Şifre (Tekrar)
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Yeni şifrenizi tekrar girin"
                />
              </div>

              <button
                onClick={handlePasswordChange}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Şifreyi Güncelle
              </button>
            </div>
          </div>
        )}

        {/* Çıkış Yap Butonu */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;