export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-700">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        </div>
        {children}
        <div className="mt-6 border-t border-gray-200 pt-6">{footer}</div>
      </div>
    </main>
  );
}
