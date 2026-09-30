import mongoose from "mongoose";
import multer from "multer";

import logger from "../config/logger.js";
import { AppError, notFound, payloadTooLarge, validationFailed } from "../utils/AppError.js";

function fromKnownError(error) {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof multer.MulterError) {
    return error.code === "LIMIT_FILE_SIZE"
      ? payloadTooLarge("Dosya boyutu sınırı aşıldı.")
      : validationFailed([{ path: error.field ?? "file", message: error.message }]);
  }

  if (error instanceof mongoose.Error.CastError) {
    return notFound();
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return validationFailed(
      Object.values(error.errors).map((item) => ({ path: item.path, message: item.message })),
    );
  }

  if (error?.type === "entity.too.large") {
    return payloadTooLarge("İstek gövdesi çok büyük.");
  }

  if (error?.type === "entity.parse.failed") {
    return new AppError(400, "BAD_REQUEST", "İstek gövdesi geçerli bir JSON değil.");
  }

  return null;
}

export function notFoundHandler(req, res, next) {
  next(notFound("İstenen adres bulunamadı."));
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const appError = fromKnownError(error);

  if (!appError) {
    (req.log ?? logger).error({ err: error }, "Unhandled error");
  }

  const status = appError?.status ?? 500;

  return res.status(status).json({
    error: {
      code: appError?.code ?? "INTERNAL_ERROR",
      message: appError?.message ?? "Beklenmeyen bir hata oluştu.",
      ...(appError?.details ? { details: appError.details } : {}),
      requestId: req.id,
    },
  });
}
