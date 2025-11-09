import { useState, useCallback } from "react";

export const useAuthLogic = (initialMode = "home") => { // initialMode varsayılanı 'home' olarak ayarlandı
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setAuthMode = useCallback((newMode) => {
    setMode(newMode);
    setMessage("");
    setErrors({});
    setForm({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, []);

  const change = useCallback((e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value })),
    []
  );

  const validate = useCallback(() => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email adresi gereklidir.";

    // Sadece login ve register modlarında şifre doğrulama
    if (mode === "login" || mode === "register") {
      if (!form.password.trim()) newErrors.password = "Şifre gereklidir.";
    }

    if (mode === "register") {
      if (!form.fullName.trim()) newErrors.fullName = "Ad Soyad gereklidir.";
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Parolalar eşleşmiyor.";
      }
    }
    return newErrors;
  }, [form, mode]);

  const handleSendResetLink = useCallback(async (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = {};
    if (!form.email.trim()) {
      validationErrors.email = "Email adresi gereklidir.";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setMessage("⏳ Şifre sıfırlama linki gönderiliyor...");
    setErrors({});

    const forgotPasswordUrl = "https://api.sizin-domain.com/v1/auth/forgot-password";

    try {
      const res = await fetch(forgotPasswordUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      if (res.ok || res.status === 200 || res.status === 204) {
        setMessage(`✅ Şifre sıfırlama linki e-posta adresinize gönderildi: ${form.email}`);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setMessage(`❌ Şifre sıfırlama hatası: ${errorData.message || 'Lütfen e-posta adresinizi kontrol ediniz.'}`);
      }
    } catch (err) {
      setMessage("❌ Sunucu hatası: Şifre sıfırlama isteği gönderilemedi.");
    }
  }, [form.email]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const url = mode === "login"
      ? "https://reqres.in/api/login"
      : "https://reqres.in/api/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("accessToken", data.token);
        setMessage(`✅ ${mode === "login" ? "Giriş" : "Kayıt"} başarılı! Token: ${data.token}`);
      } else {
        setMessage(`❌ Hata: ${data.error || `${mode === "login" ? "Giriş" : "Kayıt"} başarısız.`}`);
      }
    } catch (err) {
      setMessage("❌ Sunucu hatası: " + (err.message || "Bilinmeyen bir hata oluştu."));
    }
  }, [form.email, form.password, mode, validate]);

  return {
    mode,
    message,
    errors,
    form,
    setAuthMode,
    change,
    handleSubmit,
    handleSendResetLink,
  };
};