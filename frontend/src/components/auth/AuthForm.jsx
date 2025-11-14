import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { useAuthLogic } from "../../hooks/useAuthLogic";
import LeafAnimation from "../ui/LeafAnimation";

export default function AuthForm() {
  // useAuthLogic hook'unu kullan
  // Varsayılan modu, URL yoluna göre ayarla (örn. /register için register)
  const location = useLocation();
  const initialMode = location.pathname === "/register" ? "register" : "login";
  const {
    mode,
    message,
    errors,
    form,
    setAuthMode,
    change,
    handleSubmit,
    handleSendResetLink,
    handleSendVerificationEmail,
  } = useAuthLogic(initialMode);

  // Eğer URL değişirse (ör. /login -> /register) auth modunu URL'e göre senkronize et
  useEffect(() => {
    // setAuthMode, useAuthLogic içindeki state'i günceller
    setAuthMode(initialMode);
  }, [initialMode, setAuthMode]);

  // Leaf animation rendered by shared component

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
            handleSendVerificationEmail={handleSendVerificationEmail}
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

      {/* leaves-layer (shared) */}
      <LeafAnimation />

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