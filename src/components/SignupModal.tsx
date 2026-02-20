import { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { COLORS } from '../constants/colors';

interface SignupModalProps {
  onClose: () => void;
  onSignup: (email: string, password: string, name: string) => void;
  onSwitchToLogin: () => void;
}

export function SignupModal({ onClose, onSignup, onSwitchToLogin }: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!agreedToTerms) {
      alert('Você precisa aceitar os termos e condições!');
      return;
    }

    setLoading(true);

    // Simular delay de requisição
    setTimeout(() => {
      onSignup(email, password, name);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end lg:items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full lg:w-96 rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.text }}>Cadastre-se</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" style={{ color: COLORS.textSecondary }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: COLORS.textTertiary }} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: COLORS.light,
                  borderColor: COLORS.mid,
                  borderWidth: '1px',
                  '--tw-ring-color': COLORS.accent,
                } as React.CSSProperties}
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: COLORS.textTertiary }} />
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
                  '--tw-ring-color': COLORS.accent,
                } as React.CSSProperties}
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
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: COLORS.textTertiary }} />
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
                  '--tw-ring-color': COLORS.accent,
                } as React.CSSProperties}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
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

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
              Confirme a Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: COLORS.textTertiary }} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: COLORS.light,
                  borderColor: COLORS.mid,
                  borderWidth: '1px',
                  '--tw-ring-color': COLORS.accent,
                } as React.CSSProperties}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                style={{ color: COLORS.textTertiary }}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 mt-1 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs lg:text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
              Concordo com os{' '}
              <span className="font-semibold" style={{ color: COLORS.accent }}>
                Termos de Serviço
              </span>{' '}
              e{' '}
              <span className="font-semibold" style={{ color: COLORS.accent }}>
                Política de Privacidade
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !agreedToTerms}
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
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            Já tem conta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-bold transition-colors"
              style={{ color: COLORS.accent }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accentDark;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accent;
              }}
            >
              Entre aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
