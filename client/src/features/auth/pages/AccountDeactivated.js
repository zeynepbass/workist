import { Link } from "react-router-dom";

export default function AccountDeactivated() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-200 p-4">
      <p className="text-center text-lg text-gray-500">
        Aramızdan ayrıldığınız için üzgünüz{" "}
        <span role="img" aria-label="üzgün">
          😔
        </span>
      </p>
      <Link to="/" className="text-purple-600 hover:text-purple-800">
        Giriş sayfasına dön
      </Link>
    </main>
  );
}
