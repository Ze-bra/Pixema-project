import { ResponseErrorsType } from "./ResponseErrorsType"
import { UserRegistrtionType } from "./UserInfoTypes"

export type RegisterActionType = {
    type: string
    payload: UserRegistrtionType | ResponseErrorsType
}