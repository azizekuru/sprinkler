import React from "react";

/**
 * Giriş Formu Bileşeni
 * @param {object} props
 * @param {string} props.message API veya başarılı/başarısız mesajı
 * @param {object} props.errors Doğrulama hataları
 * @param {object} props.form Form verileri (email, password)
 * @param {function} props.change Input değişimini işleyen fonksiyon
 * @param {function} props.handleSubmit Form gönderimini işleyen fonksiyon
 * @param {function} props.setAuthMode Auth modunu değiştiren fonksiyon
 */
export default function Login({ message, errors, form, change, handleSubmit, setAuthMode }) {
  return (
    <form className="block" onSubmit={handleSubmit}>
      {/* Email Input */}
      <label className="block mb-3 text-sm font-medium text-gray-900">
        <span className="flex justify-between items-center mb-1.5">Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={change}
          placeholder="Enter your email"
          required
          // input styles
          className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
        />
        {/* error-message */}
        {errors.email && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.email}</p>}
      </label>

      {/* Password Input */}
      <label className="block mb-3 text-sm font-medium text-gray-900">
        <span className="flex justify-between items-center mb-1.5">
          Password{" "}
          <small
            className="font-normal text-black text-xs cursor-pointer"
            onClick={() => setAuthMode("forgotPassword")}
          >
            Forgot Password?
          </small>
        </span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={change}
          placeholder="Enter your password"
          required
          // input styles
          className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
        />
        {/* error-message */}
        {errors.password && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.password}</p>}
      </label>

      {/* primary-btn */}
      <button type="submit" className="w-full h-9 rounded-md bg-gray-900 text-white px-4 py-2 border-none cursor-pointer font-semibold mt-2 transition duration-150 ease-in-out hover:opacity-90">
        Log In
      </button>

      {/* api-message */}
      {message && <p className="mt-2 text-center text-teal-700">{message}</p>}
    </form>
  );
}