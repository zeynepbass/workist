import { toPrivateUser, toPublicUser } from "../serializers/index.js";
import * as userService from "../services/user.service.js";
import { validationFailed } from "../utils/AppError.js";

export async function getMe(req, res) {
  res.json({ data: toPrivateUser(await userService.getUser(req.user.id)) });
}

export async function updateMe(req, res) {
  const user = await userService.updateProfile(req.user.id, req.validated.body);
  res.json({ data: toPrivateUser(user) });
}

export async function updateMyAvatar(req, res) {
  if (!req.file) {
    throw validationFailed([{ path: "avatar", message: "Görsel zorunludur." }]);
  }

  const user = await userService.updateAvatar(req.user.id, req.file, { log: req.log });
  res.json({ data: toPrivateUser(user) });
}

export async function changeMyPassword(req, res) {
  await userService.changePassword(req.user.id, req.validated.body);
  res.status(204).end();
}

export async function deleteMe(req, res) {
  await userService.deleteAccount(req.user.id, req.validated.body, { log: req.log });
  res.status(204).end();
}

export async function getUser(req, res) {
  res.json({ data: toPublicUser(await userService.getUser(req.validated.params.id)) });
}
