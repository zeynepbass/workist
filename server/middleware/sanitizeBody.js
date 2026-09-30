function stripOperatorKeys(value) {
  if (Array.isArray(value)) {
    return value.map(stripOperatorKeys);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !key.startsWith("$") && !key.includes("."))
        .map(([key, nested]) => [key, stripOperatorKeys(nested)]),
    );
  }

  return value;
}

export default function sanitizeBody(req, res, next) {
  if (req.body && typeof req.body === "object") {
    req.body = stripOperatorKeys(req.body);
  }

  next();
}
