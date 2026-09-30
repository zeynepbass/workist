import { Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Kayıt Ol"
      subtitle="Yeni hesabınızı oluşturun."
      footer={
        <p className="text-center text-sm text-gray-500">
          Zaten üye misin?{" "}
          <Link to="/" className="font-medium text-purple-600 hover:text-purple-700">
            Giriş yap
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
