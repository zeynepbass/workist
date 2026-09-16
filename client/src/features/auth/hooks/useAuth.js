
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as authRepository from "../repositories/auth.repository";

export function useAuth() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [passwordVisible, setPasswordVisible] =
        useState(false);

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
            localStorage.setItem("token", data.token);
            localStorage.setItem("login", JSON.stringify(data.result));

            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });

            toast.success(data?.message || "Giriş başarılı.");

            navigate("/workist");
        },
    
        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "E-posta veya parola hatalı."
            );
        },
    });
    
    const registerMutation = useMutation({
        mutationFn: (data) => authRepository.register(data),
    
        onSuccess: (data) => {
            toast.success(
                data?.message || "Kayıt başarılı. Giriş yapabilirsiniz."
            );
    
            navigate("/");
        },
    
        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Kayıt sırasında bir hata oluştu."
            );
        },
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "email"
                    ? value.toLowerCase()
                    : value,
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.email || !formData.password) {
            toast.error("Lütfen tüm alanları doldurun.");
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
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Şifreler uyuşmuyor.");
     
            return;
        }

        registerMutation.mutate({
            email,
            password,
            confirmPassword,
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
}

