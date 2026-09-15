import * as authApi from "../features/auth/api/auth.api";

export default function authProvider() {
  return {
    login: authApi.login,
    register: authApi.register,
    account: authApi.account,
    details: authApi.details,
    getMessages: authApi.getMessages,
    getUsers: authApi.getUsers,
    getMessageData: authApi.getMessageData,
    updateDetails: authApi.updateDetails,
    getDetails: authApi.getDetails,
  };
}
