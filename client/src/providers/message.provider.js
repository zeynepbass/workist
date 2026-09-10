import * as messageApi from "../features/auth/api/message.api"

export const authProvider={
login:authApi.login,
register:authApi.register,
account:authApi.account,
details:authApi.details
}