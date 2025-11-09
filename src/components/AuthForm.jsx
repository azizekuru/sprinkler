import React, { useState, useRef, useEffect, useCallback } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home"; 
import { useAuthLogic } from "../hooks/useAuthLogic"; 

/* Leaf SVG component - Dışarı Aktarılıyor */
export const LeafSVG = ({ color, size, left, delay, duration, sway }) => { 
  return (
    <svg
      className="drop-shadow-sm rounded-[12%_88%_88%_12%_/_50%_30%_70%_50%] opacity-95"
      viewBox="0 0 64 64"
      style={{
        position: "absolute",
        left: `${left}vw`,
        top: "-10vh",
        width: `${size}px`,
        height: `${size}px`,
        fill: color,
        animationName: 'leaf-fall', // index.css'den gelen keyframe adını kullanır
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: '1', // Düşen yaprağın kaybolmasını sağlar
        transformOrigin: "center",
        pointerEvents: "none",
        zIndex: 0,
        "--sway": `${sway}vw`,
      }}
    >
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
    </svg>
  );
};

export default function AuthForm() {
  const [currentMode, setCurrentMode] = useState("home");
  
  const {
    mode, message, errors, form, setAuthMode, change, handleSubmit, handleSendResetLink
  } = useAuthLogic(currentMode); 

  // Change modes and update history so that browser back/forward only
  // navigates between Home <-> Login and Home <-> Register.
  const handleSetAuthMode = useCallback((newMode, replace = false) => {
    // Decide whether to push a new history entry or replace the current one.
    // We only push when coming from Home to Login/Register. All other
    // intra-auth navigation should replace the current entry so the back
    // button returns to Home rather than stepping through auth screens.
    const shouldPush = !replace && currentMode === 'home' && (newMode === 'login' || newMode === 'register');

    setCurrentMode(newMode);
    setAuthMode(newMode);

    try {
      const hash = `#${newMode}`;
      if (shouldPush) {
        window.history.pushState({ authMode: newMode }, '', hash);
      } else {
        window.history.replaceState({ authMode: newMode }, '', hash);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('History API error', e);
    }
  }, [currentMode, setAuthMode]);

  const [leaves, setLeaves] = useState([]);
  const nextIdRef = useRef(0); // ID'leri takip etmek için ref kullanıldı

  const leafColors = [
    "#D2691E", "#FF8C00", "#DAA520", "#CD853F", "#8B4513", "#FF6347"
  ];

  const createLeafObj = () => {
    const id = nextIdRef.current++;
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    const size = 40 + Math.random() * 40; 
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 8 + Math.random() * 4;
    const sway = 4 + Math.random() * 6;
    return { id, color, size, left, delay, duration, sway };
  };

  useEffect(() => {
    // Başlangıçta 20 yaprak oluştur
    const initial = Array.from({ length: 20 }, () => createLeafObj());
    setLeaves(initial);

    // Yeni yapraklar eklemek için periyodik aralık
    const addInterval = setInterval(() => {
      // Rastgele 1 ila 3 yeni yaprak ekle
      const newBatch = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => createLeafObj());
      
      setLeaves(prevLeaves => [...prevLeaves, ...newBatch]);
    }, 2000);

    // Kaybolan yaprakları kaldırmak için periyodik aralık
    const cleanupInterval = setInterval(() => {
        // Belirli bir süreden (örneğin 14 saniye, en uzun animasyon süresi 12 saniye olduğu için) 
        // daha uzun süredir var olan yaprakları temizle. Basitlik için sadece 
        // listenin başından 30 yaprağı kaldırıyoruz.
        setLeaves(prevLeaves => prevLeaves.slice(3)); 
    }, 14000); 

    return () => {
      clearInterval(addInterval);
      clearInterval(cleanupInterval);
    };
  }, []);

  // Initialize current mode from the URL hash or history state and
  // listen to popstate so browser back/forward changes the UI.
  useEffect(() => {
    const deriveModeFromLocation = () => {
      const stateMode = window.history.state && window.history.state.authMode;
      if (stateMode) return stateMode;
      const hash = (window.location.hash || '').replace('#', '');
      return hash || 'home';
    };

    const initialMode = deriveModeFromLocation();
    setCurrentMode(initialMode);
    setAuthMode(initialMode);
    try {
      const hash = `#${initialMode}`;
      window.history.replaceState({ authMode: initialMode }, '', hash);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('History API replaceState failed', e);
    }

    const onPopState = (ev) => {
      const modeFromState = ev.state && ev.state.authMode;
      const mode = modeFromState || (window.location.hash || '').replace('#', '') || 'home';
      setCurrentMode(mode);
      setAuthMode(mode);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [setAuthMode]);

  // Başlık metinlerini mode'a göre ayarlayan yardımcı fonksiyon
  const getHeader = () => {
    switch (mode) {
      case "login":
        return { h2: "Welcome Back", p: "Sign in to your account" };
      case "register":
        return { h2: "Create Account", p: "Sign up for a new account" };
      default: 
        return { h2: null, p: null };
    }
  };
  const header = getHeader();


  const renderAuthComponent = () => {
    switch (mode) {
      case "home":
        return <Home setAuthMode={handleSetAuthMode} />; 
      case "login":
        return (
          <>
            {/* Card Header */}
            <div className="text-center">
              <h2 className="mt-0 mb-1.5 text-lg font-medium text-gray-900">{header.h2}</h2>
              <p className="mb-4 text-sm text-gray-500">{header.p}</p>
            </div>
            <Login
              message={message}
              errors={errors}
              form={form}
              change={change}
              handleSubmit={handleSubmit}
              setAuthMode={handleSetAuthMode}
            />
            {/* Switch Line */}
            <p className="mt-3 text-sm text-center text-gray-700">
              Don't have an account?{" "}
              <button
                type="button"
                className="bg-transparent border-none text-gray-900 font-semibold cursor-pointer p-0"
                onClick={() => handleSetAuthMode("register")}
              >
                Sign Up
              </button>
            </p>
          </>
        );
      case "register":
        return (
          <>
             {/* Card Header */}
             <div className="text-center">
              <h2 className="mt-0 mb-1.5 text-lg font-medium text-gray-900">{header.h2}</h2>
              <p className="mb-4 text-sm text-gray-500">{header.p}</p>
            </div>
            <Register
              message={message}
              errors={errors}
              form={form}
              change={change}
              handleSubmit={handleSubmit}
            />
             {/* Switch Line */}
            <p className="mt-3 text-sm text-center text-gray-700">
              Already have an account?{" "}
              <button
                type="button"
                className="bg-transparent border-none text-gray-900 font-semibold cursor-pointer p-0"
                onClick={() => handleSetAuthMode("login")}
              >
                Log In
              </button>
            </p>
          </>
        );
      case "forgotPassword":
        return (
          <ForgotPassword
            message={message}
            errors={errors}
            form={form}
            change={change}
            handleSendResetLink={handleSendResetLink}
            setAuthMode={handleSetAuthMode}
          />
        );
      default:
        return null;
    }
  };

  // AuthForm'un temel yapısı
  return (
    // auth-bg
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50 font-sans text-base">

      {/* leaves-layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        {leaves.map((lf) => (
          <LeafSVG
            key={lf.id}
            color={lf.color}
            size={lf.size}
            left={lf.left}
            delay={lf.delay}
            duration={lf.duration}
            sway={lf.sway}
          />
        ))}
      </div>

      {/* auth-card - Sadece Auth modlarında kart gösterilir, Home modunda içerik ortalanır. */}
      {mode !== "home" ? (
        <div className="relative z-10 w-full max-w-md bg-white rounded-xl border border-gray-200 p-6 shadow-xl max-sm:m-4 max-sm:w-[calc(100%-32px)]">
          {renderAuthComponent()}
        </div>
      ) : (
        renderAuthComponent()
      )}
    </div>
  );
}