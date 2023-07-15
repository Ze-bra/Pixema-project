import { ReactNode } from "react";
import { ResponseErrorsType } from "./ResponseErrorsType";
import { UserRegistrtionType } from "./UserInfoTypes";

export type RegisterUserStateType = {
    email?: ReactNode;
    isRegister: boolean
    errors?: ResponseErrorsType
    user?: UserRegistrtionType
}