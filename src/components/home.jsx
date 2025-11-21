
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./main-blok-last";

export default function Home() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/form");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header with Logo */}
      <header className=" text-white py-1 px-6 bg-[#CE2829]">
        <div className="max-w-7xl mx-auto flex justify-center items-center ">
          <div className="flex items-center gap-2">
            <img 
              src="/images/iteration-1-images/logo.svg" 
              alt="Teknolojik Yemekler" 
              className=" mt-10 h-12 w-auto"
            />
          </div>
        </div>
        {/* Hero Section with Background Image */}
      <section 
        className="relative text-white py-16 min-h-[60vh] flex items-center"
        style={{
          backgroundImage: "url('/images/iteration-1-images/home-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "",
        }}
      >
        {/* header text*/}
        <div className="absolute inset-0 bg-[#CE2829]/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
          <div className="mb-4">
            <span className="text-[#FDC913] font-['Satisfy']  px-4 py-2 rounded-full text-2xl font-bold">
              fırsatı kaçırma
            </span>
          </div>
          
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-['Quattrocento'] drop-shadow-lg">
              KOD ACIKTIRIR
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold font-['Quattrocento'] drop-shadow-lg">
              PİZZA, DOYURUR
            </h1>
          </div>
          
          <button 
            onClick={handleOrderClick}
            className="bg-[#FDC913] text-[#292929] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg transform hover:scale-105"
          >ACIKTIM
          </button>
        </div>
      </section>
      </header>

{/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-around py-3">
            {[
              { id: 1, icon: "🍜", label: "YENİ! Kore", href: "#kore" },
              { id: 2, icon: "🍕", label: "Pizza", href: "#pizza" },
              { id: 3, icon: "🍔", label: "Burger", href: "#burger" },
              { id: 4, icon: "🍟", label: "Kızartmalar", href: "#fries" },
              { id: 5, icon: "🌭", label: "Fast Food", href: "#fastfood" },
              { id: 6, icon: "🥤", label: "Gazlı İçecek", href: "#drinks" }
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex flex-col items-center gap-1 group"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium text-[#292929] group-hover:text-[#CE2829] transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
      

      {/* Promo Cards Section with Grid Layout */}
      <section className="py-12 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Card - Full Height */}
            <div 
              className="lg:col-span-1 relative text-white rounded-2xl p-6 shadow-xl overflow-hidden min-h-[624px]"
              style={{
                backgroundImage: "url('/images/iteration-2-images/cta/kart-1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 bg-red/50"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="text-white px-4 py-1 text-8xl font-['Quattrocento'] font-bold gap-4 mb-4 self-start">
                    Özel Lezzetus
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Position: Absolute Acı Burger</h3>
                </div>
                <button 
                  onClick={handleOrderClick}
                  className="bg-white text-gray-800 px-6 py-2 rounded-full  font-bold hover:bg-gray-100 transition-colors self-start"
                >
                  SİPARİŞ VER
                </button>
              </div>
            </div>

            {/* Right Column - Two Cards Stacked */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              
              {/* Top Right Card */}
              <div 
                className="relative text-white rounded-2xl p-6 shadow-xl overflow-hidden min-h-[300px] bg-no-repeat bg-[#292929]"
                style={{
                  backgroundImage: "url('/images/iteration-2-images/cta/kart-2.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 "></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-4xl font-bold mb-2">Hackathlon</h3>
                    <h4 className="text-3xl font-bold mb-2">Burger Menü</h4>
                  </div>
                  <button 
                    onClick={handleOrderClick}
                    className="bg-white text-gray-800 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors self-start"
                  >
                    SİPARİŞ VER
                  </button>
                </div>
              </div>

              {/* Bottom Right Card */}
              <div 
                className="relative text-white rounded-2xl p-6 shadow-xl overflow-hidden min-h-[300px]"
                style={{
                  backgroundImage: "url('/images/iteration-2-images/cta/kart-4.png'), url('/images/iteration-2-images/cta/kart-3.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="mt-10 text-4xl text-black font-bold mb-2"><span className="text-red-700">Çoooook</span> hızlı</h3>
                    <h3 className="mt-4 text-4xl text-black font-bold mb-2">npm gibi kurye</h3>
                  </div>
                  <button 
                    onClick={handleOrderClick}
                    className="bg-white text-gray-800 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors self-start"
                  >
                    SİPARİŞ VER
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

{/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-around py-3">
            {[
              { id: 1, icon: "🍜", label: "YENİ! Kore", href: "#kore" },
              { id: 2, icon: "🍕", label: "Pizza", href: "#pizza" },
              { id: 3, icon: "🍔", label: "Burger", href: "#burger" },
              { id: 4, icon: "🍟", label: "Kızartmalar", href: "#fries" },
              { id: 5, icon: "🌭", label: "Fast Food", href: "#fastfood" },
              { id: 6, icon: "🥤", label: "Gazlı İçecek", href: "#drinks" }
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex flex-col items-center gap-1 group"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium text-[#292929] group-hover:text-[#CE2829] transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#292929] mb-8">
            Acıktıran Kodlara Doyuran Lezzetler
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Terminal Pizza",
                image: "/images/iteration-2-images/pictures/food-1.png",
                rating: 4.9,
                reviews: 200,
                price: "60₺",
                description: "Klasik pepperoni ve peynir"
              },
              {
                id: 2,
                name: "Position Absolute Acı Pizza",
                image: "/images/iteration-2-images/pictures/food-2.png",
                rating: 4.9,
                reviews: 200,
                price: "85.5₺",
                description: "Acı sevenler için özel"
              },
              {
                id: 3,
                name: "useEffect Tavuklu Burger",
                image: "/images/iteration-2-images/pictures/food-3.png",
                rating: 4.9,
                reviews: 200,
                price: "60₺",
                description: "Tavuklu özel sos"
              }
            ].map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#CE2829] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.rating} ⭐
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#292929] mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-[#5F5F5F] text-sm mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#CE2829] font-bold text-xl">
                      {product.price}
                    </span>
                    <span className="text-sm text-[#5F5F5F]">
                      ({product.reviews} yorum)
                    </span>
                  </div>
                  
                  <button 
                    onClick={handleOrderClick}
                    className="w-full bg-[#CE2829] text-white py-3 rounded-full mt-4 hover:bg-red-700 transition-colors font-bold"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}


