import React from "react";
// Home bileşeninin içinden LeafSVG import'unu kaldırdık

/**
 * Ana Sayfa Bileşeni
 * @param {object} props
 * @param {function} props.setAuthMode Auth modunu değiştiren fonksiyon
 */
export default function Home({ setAuthMode }) {
  // Animasyon mantığı AuthForm'da yönetildiği için burada yapraklarla ilgili kod kalmadı.

  return (
    // AuthForm'daki arka plan ve yapraklar zaten bu div'in arka planında.
    // Bu yüzden buradaki stil artık sadece Home içeriği için.
    <div className="relative z-10 text-center">
      <h1 className="text-5xl font-bold text-orange-700 mb-8">Sprinkler</h1><br></br>

      <div className="flex flex-col space-y-4 max-w-[200px] mx-auto">
        {/* Giriş Yap Butonu */}
        <button
          type="button"
          className="w-full h-12 rounded-md bg-gray-900 text-white px-4 py-2 border-none cursor-pointer text-base font-semibold transition duration-150 ease-in-out hover:opacity-90"
          onClick={() => setAuthMode("login")}
        >
          Giriş Yap
        </button>

        {/* Kayıt Ol Butonu */}
        <button
          type="button"
          className="w-full h-12 rounded-md bg-gray-900 text-white px-4 py-2 border-none cursor-pointer text-base font-semibold transition duration-150 ease-in-out hover:opacity-90"
          onClick={() => setAuthMode("register")}
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}