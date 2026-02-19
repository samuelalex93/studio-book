import { Calendar, Clock, Star, ChevronRight } from 'lucide-react';

export function Appointments() {
  const appointments = [
    {
      id: 1,
      barber: 'Marcus Johnson',
      service: 'Corte Premium',
      date: '04 de Fevereiro',
      time: '14:30',
      duration: '45 min',
      status: 'confirmed',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1599819834519-c90903a59fd0?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      barber: 'Bruno Silva',
      service: 'Barba + Corte',
      date: '05 de Fevereiro',
      time: '10:00',
      duration: '60 min',
      status: 'pending',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      barber: 'Carlos Santos',
      service: 'Shampoo + Corte',
      date: '06 de Fevereiro',
      time: '16:00',
      duration: '50 min',
      status: 'confirmed',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (status: string) => {
    return status === 'confirmed' ? 'Confirmado' : 'Pendente';
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-[#111827] text-white p-6 lg:p-12 rounded-b-3xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold mb-2">Meus Agendamentos</h1>
          <p className="text-gray-300 lg:text-lg">Você tem {appointments.length} agendamentos próximos</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-4 lg:space-y-6">
        {/* Filter/Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:gap-4">
          <button className="px-4 lg:px-6 py-2 lg:py-3 bg-[#F97316] text-white rounded-full text-sm lg:text-base font-semibold whitespace-nowrap hover:bg-[#E67E0D] transition-colors">
            Todos ({appointments.length})
          </button>
          <button className="px-4 lg:px-6 py-2 lg:py-3 bg-white text-[#111827] rounded-full text-sm lg:text-base font-semibold border-2 border-[#E5E5E5] whitespace-nowrap hover:bg-gray-50 transition-colors">
            Confirmados
          </button>
          <button className="px-4 lg:px-6 py-2 lg:py-3 bg-white text-[#111827] rounded-full text-sm lg:text-base font-semibold border-2 border-[#E5E5E5] whitespace-nowrap hover:bg-gray-50 transition-colors">
            Pendentes
          </button>
        </div>

        {/* Appointments List - Grid responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-[#E5E5E5] hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Header da card */}
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={appointment.image}
                    alt={appointment.barber}
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#111827] text-sm lg:text-base truncate">
                      {appointment.barber}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-600">{appointment.service}</p>
                  </div>
                </div>
                <span
                  className={`text-xs lg:text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {getStatusText(appointment.status)}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E5E5E5] my-3 lg:my-4"></div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-[#F97316] flex-shrink-0" />
                  <span className="text-xs lg:text-sm text-gray-700">{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-[#F97316] flex-shrink-0" />
                  <span className="text-xs lg:text-sm text-gray-700">{appointment.time}</span>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 mb-3 lg:mb-4 text-xs lg:text-sm text-gray-600">
                <span>⏱️</span>
                <span>Duração: {appointment.duration}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-[#E5E5E5]">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 lg:w-4 lg:h-4 ${
                        i < appointment.rating
                          ? 'fill-[#F97316] text-[#F97316]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs lg:text-sm text-gray-600 ml-1">({appointment.rating})</span>
                </div>
                <button className="text-[#F97316] hover:text-[#E67E0D] p-1 hover:bg-orange-50 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-6 lg:mt-8">
          <button className="w-full lg:w-auto px-8 lg:px-12 bg-[#F97316] hover:bg-[#E67E0D] text-white font-bold py-3 lg:py-4 rounded-full transition-colors text-base lg:text-lg">
            + Agendar Nova Consulta
          </button>
        </div>

        {/* Upcoming Special Offer */}
        <div className="mt-8 lg:mt-12 bg-gradient-to-r from-[#F97316] to-orange-500 rounded-2xl p-4 lg:p-8 text-white max-w-2xl mx-auto w-full">
          <h3 className="font-bold text-base lg:text-xl mb-1 lg:mb-2">Promoção Especial!</h3>
          <p className="text-sm lg:text-base mb-3 lg:mb-4">Ganhe 15% de desconto no seu próximo corte</p>
          <button className="w-full bg-white text-[#F97316] font-semibold py-2 lg:py-3 rounded-lg text-sm lg:text-base hover:bg-gray-100 transition-colors">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
