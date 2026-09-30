import { Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Giriş Yap"
      subtitle="Hesabınıza giriş yaparak devam edin."
      footer={
        <p className="text-center text-sm text-gray-500">
          Henüz hesabınız yok mu?{" "}
          <Link to="/kayit-ol" className="font-medium text-purple-600 hover:text-purple-700">
            Kayıt Ol
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
