import { useNavigate } from "react-router-dom";
import Footer from "./main-blok-last";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-[#CE2829] text-white h-[30vh] flex flex-col justify-center">
        <div className="max-w-8xl mx-auto flex flex-col items-center py-6 px-4">
          <div className="flex flex-col items-center inline-block mr-4">
            <img src="/logo.svg" alt="Logo" className="h-12 w-auto mx-auto" />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
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
        <div className="space-y-6 mb-32 text-center w-full">
          <h1 className="text-4xl md:text-6xl font-bold font-['Quattrocento'] drop-shadow-lg">
            TEBRİKLER!
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold font-['Quattrocento'] drop-shadow-lg">
            SİPARİŞİNİZ ALINDI!
          </h1>
        </div>
      </section>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-[#FDC913] text-[#292929] text-s font-bold font-['Quattrocento'] rounded-full hover:bg-[#F8B500] transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 flex items-center gap-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          ANA SAYFA
        </button>
      </div>
      <Footer />
    </div>
  );
}