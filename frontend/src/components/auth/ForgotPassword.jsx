import React from "react";

/**
 * Şifremi Unuttum Formu Bileşeni
 * @param {object} props
 * @param {string} props.message API veya başarılı/başarısız mesajı
 * @param {object} props.errors Doğrulama hataları
 * @param {object} props.form Form verileri (email)
 * @param {function} props.change Input değişimini işleyen fonksiyon
 * @param {function} props.handleSendResetLink Şifre sıfırlama linki gönderme işlemini işleyen fonksiyon
 * @param {function} props.setAuthMode Auth modunu değiştiren fonksiyon
 */
export default function ForgotPassword({ message, errors, form, change, handleSendResetLink, setAuthMode }) {
  return (
    <>
      {/* card-header */}
      <div className="text-center">
        <h2 className="mt-0 mb-1.5 text-lg font-medium text-gray-900">Reset Password</h2>
        <p className="mb-4 text-sm text-gray-500">Enter your email to receive a reset link</p>
      </div>

      {/* card-form */}
      <form className="block" onSubmit={handleSendResetLink}>
        {/* label */}
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

        {/* primary-btn */}
        <button type="submit" className="w-full h-9 rounded-md bg-gray-900 text-white px-4 py-2 border-none cursor-pointer font-semibold mt-2 transition duration-150 ease-in-out hover:opacity-90">
          Send Reset Link
        </button>

        {/* api-message */}
        {message && <p className="mt-2 text-center text-teal-700">{message}</p>}
      </form>

      {/* switch-line */}
      <p className="mt-3 text-sm text-center text-gray-700">
        <button type="button" className="bg-transparent border-none text-gray-900 font-semibold cursor-pointer p-0" onClick={() => setAuthMode("login")}>
          Back to Login
        </button>
      </p>
    </>
  );
}