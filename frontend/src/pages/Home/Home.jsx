import React from "react";
import { useNavigate } from "react-router-dom";
import LeafAnimation from "../../components/ui/LeafAnimation";

const Home = () => {
  const navigate = useNavigate();

  // Leaves animation handled by shared LeafAnimation component

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50 font-sans text-base">

      {/* leaves-layer (shared) */}
      <LeafAnimation />

      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-orange-700 mb-10">Sprinkler</h1>

        <div className="flex flex-col space-y-4 max-w-[200px] mx-auto">
          <button
            onClick={() => navigate("/login")}
            className="w-full h-12 rounded-md bg-gray-900 text-white px-4 py-2 border-none cursor-pointer text-base font-semibold transition duration-150 ease-in-out hover:opacity-90"
          >
            Giriş Yap
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full h-12 rounded-md bg-gray-900 text-white px-4 py-2 border-none cursor-pointer text-base font-semibold transition duration-150 ease-in-out hover:opacity-90"
          >
            Kayıt Ol
          </button>

        </div>
      </div>
      
    </div>
  );
};

export default Home;
