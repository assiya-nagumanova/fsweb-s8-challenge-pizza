
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./components/main-blok-last";


// proje renkleri (Tailwind ve inline)
const COLORS = {
  yellow: "#FDC913", // Sarı
  lightGray: "#5F5F5F", // Açık Gri
  darkGray: "#292929", // Koyu Gri
  red: "#CE2829", // Kırmızı
  beige: "#FAF7F2", // Bej
};

// Başlangıç fiyatlar
const BASE_PRICE = 85.5;
const MAX_EXTRAS = 10;
const MIN_EXTRAS = 4;

// Ölçüler
const SIZES = [
  { id: "small", label: "Küçük", modifier: 0 },
  { id: "medium", label: "Orta", modifier: 10 },
  { id: "large", label: "Büyük", modifier: 20 },
];

// Hamur
const CRUSTS = [
  { id: "thin", label: "İnce" },
  { id: "regular", label: "Normal" },
  { id: "thick", label: "Kalın" },
];

// Malzeme listesi, fiyatlar dahl
const EXTRAS = [
  { id: "pepperoni", label: "Pepperoni", price: 5 },
  { id: "sosis", label: "Sosis", price: 5 },
  { id: "kanada-jambon", label: "Kanada Jambonu", price: 6 },
  { id: "tavuk-izgara", label: "Tavuk Izgara", price: 6 },
  { id: "domates", label: "Domates", price: 2 },
  { id: "biber", label: "Biber", price: 2 },
  { id: "misir", label: "Mısır", price: 3 },
  { id: "jalapeno", label: "Jalepeno", price: 3 },
  { id: "kabak", label: "Kabak", price: 3 },
  { id: "sogan", label: "Soğan", price: 2 },
  { id: "sucuk", label: "Sucuk", price: 5 },
  { id: "ananas", label: "Ananas", price: 4 },
];

// fiyat hesaplama formülü
function formatPrice(v) {
  return v.toFixed(2) + "₺";
}

/* App */

export default function App() {
  // --- Değişkenler ---
  const [name, setName] = useState("");
  const [size, setSize] = useState("small");
  const [crust, setCrust] = useState("thin");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();

  // --- Effect ile başlangıç veriler, localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pizza_order_draft");
      if (raw) {
        const parsed = JSON.parse(raw);
        setName(parsed.name || "");
        setSize(parsed.size || "small");
        setCrust(parsed.crust || "thin");
        setSelectedExtras(parsed.selectedExtras || []);
        setQuantity(parsed.quantity || 1);
        setNote(parsed.note || "");
      }
    } catch (err) {
      // error
      console.warn("Failed to load draft", err);
    }
  }, []);

  // --- Effect  localStorage değşlikleri saklamak
  useEffect(() => {
    const payload = {
      name,
      size,
      crust,
      selectedExtras,
      quantity,
      note,
    };
    localStorage.setItem("pizza_order_draft", JSON.stringify(payload));
  }, [name, size, crust, selectedExtras, quantity, note]);

  // --- useMemo ile fiyat hesaplama ---
  const extrasTotal = useMemo(() => {
    return selectedExtras.reduce((sum, id) => {
      const it = EXTRAS.find((x) => x.id === id);
      return sum + (it ? it.price : 0);
    }, 0);
  }, [selectedExtras]);

  const sizeModifier = useMemo(() => {
    const s = SIZES.find((x) => x.id === size);
    return s ? s.modifier : 0;
  }, [size]);

  const unitPrice = useMemo(() => BASE_PRICE + sizeModifier + extrasTotal, [sizeModifier, extrasTotal]);

  const totalPrice = useMemo(() => unitPrice * Math.max(1, quantity), [unitPrice, quantity]);

  // --- Validasyon kontrolü ---
  const isNameValid = name.trim().length >= 3;
  const isExtrasCountValid = selectedExtras.length >= MIN_EXTRAS && selectedExtras.length <= MAX_EXTRAS;
  const isFormValid = isExtrasCountValid && quantity >= 1 && !!size && isNameValid; // boyut initial

  // --- MAlzeme Handler ---
  function toggleExtra(id) {
    setErrorMsg(""); // err temizlemek
    setSelectedExtras((prev) => {
      if (prev.includes(id)) {
        // seçimi ptal et
        return prev.filter((x) => x !== id);
      } else {
        // ekle
        if (prev.length >= MAX_EXTRAS) {
          setErrorMsg(`${MAX_EXTRAS} maksimum malzeme seçebilirsiniz.`);
          return prev;
        }
        return [...prev, id];
      }
    });
  }

  // Adet sayısını değştir
  function changeQty(delta) {
    setQuantity((q) => Math.max(1, q + delta));
  }

  // --- Hero button: scroll
  function scrollToForm() {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      // isme focus
      const inp = formRef.current.querySelector("input[name='name']");
      if (inp) inp.focus();
    }
  }

