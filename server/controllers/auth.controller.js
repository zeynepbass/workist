import env from "../config/env.js";
import { toPrivateUser } from "../serializers/index.js";
import * as authService from "../services/auth.service.js";

export const REFRESH_COOKIE = "workist_rt";
const REFRESH_COOKIE_PATH = "/api/auth";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const cookieOptions = () => ({
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: "lax",
  path: REFRESH_COOKIE_PATH,
  ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
});

function sendSession(res, session, status = 200) {
  res.cookie(REFRESH_COOKIE, session.refreshToken, {
    ...cookieOptions(),
    maxAge: env.REFRESH_TOKEN_TTL_DAYS * DAY_IN_MS,
  });

  res.status(status).json({
    data: { accessToken: session.accessToken, user: toPrivateUser(session.user) },
  });
}

export async function register(req, res) {
  const user = await authService.register(req.validated.body);
  res.status(201).json({ data: { user: toPrivateUser(user) } });
}

export async function login(req, res) {
  sendSession(res, await authService.login(req.validated.body));
}

export async function refresh(req, res) {
  try {
    sendSession(res, await authService.refresh(req.cookies[REFRESH_COOKIE], { log: req.log }));
  } catch (error) {
    res.clearCookie(REFRESH_COOKIE, cookieOptions());
    throw error;
  }
}

export async function logout(req, res) {
  await authService.logout(req.cookies[REFRESH_COOKIE]);
  res.clearCookie(REFRESH_COOKIE, cookieOptions());
  res.status(204).end();
}
