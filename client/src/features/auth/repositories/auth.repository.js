import userAdapter from "../adapters/auth.adapter";
import { authApi } from "../api/auth.api";

export async function getCurrentUser() {
  const response = await authApi.me();

  return userAdapter(response.data);
}

export async function login(credentials) {
  const response = await authApi.login(credentials);

  return response.data;
}

export async function register(registration) {
  const response = await authApi.register(registration);

  return response.data;
}

export async function deleteAccount(email) {
  const response = await authApi.deleteAccount(email);

  return response.data;
}

export async function updateProfile(email, profile) {
  const response = await authApi.updateProfile(email, profile);

  return userAdapter(response.data);
}
