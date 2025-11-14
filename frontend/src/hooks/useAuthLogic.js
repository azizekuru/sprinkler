import { useState, useCallback } from "react";
import { authService } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

export const useAuthLogic = (initialMode = "login") => {
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });

  const { login: authLogin } = useAuth();

  const setAuthMode = useCallback((newMode) => {
    setMode(newMode);
    setMessage("");
    setErrors({});
    setLoading(false);
    setForm({
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
    });
  }, []);

  const change = useCallback((e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email adresi gereklidir.";

    if (mode === "login" || mode === "register") {
      if (!form.password.trim()) newErrors.password = "Şifre gereklidir.";
    }

    if (mode === "register") {
      if (!form.name.trim()) newErrors.name = "Ad gereklidir.";
      if (!form.surname.trim()) newErrors.surname = "Soyad gereklidir.";
      if (!form.dateOfBirth.trim()) newErrors.dateOfBirth = "Doğum tarihi gereklidir.";
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Parolalar eşleşmiyor.";
      }
      if (form.password.length < 8) {
        newErrors.password = "Şifre en az 8 karakter olmalıdır.";
      }
      if (!/(?=.*[0-9])/.test(form.password) || !/(?=.*[a-zA-Z])/.test(form.password)) {
        newErrors.password = "Şifre en az bir sayı ve bir harf içermelidir.";
      }
    }
    return newErrors;
  }, [form, mode]);

  const handleSendResetLink = useCallback(async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const validationErrors = {};
    if (!form.email.trim()) {
      validationErrors.email = "Email adresi gereklidir.";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    setMessage("⏳ Şifre sıfırlama linki gönderiliyor...");
    setErrors({});

    try {
      await authService.forgotPassword(form.email);
      setMessage(`✅ Şifre sıfırlama linki e-posta adresinize gönderildi: ${form.email}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Lütfen e-posta adresinizi kontrol ediniz.';
      setMessage(`❌ Şifre sıfırlama hatası: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [form.email]);

  const handleSendVerificationEmail = useCallback(async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    setMessage("⏳ Doğrulama linki gönderiliyor...");
    setErrors({});

    try {
      await authService.sendVerificationEmail();
      setMessage(`✅ Doğrulama linki e-posta adresinize gönderildi`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Doğrulama linki gönderilemedi.';
      setMessage(`❌ Hata: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    console.log('🔵 Form submit başladı', { mode, email: form.email });
    
    setMessage("");
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      console.log('🔴 Validation hataları:', validationErrors);
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    setErrors({});

    try {
      let response;
      
      if (mode === "login") {
        console.log('🔵 Login isteği gönderiliyor...');
        response = await authService.login(form.email, form.password);
        console.log('🟢 Login response:', response);
        
        if (response.tokens && response.user) {
          console.log('🟢 Login başarılı, context güncelleniyor...');
          authLogin(response.user, response.tokens);
          setMessage(`✅ Giriş başarılı! Hoş geldiniz.`);
          
          setTimeout(() => {
            console.log('🟢 Yönlendirme yapılıyor: /communities');
            window.location.href = "/communities";
          }, 1000);
        } else {
          console.log('🔴 Response eksik:', { tokens: !!response.tokens, user: !!response.user });
          setMessage('❌ Giriş başarısız: Sunucu yanıtı eksik');
        }
        
      } else if (mode === "register") {
        console.log('🔵 Register isteği gönderiliyor...');
        response = await authService.register({
          name: form.name,
          surname: form.surname,
          email: form.email,
          password: form.password,
          dateOfBirth: form.dateOfBirth,
        });
        console.log('🟢 Register response:', response);
        
        if (response.tokens && response.user) {
          authLogin(response.user, response.tokens);
          setMessage(`✅ Kayıt başarılı! Email adresinize bir doğrulama linki gönderildi. Lütfen kontrol edin.`);
          
          // Email doğrulaması yapılmadıysa uyarı göster
          if (!response.user.isEmailVerified) {
            setTimeout(() => {
              setMessage('📧 Email doğrulaması için lütfen gelen kutunuzu kontrol edin.');
            }, 3000);
          }
          
          setTimeout(() => {
            window.location.href = "/communities";
          }, 5000);
        }
      }
    } catch (error) {
      console.error('🔴 Auth hatası:', error);
      console.error('🔴 Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || `${mode === "login" ? "Giriş" : "Kayıt"} başarısız.`;
      setMessage(`❌ Hata: ${errorMessage}`);
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  }, [form, mode, validate, authLogin]);

  return {
    mode,
    message,
    errors,
    form,
    loading,
    setAuthMode,
    change,
    handleSubmit,
    handleSendResetLink,
    handleSendVerificationEmail,
  };
};