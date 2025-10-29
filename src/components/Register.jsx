import React from "react";

/**
 * Kayıt Formu Bileşeni
 * @param {object} props
 * @param {string} props.message API veya başarılı/başarısız mesajı
 * @param {object} props.errors Doğrulama hataları
 * @param {object} props.form Form verileri (fullName, email, password, confirmPassword)
 * @param {function} props.change Input değişimini işleyen fonksiyon
 * @param {function} props.handleSubmit Form gönderimini işleyen fonksiyon
 */
export default function Register({ message, errors, form, change, handleSubmit }) {
  return (
    <form className="block" onSubmit={handleSubmit}>
      {/* Full Name Input */}
      <label className="block mb-3 text-sm font-medium text-gray-900">
        <span className="flex justify-between items-center mb-1.5">Full Name</span>
        <input
          name="fullName"
          value={form.fullName}
          onChange={change}
          placeholder="Enter your full name"
          required
          // input styles
          className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
        />
        {/* error-message */}
        {errors.fullName && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.fullName}</p>}
      </label>

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
        <span className="flex justify-between items-center mb-1.5">Create a Password</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={change}
          placeholder="Create a password"
          required
          // input styles
          className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
        />
        {/* error-message */}
        {errors.password && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.password}</p>}
      </label>

      {/* Confirm Password */}
      <label className="block mb-3 text-sm font-medium text-gray-900">
        <span className="flex justify-between items-center mb-1.5">Confirm Password</span>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={change}
          placeholder="Confirm your password"
          required
          // input styles
          className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
        />
        {/* error-message */}
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.confirmPassword}</p>}
      </label>

      {/* primary-btn */}
      <button type="submit" className="w-full h-9 rounded-md bg-gray-900 text-white px-4 py-2 border-none cursor-pointer font-semibold mt-2 transition duration-150 ease-in-out hover:opacity-90">
        Sign Up
      </button>

      {/* api-message */}
      {message && <p className="mt-2 text-center text-teal-700">{message}</p>}
    </form>
  );
}