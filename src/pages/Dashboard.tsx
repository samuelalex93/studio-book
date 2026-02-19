import { MapPin, Bell, Search, Heart, Scissors, Droplet, MoreHorizontal } from 'lucide-react';

export function Dashboard() {
  const specialOffers = [
    {
      id: 1,
      title: 'Especial da Manhã!',
      description: 'Ganhe 20% de Desconto',
      subtitle: 'em todos os Cortes entre 9am-5pm',
      image: 'https://images.unsplash.com/photo-1599819834519-c90903a59fd0?w=400&h=300&fit=crop',
      cta: 'Agendar Agora',
    },
    {
      id: 2,
      title: 'Promoção da Tarde',
      description: 'Ganhe 15% de Desconto',
      subtitle: 'em todos os Serviços após 5pm',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      cta: 'Agendar Agora',
    },
  ];

  const services = [
    { id: 1, name: 'Cortes', icon: Scissors, color: 'text-[#F97316]' },
    { id: 2, name: 'Barba', icon: Droplet, color: 'text-[#F97316]' },
    { id: 3, name: 'Shampoo', icon: Droplet, color: 'text-[#F97316]' },
    { id: 4, name: 'Corte', icon: Scissors, color: 'text-[#F97316]' },
    { id: 5, name: 'Mais', icon: MoreHorizontal, color: 'text-[#F97316]' },
  ];

  const offers = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1599819834519-c90903a59fd0?w=300&h=300&fit=crop',
      price: '$2.50',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      price: '$3.00',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      price: '$2.75',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white p-4 lg:p-6 border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto">
          {/* Location and Notification */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#F97316]" />
              <span className="text-sm lg:text-base font-semibold text-[#111827]">São Paulo, SP</span>
            </div>
            <button className="relative">
              <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-[#111827]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 bg-[#F5F5F5] px-4 py-3 rounded-xl">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            <button className="flex items-center justify-center w-12 h-12 bg-[#F5F5F5] rounded-xl hover:bg-gray-200 transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {/* Featured Promo Banner */}
          <div className="relative rounded-3xl overflow-hidden h-48 lg:h-64 bg-gradient-to-r from-[#1F2937] to-[#111827] shadow-lg">
            <img
              src={specialOffers[0].image}
              alt="promo"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/90 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
              <div>
                <p className="text-[#F97316] font-semibold text-sm mb-1">Especial da Manhã!</p>
                <h2 className="text-white text-3xl lg:text-4xl font-bold mb-2">Ganhe 20% de Desconto</h2>
                <p className="text-gray-300 text-sm lg:text-base">em todos os Cortes entre 9am-5pm</p>
              </div>
              <button className="w-fit bg-[#F97316] hover:bg-[#E67E0D] text-white font-bold px-6 py-2 rounded-full transition-colors text-sm lg:text-base">
                Agendar Agora
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-[#111827] mb-4">Serviços</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#F5F5F5] hover:bg-gray-200 transition-colors flex-shrink-0"
                  >
                    <Icon className={`w-6 h-6 lg:w-8 lg:h-8 ${service.color}`} />
                    <span className="text-xs lg:text-sm font-semibold text-[#111827] text-center whitespace-nowrap">
                      {service.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Offers Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg lg:text-xl font-bold text-[#111827]">Ofertas Especiais</h3>
              <button className="text-[#F97316] hover:text-[#E67E0D] font-semibold text-sm lg:text-base transition-colors">
                Ver Tudo
              </button>
            </div>

            {/* Offers Grid - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="relative rounded-2xl overflow-hidden h-48 lg:h-56 group cursor-pointer"
                >
                  <img
                    src={offer.image}
                    alt="offer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent"></div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-[#F97316] text-white font-bold px-3 py-1 rounded-full text-sm">
                    {offer.price}
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-4 left-4">
                    <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-white hover:fill-white transition-all" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Padding para mobile nav */}
      <div className="h-20 lg:h-24"></div>
    </div>
  );
}
