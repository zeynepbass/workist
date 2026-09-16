import {authApi} from "../features/auth/api/auth.api";

const authProvider = {
    login: authApi.login,
    register: authApi.register,
    account: authApi.account,
    details: authApi.details,
    getMessages: authApi.getMessages,
    getUsers: authApi.getUsers,
    getMessageData: authApi.getMessageData,
    updateDetails: authApi.updateDetails,
    getDetails: authApi.getDetails,
    portfolyoCreate:authApi.portfolyoCreate
};

export default authProvider;