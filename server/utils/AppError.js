export class AppError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const badRequest = (message, details) =>
  new AppError(400, "BAD_REQUEST", message, details);

export const validationFailed = (details) =>
  new AppError(400, "VALIDATION_ERROR", "Gönderilen veriler geçersiz.", details);

export const unauthorized = (message = "Oturum açmanız gerekiyor.") =>
  new AppError(401, "UNAUTHORIZED", message);

export const forbidden = (message = "Bu işlem için yetkiniz yok.") =>
  new AppError(403, "FORBIDDEN", message);

export const notFound = (message = "Kayıt bulunamadı.") => new AppError(404, "NOT_FOUND", message);

export const conflict = (message) => new AppError(409, "CONFLICT", message);

export const payloadTooLarge = (message) => new AppError(413, "PAYLOAD_TOO_LARGE", message);

export const unsupportedMediaType = (message) =>
  new AppError(415, "UNSUPPORTED_MEDIA_TYPE", message);
