import { ResponseErrorsType } from "./ResponseErrorsType"
import { TokensType } from "./TokensType"
import { UserInfoType } from "./UserInfoTypes"

export type AuthActionType = {
    type: string
    payload: TokensType | ResponseErrorsType | UserInfoType
}
