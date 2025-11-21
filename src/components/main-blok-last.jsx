

import React from 'react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const menuItems = [
    'Terminal Pizza',
    '5 Kişilik Hackathlon Pizza',
    'useEffect Tavuklu Pizza',
    'Beyaz Console Frosty',
    'Testler Geçti Mutlu Burger',
    'Position Absolute Acı Burger',
  ];

  const instagramPhotos = [
    { id: 0, color: '#3366ff', alt: 'Terminal Pizza' },
    { id: 1, color: '#66c6ff', alt: 'Hackathlon Pizza' },
    { id: 2, color: '#ff6b6b', alt: 'Tavuklu Pizza' },
    { id: 3, color: '#ffd93d', alt: 'Console Frosty' },
    { id: 4, color: '#4caf50', alt: 'Mutlu Burger' },
    { id: 5, color: '#e74a43', alt: 'Acı Burger' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="w-32 h-auto">
              <img 
                src="/public/logo.svg" 
                alt="Teknolojik Yemekler Logo"
                className="w-full"
              />
            </div>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-400 flex-shrink-0" />
                <p className="text-sm">341 Londonderry Road, Istanbul Türkiye</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-blue-400 flex-shrink-0" />
                <p className="text-sm">+90 216 123 45 67</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-blue-400 flex-shrink-0" />
                <p className="text-sm">aciktim@teknolojikyemekler.com</p>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-6">Hot Menu</h3>
            <ul className="space-y-2 text-gray-300">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Instagram Gallery Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-6">
              <Instagram size={24} className="text-pink-500" />
              <h3 className="text-xl font-bold text-white">Instagram</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {instagramPhotos.map((photo) => (
                <div 
                  key={photo.id}
                  className="w-20 h-20 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <img
  src={`/images/iteration-2-images/footer/insta/li-${photo.id}.png`}
  alt={photo.alt}
  className="w-full h-full object-cover"
/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          © 2023 Teknolojik Yemekler. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
