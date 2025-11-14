import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';

// Mock data - üye olunan topluluklar
const myCommunitiesData = [
  {
    id: 1,
    name: "Yeşil Ankara Topluluğu",
    location: "Ankara - Çankaya",
    totalTrees: 1250,
    members: 342,
    unassignedTrees: 48,
    urgentTrees: 12,
    role: "admin"
  },
  {
    id: 2,
    name: "İstanbul Yeşil Alan",
    location: "İstanbul - Kadıköy",
    totalTrees: 890,
    members: 215,
    unassignedTrees: 32,
    urgentTrees: 8,
    role: "member"
  }
];

// Mock data - tüm topluluklar
const allCommunitiesData = [
  {
    id: 3,
    name: "İzmir Doğa Topluluğu",
    location: "İzmir - Karşıyaka",
    totalTrees: 650,
    members: 178,
    unassignedTrees: 25,
    urgentTrees: 5
  },
  {
    id: 4,
    name: "Bursa Yeşil Kampüs",
    location: "Bursa - Nilüfer",
    totalTrees: 420,
    members: 95,
    unassignedTrees: 18,
    urgentTrees: 3
  },
  {
    id: 5,
    name: "Antalya Sahil Topluluğu",
    location: "Antalya - Muratpaşa",
    totalTrees: 580,
    members: 142,
    unassignedTrees: 22,
    urgentTrees: 7
  }
];

const Communities = () => {
  const navigate = useNavigate();
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    location: '',
    description: ''
  });

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
  };

  const handleCreateCommunity = (e) => {
    e.preventDefault();
    console.log('Yeni topluluk:', newCommunity);
    setShowCreateModal(false);
    setNewCommunity({ name: '', location: '', description: '' });
  };

  const handleJoinCommunity = (communityId) => {
    console.log('Topluluğa katıl:', communityId);
  };

  // Topluluk kartı component'i
  const CommunityCard = ({ community, isMember = false }) => (
    <div
      onClick={() => handleCommunityClick(community)}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{community.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{community.location}</span>
          </div>
        </div>
        {isMember && community.role === 'admin' && (
          <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
            Yönetici
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600">{community.totalTrees}</div>
          <div className="text-xs text-green-700 mt-1">Toplam Ağaç</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-orange-600">{community.unassignedTrees}</div>
          <div className="text-xs text-orange-700 mt-1">Gönüllü Bekliyor</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-600">{community.urgentTrees}</div>
          <div className="text-xs text-red-700 mt-1">Acil Sulama</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span className="text-sm text-gray-600">{community.members} üye</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Topluluklar</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Üye Olduğum Topluluklar */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Üye Olduğum Topluluklar</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Yeni Topluluk
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCommunitiesData.map(community => (
              <CommunityCard key={community.id} community={community} isMember={true} />
            ))}
          </div>
        </section>

        {/* Yeni Topluluklar Butonu */}
        <div className="mb-6">
          <button
            onClick={() => setShowAllCommunities(!showAllCommunities)}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between group"
          >
            <span className="text-lg font-semibold text-gray-900">Yeni Topluluklar</span>
            <svg 
              className={`w-6 h-6 text-gray-400 transition-transform ${showAllCommunities ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Tüm Topluluklar */}
        {showAllCommunities && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCommunitiesData.map(community => (
                <CommunityCard key={community.id} community={community} isMember={false} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Yeni Topluluk Oluştur Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Yeni Topluluk Oluştur</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topluluk Adı
                </label>
                <input
                  type="text"
                  required
                  value={newCommunity.name}
                  onChange={(e) => setNewCommunity({...newCommunity, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Örn: Yeşil Kampüs Topluluğu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konum
                </label>
                <input
                  type="text"
                  required
                  value={newCommunity.location}
                  onChange={(e) => setNewCommunity({...newCommunity, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Örn: Ankara - Çankaya"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  rows={4}
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity({...newCommunity, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Topluluğunuz hakkında kısa bir açıklama..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleCreateCommunity}
                className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topluluk Detay Modal */}
      {selectedCommunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCommunity.name}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{selectedCommunity.location}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCommunity(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{selectedCommunity.totalTrees}</div>
                <div className="text-sm text-green-700 font-medium">Toplam Ağaç</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{selectedCommunity.unassignedTrees}</div>
                <div className="text-sm text-orange-700 font-medium">Gönüllü Bekliyor</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{selectedCommunity.urgentTrees}</div>
                <div className="text-sm text-red-700 font-medium">Acil Sulama</div>
              </div>
            </div>

            {/* Üye Bilgisi */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedCommunity.members}</div>
                  <div className="text-sm text-gray-600">Aktif Üye</div>
                </div>
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex gap-3">
              {!myCommunitiesData.find(c => c.id === selectedCommunity.id) ? (
                <button
                  onClick={() => handleJoinCommunity(selectedCommunity.id)}
                  className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
                >
                  Topluluğa Katıl
                </button>
              ) : (
                <>
                  <button
                    onClick={() => console.log('Ağaçları görüntüle')}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Ağaçları Görüntüle
                  </button>
                  {selectedCommunity.role === 'admin' && (
                    <button
                      onClick={() => console.log('Yönet')}
                      className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
                    >
                      Yönet
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Communities;