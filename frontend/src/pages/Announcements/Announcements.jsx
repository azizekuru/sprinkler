import React, { useState } from 'react';
import BottomNav from '../../components/layout/BottomNav';

const mockAnnouncements = [
  {
    id: 1,
    title: "Yeni Topluluk Etkinliği! 🌳",
    description: "Bu hafta sonu kampüste toplu ağaç dikimi yapılacak. Tüm üyelerimizi bekliyoruz!",
    date: "2025-11-05",
    time: "14:00",
    community: "Yeşil Ankara Topluluğu",
    type: "event",
    isNew: true
  },
  {
    id: 2,
    title: "Acil Sulama Uyarısı! 💧",
    description: "Kampüsün doğu bölgesindeki 15 ağaç acil sulama bekliyor. Gönüllü arkadaşlarımızın desteğine ihtiyacımız var.",
    date: "2025-11-03",
    community: "Yeşil Ankara Topluluğu",
    type: "urgent",
    isNew: true
  },
  {
    id: 3,
    title: "Topluluk Toplantısı 📋",
    description: "Aylık rutin toplantımız bu Cuma saat 18:00'de online olarak gerçekleştirilecek. Zoom linki mail olarak gönderildi.",
    date: "2025-11-08",
    time: "18:00",
    community: "İstanbul Yeşil Alan",
    type: "meeting",
    isNew: false
  },
  {
    id: 4,
    title: "Başarı Hikayesi! 🎉",
    description: "Topluluğumuz bu ay 50 ağaca başarıyla gönüllü buldu ve hepsine düzenli bakım sağlandı. Tebrikler!",
    date: "2025-11-01",
    community: "Yeşil Ankara Topluluğu",
    type: "success",
    isNew: false
  },
  {
    id: 5,
    title: "Yeni Özellik: Ağaç Takibi 📱",
    description: "Artık mobil uygulama üzerinden sorumlu olduğunuz ağaçların su ihtiyacını anlık olarak takip edebilirsiniz.",
    date: "2025-10-28",
    community: "Sistem",
    type: "feature",
    isNew: false
  }
];

const Announcements = () => {
  const [announcements] = useState(mockAnnouncements);
  const [selectedType, setSelectedType] = useState('all');

  const getTypeIcon = (type) => {
    switch (type) {
      case 'event':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'urgent':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'meeting':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'feature':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'event':
        return 'bg-blue-100 text-blue-600';
      case 'urgent':
        return 'bg-red-100 text-red-600';
      case 'meeting':
        return 'bg-purple-100 text-purple-600';
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'feature':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredAnnouncements = selectedType === 'all' 
    ? announcements 
    : announcements.filter(a => a.type === selectedType);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Duyurular</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filtreler */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedType === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setSelectedType('urgent')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedType === 'urgent'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Acil
          </button>
          <button
            onClick={() => setSelectedType('event')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedType === 'event'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Etkinlikler
          </button>
          <button
            onClick={() => setSelectedType('meeting')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedType === 'meeting'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Toplantılar
          </button>
        </div>

        {/* Duyurular Listesi */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition relative"
            >
              {announcement.isNew && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  YENİ
                </span>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(announcement.type)}`}>
                  {getTypeIcon(announcement.type)}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {announcement.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(announcement.date)}</span>
                    </div>

                    {announcement.time && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{announcement.time}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium text-gray-700">{announcement.community}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-600 text-lg">Bu kategoride duyuru bulunmuyor</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Announcements;