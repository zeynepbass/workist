
import {
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "@/shared/components/atoms";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();

    const {
        formData,
        passwordVisible,
        handleChange,
        handleLoginSubmit,
        togglePasswordVisibility,
        isPending,
    } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">

  
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-purple-700">
                        Giriş Yap
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Hesabınıza giriş yaparak devam edin.
                    </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-5">

    
                    <Input
                        label="E-posta"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-posta adresiniz"
    className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"

                        autoComplete="email"
                        required
                    />

 
                    <div>
                        <div className="relative">
                            <Input
                                label="Parola"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type={
                                    passwordVisible
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Parolanız"
                                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                autoComplete="current-password"
                                required
                            />

                            <Button
                                type="submit"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-[38px] text-gray-500 hover:text-purple-600 transition"
                                aria-label={
                                    passwordVisible
                                        ? "Parolayı gizle"
                                        : "Parolayı göster"
                                }
                            >
                                <FontAwesomeIcon
                                    icon={
                                        passwordVisible
                                            ? faEyeSlash
                                            : faEye
                                    }
                                />
                            </Button>
                        </div>
                    </div>

         
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending
                            ? "Giriş yapılıyor..."
                            : "Giriş Yap"}
                    </Button>
                </form>


                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500 mb-3">
                        Henüz hesabınız yok mu?
                    </p>

                    <Button
                        type="button"
                        className="w-full bg-white text-purple-600 py-3 rounded-lg border border-purple-200 hover:bg-purple-50 transition font-medium"
                        onClick={() =>
                            navigate("/kayit-ol")
                        }
                    >
                        Kayıt Ol
                    </Button>
                </div>
            </div>
        </div>
    );
}

