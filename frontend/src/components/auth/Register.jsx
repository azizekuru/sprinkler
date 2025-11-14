import React from "react";

/**
 * Kayıt Formu Bileşeni
 * @param {object} props
 * @param {string} props.message API veya başarılı/başarısız mesajı
 * @param {object} props.errors Doğrulama hataları
 * @param {object} props.form Form verileri (name, surname, email, password, confirmPassword, dateOfBirth)
 * @param {function} props.change Input değişimini işleyen fonksiyon
 * @param {function} props.handleSubmit Form gönderimini işleyen fonksiyon
 */
export default function Register({ message, errors, form, change, handleSubmit }) {
  return (
    <div>
      {/* Verification Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium">Email Doğrulaması Gerekli</p>
            <p className="text-xs text-blue-700 mt-1">Kayıt olduktan sonra email adresinize bir doğrulama linki gönderilecek.</p>
          </div>
        </div>
      </div>

      <div className="block">
        {/* Name Input */}
        <label className="block mb-3 text-sm font-medium text-gray-900">
          <span className="flex justify-between items-center mb-1.5">Ad</span>
          <input
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Adınızı girin"
            required
            className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.name}</p>}
        </label>

        {/* Surname Input */}
        <label className="block mb-3 text-sm font-medium text-gray-900">
          <span className="flex justify-between items-center mb-1.5">Soyad</span>
          <input
            name="surname"
            value={form.surname}
            onChange={change}
            placeholder="Soyadınızı girin"
            required
            className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
          />
          {errors.surname && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.surname}</p>}
        </label>

        {/* Date of Birth Input */}
        <label className="block mb-3 text-sm font-medium text-gray-900">
          <span className="flex justify-between items-center mb-1.5">Doğum Tarihi</span>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={change}
            required
            className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.dateOfBirth}</p>}
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
            className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
          />
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
            className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
          />
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
            className="w-full h-9 rounded-md bg-gray-100 border border-transparent px-3 py-1 text-sm font-light transition duration-150 ease-in-out focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 font-medium">❌ {errors.confirmPassword}</p>}
        </label>

        {/* primary-btn */}
        <button 
          type="button"
          onClick={handleSubmit}
          className="w-full h-9 rounded-md bg-gray-900 text-white px-4 py-2 border-none cursor-pointer font-semibold mt-2 transition duration-150 ease-in-out hover:opacity-90"
        >
          Sign Up
        </button>

        {/* api-message */}
        {message && (
          <div className={`mt-2 text-center ${message.includes('✅') ? 'text-teal-700' : message.includes('❌') ? 'text-red-600' : 'text-blue-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}