import userAdapter from "../adapters/auth.adapter";
import authProvider from "@/providers/auth.provider";

export async function login(data) {
    return await authProvider.login(data);
}

export async function register(data) {
    return await authProvider.register(data);
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
    return await authProvider.getMessages(userId);
}

export async function getUsers() {
    return await authProvider.getUsers();
}

export async function getMessageData(currentId, targetId) {
    return await authProvider.getMessageData(
        currentId,
        targetId
    );
}

export async function updateDetails(email, formData) {
    return await authProvider.updateDetails(
        email,
        formData
    );
}

export async function getDetails(email) {
    return await authProvider.getDetails(email);
}