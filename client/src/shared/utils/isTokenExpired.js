function decodePayload(token) {
  const [, payload] = token.split(".");
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

  return JSON.parse(atob(base64));
}

export default function isTokenExpired(token, now = Date.now()) {
  try {
    const { exp } = decodePayload(token);
    return typeof exp !== "number" || exp * 1000 < now;
  } catch {
    return true;
  }
}
