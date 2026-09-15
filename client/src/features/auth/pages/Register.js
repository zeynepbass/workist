
import {
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { Button, Input } from "@/shared/components/atoms";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
    const {
        formData,
        passwordVisible,
        handleChange,
        handleRegisterSubmit,
        togglePasswordVisibility,
        isRegisterLoading,
    } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-purple-700">
                        Kayıt Ol
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Yeni hesabınızı oluşturun.
                    </p>
                </div>

                <form
                    onSubmit={handleRegisterSubmit}
                    className="space-y-5"
                >

                        <Input
                            label="Adı"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Adınız"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            autoComplete="given-name"
                            required
                        />

                        <Input
                            label="Soyadı"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Soyadınız"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            autoComplete="family-name"
                            required
                        />


                    <Input
                        label="E-posta"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-posta adresiniz"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        autoComplete="email"
                        required
                    />

                    <div className="relative">
                        <Input
                            label="Parola"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type={
                                passwordVisible
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Parolanızı girin"
                            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            autoComplete="new-password"
                            required
                        />

                        <Button
                            type="button"
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

                    <div className="relative">
                        <Input
                            label="Parola Tekrar"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type={
                                passwordVisible
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Parolanızı tekrar girin"
                            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            autoComplete="new-password"
                            required
                        />

                        <Button
                            type="button"
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

                    <Button
                        type="submit"
                        disabled={isRegisterLoading}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRegisterLoading
                            ? "Kayıt yapılıyor..."
                            : "Kayıt Ol"}
                    </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">
                        Zaten üye misin?{" "}
                        <Link
                            to="/"
                            className="text-purple-600 font-medium hover:text-purple-700 transition"
                        >
                            Giriş yap
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

