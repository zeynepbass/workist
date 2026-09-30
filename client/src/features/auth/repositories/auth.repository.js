import { privateUserAdapter, publicUserAdapter } from "../adapters/user.adapter";
import { authApi } from "../api/auth.api";

export async function login(credentials) {
  const { data } = await authApi.login(credentials);
  return { accessToken: data.data.accessToken, user: privateUserAdapter(data.data.user) };
}

export async function register(registration) {
  const { data } = await authApi.register(registration);
  return privateUserAdapter(data.data.user);
}

export async function logout() {
  await authApi.logout();
}

export async function getCurrentUser() {
  const { data } = await authApi.me();
  return privateUserAdapter(data.data);
}

export async function getUser(id) {
  const { data } = await authApi.getUser(id);
  return publicUserAdapter(data.data);
}

export async function updateProfile(changes) {
  const { data } = await authApi.updateProfile(changes);
  return privateUserAdapter(data.data);
}

export async function updateAvatar(file) {
  const { data } = await authApi.updateAvatar(file);
  return privateUserAdapter(data.data);
}

export async function changePassword(passwords) {
  await authApi.changePassword(passwords);
}

export async function deleteAccount(password) {
  await authApi.deleteAccount(password);
}