async function handleSubmit(e) {
  e.preventDefault();
  setErrorMsg("");
  setLastResponse(null);

  // Gönderi öncesi test
  if (!isFormValid) {
    setErrorMsg("Form yanlış yada eksik dolduruldu. İsminiz 3 harften uzun olmalı ve 4–10 malzeme seçilmelidir.");
    return;
  }

  setSubmitting(true);

  // İlk yüklemeler (payload)
  const payload = {
    productId: "position-absolute-aci-pizza",
    productName: "Position Absolute Acı Pizza",
    basePrice: BASE_PRICE,
    size,
    crust,
    extras: selectedExtras,
    extrasCount: selectedExtras.length,
    quantity,
    note,
    unitPrice,
    totalPrice,
    currency: "TRY",
    createdAtClient: new Date().toISOString(),
  };

  try {
    // JSONPlaceholder API'sine POST isteği gönder
    const resp = await axios.post("https://jsonplaceholder.typicode.com/posts", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Axios response:", resp);
    console.log("Order summary (console):", {
      id: resp.data.id ?? "(mock-id)",
      createdAt: new Date().toISOString(),
      payload,
    });

    // Başarılı gönderimden sonra success sayfasına yönlendir
    navigate("/success", {
      state: {
        order: payload,
        response: {
          id: resp.data.id || Date.now(),
          status: "success",
          createdAt: new Date().toISOString()
        },
      },
    });

  } catch (err) {
    console.error("Gönderi hatası:", err);
    
    // 401 hatası için özel mesaj
    if (err.response?.status === 401) {
      setErrorMsg("API erişim hatası. Lütfen farklı bir mock API deneyin.");
    } else {
      setErrorMsg("Gönderi hatası oluştu. Tekrar deneyin.");
    }
    
    setLastResponse({
      ok: false,
      error: (err && err.message) || "Unknown error",
      status: err.response?.status
    });
  } finally {
    setSubmitting(false);
  }
}




  return (
    <div className="min-h-screen bg-[#FAF7F2]" >
      {/* Header */}
      <header className="bg-[#CE2829] text-white h-[30vh] flex flex-col justify-center"> 
        <div className="max-w-8xl mx-auto flex flex-col items-center py-6 px-4"> 
          <div className="flex flex-col items-center inline-block mr-4"> 
            <img src="/logo.svg" alt="Logo" className="h-12 w-auto mx-auto" /> 
            <div className="mt-2 w-auto self-start"> 
              <p className="text-white text-sm"> AnaSayfa - Pizzalar - <span style={{ fontWeight: 700 }}>Sipariş oluştur</span> </p> 
            </div> 
          </div>
        </div> 
      </header>

      {/*  Main */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-full md:w-2/5 px-4 py-10">
     <form
  ref={formRef}
  onSubmit={handleSubmit}
  className=" md:grid-cols-3 gap-8"
  noValidate
>
  <div />

  {/* 2. sütünde form yerleşti */}
  <div className="col-start-2">
    <section className="bg-white rounded-lg p-6 shadow">
      <div className="grid grid-cols-1 gap-6">
        {/* ana veriler */}
        <div className="md:col-span-2">
          <h2 data-cy="title" className="text-2xl font-semibold mb-2" style={{ color: COLORS.darkGray }}>
            Position Absolute Acı Pizza
          </h2>

          <div className="mb-4">
  {/* ÜST SATIR: solda fiyat, sağda puan (aynı hizada) */}
  <div className="flex items-center justify-between mb-3">
    {/* Solda: fiyat (büyük) */}
    <div className="text-[25px] md:text-4xl font-extrabold" style={{ color: COLORS.darkGray }}>
      {formatPrice(BASE_PRICE)}
    </div>

    {/* Sağda: puan ve yorum sayısı */}
    <div className="flex items-center gap-3 text-sm text-500" style={{ color: COLORS.darkGray }}>
      <div className="text-lg font-medium">4.9</div>
      <div className="opacity-70">(200)</div>
    </div>
  </div>

  {/* AÇIKLAMA:*/}
  <p className="text-sm text-600 leading-relaxed opacity-80" style={{ color: COLORS.darkGray }}>
    Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
    Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra
    geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
    düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.
    Küçük bir pizzaya bazen pizzetta denir.
  </p>
</div>

          {/* Boyut */}
          <fieldset className="grid grid-cols-2 mb-2 p-3" style={{ color: COLORS.darkGray }}>
            <legend className style={{ fontWeight: 700 }}>Boyut Seç<span className="text-700" style={{ color: COLORS.red }} aria-hidden="true">*</span></legend>
           <div className="flex-col mb-6">
              {SIZES.map((s) => (
                <label key={s.id} className="flex items-center p-3 gap-8 cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value={s.id}
                    checked={size === s.id}
                    onChange={() => setSize(s.id)}
                    disabled={submitting}
                    required
                  />
                  <span>{s.label} {s.modifier !== 0 && <span className="text-sm text-gray-500">(+{s.modifier}₺)</span>}</span>
                </label>
              ))}
            </div>
          

          {/* Hamur seçimi */}
          <div className="mb-20 gap-y-6" >
            <label className="block mb-6" style={{ fontWeight: 700}} >Hamur Seç<span className="text-600" style={{ color: COLORS.red }} aria-hidden="true">*</span></label>
            <select
              value={crust}
              onChange={(e) => setCrust(e.target.value)}
              className="border rounded px-3 py-2"
              disabled={submitting}
            >
              {CRUSTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          </fieldset>

          {/* Malzemeler */}
          <fieldset data-cy="extras" className="mb-4">
            <legend className="font-semibold mb-2 text-black">Ek Malzemeler</legend>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {EXTRAS.map((ex) => {
                const checked = selectedExtras.includes(ex.id);
                return (
                  <label
                    key={ex.id}
                    className={`flex items-center gap-2 bg-[#FAF7F2] border rounded px-2 py-2 cursor-pointer ${
                      checked ? "border-yellow-400" : "border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleExtra(ex.id)}
                      disabled={submitting}
                      data-cy={`extra-${ex.id}`}
                    />
                    <div className="text-sm">
                      <div style={{ color: COLORS.darkGray }}>{ex.label}</div>
                      <div className="text-xs text-gray-400">{formatPrice(ex.price)}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="mt-2 text-sm ">
              <span className="text-gray-500">Seçildi {selectedExtras.length}</span>
              <span className="ml-3 text-gray-500"> (minimum {MIN_EXTRAS}, maximum {MAX_EXTRAS})</span>
              {!isExtrasCountValid && (
                <div className="text-red-600 mt-1">
                  Lütfen en az {MIN_EXTRAS}, en çok {MAX_EXTRAS} malzeme seçin.
                </div>
              )}
            </div>
          </fieldset>

          {/* Not bölümü */}
          <div className="mb text-gray-700">
            <label className="block mb-2 font-semibold text-gray-700">Sipariş Notu</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              cl assName="w-full border rounded p-3 min-h-[80px]"
              disabled={submitting}
            />
            <label className="block mb-2 font-semibold text-gray-700">İsim</label>
              <input
              name="name"
              data-cy="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınızı girin (en az 3 karakter)"
              className="w-full border rounded p-3 mb-3"
              disabled={submitting}
              aria-invalid={!isNameValid}
              />
              {!isNameValid && (
           <div className="text-sm text-red-600 mb-3">İsim en az 3 karakter olmalıdır.</div> )}
          </div>
        </div>

        {/* seçme, onay */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg p-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Adet</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  data-cy="qty-minus"
                  onClick={() => changeQty(-1)}
                  disabled={submitting || quantity <= 1}
                  className="w-9 h-9 rounded flex items-center justify-center font-bold"
                  style={{ backgroundColor: COLORS.yellow }}
                >
                  -
                </button>
                <div data-cy="quantity-display" className="px-4 text-gray-600">{quantity}</div>
                <button
                  type="button"
                  data-cy="qty-plus"
                  onClick={() => changeQty(1)}
                  disabled={submitting}
                  className="w-9 h-9 rounded flex items-center justify-center font-bold"
                  style={{ backgroundColor: COLORS.yellow }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="border-t pt-4 mt-4 text-gray-700">
              <div className="text-sm flex justify-between">
                <span>Seçimler</span>
                <span>{formatPrice(extrasTotal * quantity)}</span>
              </div>

              <div className="text-sm flex justify-between mt-2">
                <span>Toplam</span>
                <span>{formatPrice(unitPrice)}</span>
              </div>

              <div data-cy="total-price" className="text-lg font-bold flex justify-between mt-4">
                <span>Toplam</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              {errorMsg && <div className="mt-3 text-sm text-red-600">{errorMsg}</div>}

              <button
                type="submit"
                data-cy="submit-order"
                disabled={submitting || !isFormValid}
                className="mt-4 w-full py-3 rounded font-semibold"
                style={{
                  backgroundColor: isFormValid ? COLORS.yellow : "#e6e6e6",
                  color: isFormValid ? COLORS.darkGray : "#888",
                }}
              >
                {submitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
              </button>

              {lastResponse && lastResponse.ok && (
                <div className="mt-3 p-3 rounded bg-green-50 border border-green-200 text-sm">
                  Siparişiniz gönderildi. ID (mock): {lastResponse.data.id ?? "(none)"}.
                  <div className="text-xs text-gray-500 mt-1">Server restrict.</div>
                </div>
              )}
              {lastResponse && !lastResponse.ok && (
                <div className="mt-3 p-3 rounded bg-red-50 border border-red-200 text-sm">
                  Gönderi hatası oluştu.  {lastResponse.error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
<div />
</form>
        </div>
      </main>
      {/* Floating Button - Fixed */}
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
