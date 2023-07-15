import { RegisterActionType } from "../../Type/RegisterActionType";
import { RegisterUserStateType } from "../../Type/RegisterUserStateType";
import { ResponseErrorsType } from "../../Type/ResponseErrorsType";
import { UserRegistrtionType } from "../../Type/UserInfoTypes";
import { RegistrationActionName } from "./actions";

const initValue: RegisterUserStateType = {
    isRegister: false,
}

export const RegistrationReducer = (
    state: RegisterUserStateType = initValue,
    action: RegisterActionType
): RegisterUserStateType => {
    switch (action.type) {
        case RegistrationActionName.REGISTRATION_SUCCESS:
            return {
                isRegister: true,
                user: action.payload as UserRegistrtionType
            }
        case RegistrationActionName.REGISTRATION_FAIL:
            return {
                isRegister: false,
                errors: action.payload as (ResponseErrorsType)
            }
        default:
            return state
    }
}