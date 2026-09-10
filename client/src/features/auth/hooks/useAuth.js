import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import authRepository from "../repositories/authRepository";

export const useAuth = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const loginMutation = useMutation({
    mutationFn: (data) => authRepository.login(data),

    onSuccess: (data) => {
      console.log("Login başarılı:", data);

    },

    onError: (error) => {
      console.error("Login hatası:", error);
      alert("E-posta veya parola hatalı.");
    },
  });


  const registerMutation = useMutation({
    mutationFn: (data) => authRepository.register(data),

    onSuccess: (data) => {
      console.log("Kayıt başarılı:", data);

      alert("Kayıt başarılı. Giriş yapabilirsiniz.");
      navigate("/");
    },

    onError: (error) => {
      console.error("Kayıt hatası:", error);

      alert(
        error?.response?.data?.message ||
          "Kayıt sırasında bir hata oluştu."
      );
    },
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };


  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };


  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
    } = formData;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !confirmPassword
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Şifreler uyuşmuyor.");
      return;
    }

    registerMutation.mutate({
      email,
      password,
      firstName,
      lastName,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return {


    formData,
    handleChange,


    passwordVisible,
    togglePasswordVisibility,


    handleLoginSubmit,
    isLoginLoading: loginMutation.isPending,
    isLoginError: loginMutation.isError,
    loginError: loginMutation.error,


    handleRegisterSubmit,
    isRegisterLoading: registerMutation.isPending,
    isRegisterError: registerMutation.isError,
    registerError: registerMutation.error,
  };
};