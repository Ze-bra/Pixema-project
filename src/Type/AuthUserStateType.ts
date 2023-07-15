import { ResponseErrorsType } from "./ResponseErrorsType"
import { TokensType } from "./TokensType"
import { UserInfoType } from "./UserInfoTypes"

export type AuthUserStateType = {
    isAuthenticated: boolean
    errors?: ResponseErrorsType
    tokens?: TokensType | undefined
    user?: UserInfoType
}