import { useState } from 'react';
import { ChevronLeft, Bell, Heart, HelpCircle, LogOut, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../constants/colors';
import { LoginModal } from '../components/LoginModal';
import { SignupModal } from '../components/SignupModal';
import { EditProfileModal } from '../components/EditProfileModal';

interface ProfileUser {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

export function Profile() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState<ProfileUser>({
    name: 'SAMUEL AGUIAR',
    email: 'samuel@example.com',
    phone: '+55 11 98765-4321',
    isLoggedIn: true,
  });

  const handleLogin = (email: string, _password: string) => {
    setUser({
      ...user,
      email,
      isLoggedIn: true,
    });
    setShowLoginModal(false);
  };

  const handleSignup = (email: string, _password: string, name: string) => {
    setUser({
      name,
      email,
      phone: '+55 11 99999-9999',
      isLoggedIn: true,
    });
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    setUser({
      ...user,
      isLoggedIn: false,
    });
  };

  const handleEditProfile = (name: string, email: string, phone: string) => {
    setUser({
      ...user,
      name,
      email,
      phone,
    });
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.light }}>
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-[#E5E5E5]" style={{ backgroundColor: COLORS.light }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-[#111827]" />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-[#111827] flex-1 text-center">
              {user.name}
            </h1>
            <button className="w-10 h-10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#111827]" />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 right-2"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4 lg:p-6 pb-32">
        <div className="max-w-7xl mx-auto space-y-4">
          {user.isLoggedIn ? (
            <>
              {/* User Info Card */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#111827]">{user.name}</h2>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5 text-[#F97316]" />
                  </button>
                </div>

                <div className="space-y-3 border-t border-[#E5E5E5] pt-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">TELEFONE</p>
                    <p className="text-sm text-[#111827] font-semibold">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">EMAIL</p>
                    <p className="text-sm text-[#111827] font-semibold">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6 space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Ative as notificações</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </div>

              {/* Favorites Section */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Favoritos</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>

              {/* Help Section */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Ajuda</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sair da Conta
              </button>
            </>
          ) : (
            <>
              {/* Login/Signup CTA */}
              <div className="bg-white border-2 border-dashed border-[#E5E5E5] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h2 className="text-xl font-bold text-[#111827] mb-2">Entre em sua Conta</h2>
                <p className="text-gray-600 mb-6">
                  Acesse sua conta ou crie uma nova para aproveitar todos os benefícios
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="w-full bg-[#F97316] hover:bg-[#E67E0D] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Entrando
                  </button>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="w-full border-2 border-[#F97316] text-[#F97316] font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors"
                  >
                    Criar Conta
                  </button>
                </div>
              </div>

              {/* Favorites Section */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Favoritos</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>

              {/* Help Section */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Ajuda</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
          onSave={handleEditProfile}
          initialData={{
            name: user.name,
            email: user.email,
            phone: user.phone,
          }}
        />
      )}
    </div>
  );
}
