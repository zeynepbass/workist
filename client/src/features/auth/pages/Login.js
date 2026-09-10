
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { Button,Input } from "@/shared/components/atoms";
import { useLogin } from "../hooks/useLogin";

const Index = () => {
  const navigate = useNavigate();

  const {
    formData,
    passwordVisible,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    isPending,
  } = useLogin();

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Giriş Yap
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <Input
            label=" E-posta"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-posta adresiniz"
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="email"
            required
            />


          </div>


          <div className="mb-4">
          <Input
            label="          Parola"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={passwordVisible ? "text" : "password"}
            placeholder="Parolanız"
            className="w-full p-3 border rounded border-gray-300 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="current-password"
            required
            />
   

            <div className="relative">
  

              <Button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600"
              >
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  size="lg"
                />
              </Button>
            </div>
          </div>


          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition mb-3 disabled:opacity-50"
          >
            {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>


        <Button
          type="button"
          className="w-full bg-gray-100 text-gray-700 py-3 rounded border hover:bg-gray-200 transition"
          onClick={() => navigate("/kayit-ol")}
        >
          Kayıt Ol
        </Button>
      </div>
    </div>
  );
};

export default Index;

