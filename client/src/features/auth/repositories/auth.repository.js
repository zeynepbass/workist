import userAdapter from "../adapters/auth.adapter";
import authProvider from "@/providers/auth.provider";

export async function login(data) {
  const response = await authProvider.login(data);
  
    return response.data;
}
export async function portfolyoCreate(data) {
  const response =
      await authProvider.portfolyoCreate(data);

  return response.data;
}
export async function register(data) {
  const response = await authProvider.register(data);
  
  return response.data;

}

export async function account(email) {
    const response = await authProvider.account(email);
    return response.map(userAdapter);
}

export async function details(email) {
    const response = await authProvider.details(email);
    return response.map(userAdapter);
}

export async function getMessages(userId) {
  const response = await authProvider.getMessages(userId);
  
  return response.data;
}

export async function getUsers(data) {

    const response = await authProvider.getUsers(data);
  
    return response.data;
}

export async function getMessageData(currentId, targetId) {

    const response = await authProvider.getMessageData(currentId,
      targetId);
  
    return response.data;
}

export async function updateDetails(email, formData) {

  const response = await authProvider.updateDetails(
    email,
    formData
);
  return response.data;

}

export async function getDetails(email) {
  const response = await authProvider.getDetails(
    email
);
return response.data;
}