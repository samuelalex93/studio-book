import { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { COLORS } from '../constants/colors';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

export function LoginModal({ onClose, onLogin, onSwitchToSignup }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular delay de requisição
    setTimeout(() => {
      onLogin(email, password);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end lg:items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full lg:w-96 rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.text }}>
            Entrar
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" style={{ color: COLORS.textSecondary }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
              Email
            </label>
            <div className="relative">
              <Mail 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: COLORS.textTertiary }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: COLORS.light,
                  borderColor: COLORS.mid,
                  borderWidth: '1px',
                  '--tw-ring-color': 'rgba(249, 115, 22, 0.1)'
                } as React.CSSProperties}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = COLORS.accent;
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = COLORS.mid;
                }}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
              Senha
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: COLORS.textTertiary }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: COLORS.light,
                  borderColor: COLORS.mid,
                  borderWidth: '1px',
                  '--tw-ring-color': 'rgba(249, 115, 22, 0.1)'
                } as React.CSSProperties}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = COLORS.accent;
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = COLORS.mid;
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-gray-600"
                style={{ color: COLORS.textTertiary }}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm" style={{ color: COLORS.textSecondary }}>
                Manter conectado
              </span>
            </label>
            <button
              type="button"
              className="text-sm font-semibold hover:transition-colors"
              style={{ color: COLORS.accent }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accentDark;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accent;
              }}
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-bold py-3 rounded-xl transition-colors mt-6 disabled:opacity-70"
            style={{ backgroundColor: COLORS.accent }}
            onMouseEnter={(e) => {
              if (!(e.currentTarget as HTMLButtonElement).disabled) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLORS.accentDark;
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLORS.accent;
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            Não tem conta?{' '}
            <button
              onClick={onSwitchToSignup}
              className="font-bold hover:transition-colors"
              style={{ color: COLORS.accent }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accentDark;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accent;
              }}
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
