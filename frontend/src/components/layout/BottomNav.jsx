import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'map',
      label: 'Harita',
      path: '/map',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-orange-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'communities',
      label: 'Topluluk',
      path: '/communities',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-orange-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'announcements',
      label: 'Duyurular',
      path: '/announcements',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-orange-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Profil',
      path: '/profile',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-orange-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-[1002] safe-area-top">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active ? 'text-orange-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className={`text-sm font-medium ${active ? 'text-orange-600' : 'text-gray-600'}`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute bottom-0 w-16 h-1 bg-orange-600 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @supports (padding-top: env(safe-area-inset-top)) {
          .safe-area-top {
            padding-top: env(safe-area-inset-top);
          }
        }
      `}</style>
    </div>
  );
};

export default TopNav;