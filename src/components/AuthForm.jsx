import React, { useEffect, useState, useRef } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { useAuthLogic } from "../hooks/useAuthLogic"; 

/* Leaf SVG component */
const LeafSVG = ({ color, size, left, delay, duration, sway }) => {
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
        animationIterationCount: '1',
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
  // Mantık ve state'ler artık useAuthLogic hook'undan geliyor
  const {
    mode, message, errors, form, setAuthMode, change, handleSubmit, handleSendResetLink
  } = useAuthLogic("login");

  // Yaprak animasyonu state ve mantığı burada kalır (UI'ya aittir)
  const [leaves, setLeaves] = useState([]);
  const leavesRef = useRef([]);

  const leafColors = [
    "#D2691E", "#FF8C00", "#DAA520", "#CD853F", "#8B4513", "#FF6347"
  ];

  const createLeafObj = (id) => {
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    //const size = 20 + Math.random() * 20;
    const size = 40 + Math.random() * 40; 
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 8 + Math.random() * 4;
    const sway = 4 + Math.random() * 6;
    return { id, color, size, left, delay, duration, sway };
  };

  useEffect(() => {
    const initial = Array.from({ length: 20 }, (_, i) => createLeafObj(i));
    setLeaves(initial);
    leavesRef.current = initial;

    let nextId = 20;
    const interval = setInterval(() => {
      const newBatch = Array.from({ length: 3 }, () => createLeafObj(nextId++));
      leavesRef.current = [...leavesRef.current, ...newBatch].slice(-200);
      setLeaves(leavesRef.current);
      setTimeout(() => {
        leavesRef.current = leavesRef.current.slice(newBatch.length);
        setLeaves(leavesRef.current);
      }, 14000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderAuthComponent = () => {
    switch (mode) {
      case "login":
        return (
          <Login
            message={message}
            errors={errors}
            form={form}
            change={change}
            handleSubmit={handleSubmit}
            setAuthMode={setAuthMode}
          />
        );
      case "register":
        return (
          <Register
            message={message}
            errors={errors}
            form={form}
            change={change}
            handleSubmit={handleSubmit}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPassword
            message={message}
            errors={errors}
            form={form}
            change={change}
            handleSendResetLink={handleSendResetLink}
            setAuthMode={setAuthMode}
          />
        );
      default:
        return null;
    }
  };

  // Başlık metinlerini mode'a göre ayarlayan yardımcı fonksiyon
  const getHeader = () => {
    switch (mode) {
      case "login":
        return { h2: "Welcome Back", p: "Sign in to your account" };
      case "register":
        return { h2: "Create Account", p: "Sign up for a new account" };
      default: // forgotPassword için başlık ForgotPassword.jsx'in içinde
        return { h2: null, p: null };
    }
  };
  const header = getHeader();

  // Switch butonu metinlerini mode'a göre ayarlayan yardımcı fonksiyon
  const getSwitchProps = () => {
    if (mode === "login") {
      return { text: "Don't have an account?", button: "Sign Up", newMode: "register" };
    } else if (mode === "register") {
      return { text: "Already have an account?", button: "Log In", newMode: "login" };
    }
    return null; // forgotPassword için switch butonu ForgotPassword.jsx'in içinde
  };
  const switchProps = getSwitchProps();

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

      {/* auth-card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl border border-gray-200 p-6 shadow-xl max-sm:m-4 max-sm:w-[calc(100%-32px)]">

        {/* Card Header (Login & Register için) */}
        {header.h2 && (
          <div className="text-center">
            <h2 className="mt-0 mb-1.5 text-lg font-medium text-gray-900">{header.h2}</h2>
            <p className="mb-4 text-sm text-gray-500">{header.p}</p>
          </div>
        )}

        {/* Dinamik Form Bileşeni */}
        {renderAuthComponent()}

        {/* Switch Line (Login & Register için) */}
        {switchProps && (
          <p className="mt-3 text-sm text-center text-gray-700">
            {switchProps.text}{" "}
            <button
              type="button"
              className="bg-transparent border-none text-gray-900 font-semibold cursor-pointer p-0"
              onClick={() => setAuthMode(switchProps.newMode)}
            >
              {switchProps.button}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}