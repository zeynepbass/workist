export function FormField({ label, htmlFor, error, hint, children }) {
  const messageId = htmlFor ? `${htmlFor}-message` : undefined;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={htmlFor} className="block font-semibold text-gray-700">
          {label}
        </label>
      )}
      {children}
      {(error || hint) && (
        <p
          id={messageId}
          role={error ? "alert" : undefined}
          className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
