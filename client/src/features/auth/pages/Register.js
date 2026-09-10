import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { Button, Input } from "@/shared/components/atoms";
import { useAuth } from "../hooks/useAuth";

const Index = () => {
  const {
    formData,
    passwordVisible,
    handleChange,
    handleRegisterSubmit,
    togglePasswordVisibility,
    isRegisterLoading,
  } = useAuth();

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <form onSubmit={handleRegisterSubmit}>
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
            Kayıt Ol
          </h2>

          <div className="flex">
            <div className="mb-4 mr-1">
              <Input
                label="Adı"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Adınızı girin"
                className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-4">
              <Input
                label="Soyadı"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Soyadınızı girin"
                className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <Input
              label="            E-posta"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-posta adresiniz"
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Parola"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={passwordVisible ? "text" : "password"}
              placeholder="Parolanızı girin"
              className="w-full p-3 border rounded border-gray-300 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="relative">
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-purple-600 hover:underline"
              >
                {passwordVisible ? (
                  <FontAwesomeIcon icon={faEyeSlash} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faEye} size="lg" />
                )}
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <Input
              label="            Parola Tekrar"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={passwordVisible ? "text" : "password"}
              placeholder="Parolanızı tekrar girin"
              className="w-full p-3 border rounded border-gray-300 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="relative">
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-purple-600 hover:underline"
              >
                {passwordVisible ? (
                  <FontAwesomeIcon icon={faEyeSlash} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faEye} size="lg" />
                )}
              </Button>
            </div>

            <p className="text-right pt-4 text-gray-400">
              Zaten üye misin?{" "}
              <Link to="/" className="text-purple-300">
                Giriş yap
              </Link>
            </p>
          </div>

          <Button
            type="submit"
            disabled={isRegisterLoading}
            className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition mb-3"
          >
            {isRegisterLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
