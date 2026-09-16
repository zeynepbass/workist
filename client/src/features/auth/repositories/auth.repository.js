import userAdapter from "../adapters/auth.adapter";
import { authApi } from "../api/auth.api";

export async function getCurrentUser() {
  const response = await authApi.me();

  return userAdapter(response.data);
}

export async function login(data) {
  const response = await authApi.login(data);

  return response.data;
}

export async function register(data) {
  const response = await authApi.register(data);

  return response.data;
}

export async function account(email) {
    const response = await authApi.account(email);

    return userAdapter(response.data);
}

export async function getDetails(email) {
    const response = await authApi.getDetails(email);

    return userAdapter(response.data);
}

export async function updateDetails(email, formData) {
    const response = await authApi.updateDetails(email, formData);

    return userAdapter(response.data);
}
