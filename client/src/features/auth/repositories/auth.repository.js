import {userAdapter} from "../adapters/auth.adapter"
import authProvider from "@/providers/auth.provider"
export async function login(){
    const response=await authProvider.login("/signin")
    return response.data
}
export async function register(){
    const response=await authProvider.login("/uye-ol")
    return response.data
}
export async function account(){
    const response=await authProvider.get(`/users/${userid.result.email}`)
    return response.data.map(userAdapter)
}
export async function details(){
    const response=await authProvider.get(`/duzenle/${userid.result.email}`)
    return response.data.map(userAdapter)
}

export async function getMessages(userId) {
  const response = await apiClient.get(`/konusmalar/${userId}`);
  return response.data;
}

export async function getUsers() {
  const response = await apiClient.get("/users");
  return response.data;
}

export async function getMessageData(currentId, targetId) {
  const response = await apiClient.get(`/${currentId}/${targetId}`);
  return response.data;
}

export async function updateDetails(email, formData) {
  const response = await apiClient.put(`/duzenle/${email}`, formData);
  return response.data;
}

export async function getDetails(email) {
  const response = await apiClient.get(`/duzenle/${email}`);
  return response.data;
}

