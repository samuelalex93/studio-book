import { useState } from 'react';
import { X, User, Mail, Phone } from 'lucide-react';
import { COLORS } from '../constants/colors';

interface EditProfileModalProps {
  onClose: () => void;
  onSave: (name: string, email: string, phone: string) => void;
  initialData: {
    name: string;
    email: string;
    phone: string;
  };
}

export function EditProfileModal({ onClose, onSave, initialData }: EditProfileModalProps) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [phone, setPhone] = useState(initialData.phone);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular delay de requisição
    setTimeout(() => {
      onSave(name, email, phone);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end lg:items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full lg:w-96 rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.text }}>Editar Perfil</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" style={{ color: COLORS.textSecondary }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Preview */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl"
              style={{
                background: 'linear-gradient(to bottom right, var(--color-brand-accent), #E67E0D)'
              }}
            >
              {name.charAt(0)}
            </div>
          </div>

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
                }}
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
                }}
                required
              />
            </div>
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
              Telefone
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: COLORS.textTertiary }} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+55 11 98765-4321"
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: COLORS.light,
                  borderColor: COLORS.mid,
                  borderWidth: '1px',
                }}
                required
              />
            </div>
          </div>

          {/* Save Button */}
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
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full font-bold py-3 rounded-xl transition-colors"
            style={{
              borderColor: COLORS.accent,
              borderWidth: '2px',
              color: COLORS.accent,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-brand-accent-light)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
