import { Activation, Registration } from "../../Services/authServise"
import { AppThunk } from ".."
import { ResponseErrorsType } from "../../Type/ResponseErrorsType"
import { UserRegistrtionType } from "../../Type/UserInfoTypes"

export const RegistrationActionName = {
    REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS",
    REGISTRATION_FAIL: "REGISTRATION_FAIL"
} as const

export const registrationSuccessAction = (user: UserRegistrtionType) => {
    return {
        type: RegistrationActionName.REGISTRATION_SUCCESS,
        payload: user
    }
}

export const registrationFailAction = (errors: ResponseErrorsType | string) => {
    return {
        type: RegistrationActionName.REGISTRATION_FAIL,
        payload: errors
    }
}

export const registrationAction = (
    username: string,
    email: string,
    password: string,
    cb?: () => void,
    failedCb?: (data: any) => void
): AppThunk => {
    return (dispatch) => {
        Registration(username, email, password)
            .then(response => {
                if (!response || !response.ok) {
                    if (failedCb) {
                        failedCb(response.data);
                    }
                    return dispatch(!response.ok ? registrationFailAction(response.data) : registrationFailAction("Неизвестная ошибка"))
                }
                dispatch(registrationSuccessAction(response.data))
                if (cb) {
                    cb()
                }
            })
    }
}

export const activationAction = (uid: string, token: string, cb?: () => void): AppThunk => {
    return (dispatch) => {
        Activation(uid, token)
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    return
                }
                if (cb) {
                    cb()
                }
            })
    }
}