import { AppThunk } from ".."
import { GetUserName, Login, RefreshTocken } from "../../Services/authServise"
import { ResponseErrorsType } from "../../Type/ResponseErrorsType"
import { TokensType } from "../../Type/TokensType"
import { UserInfoType } from "../../Type/UserInfoTypes"

export const AuthActionName = {
    AUTH_SUCCESS: "AUTH_SUCCESS",
    AUTH_FAIL: "AUTH_FAIL",
    LOGOUT: "LOGOUT",
    SET_USER_INFO: "SET_USER_INFO",
} as const

const authSuccess = (tokens: TokensType) => {
    return {
        type: AuthActionName.AUTH_SUCCESS,
        payload: tokens
    }
}

const setUserInfo = (user: UserInfoType) => {
    return {
        type: AuthActionName.SET_USER_INFO,
        payload: user
    }
}

const authFail = (errors: ResponseErrorsType | string) => {
    return {
        type: AuthActionName.AUTH_FAIL,
        payload: errors
    }
}

export const loginAction = (email: string, password: string, cb?: () => void): AppThunk => {
    return (dispatch, getState) => {
        Login(email, password)
            .then(response => {
                if (!response) {
                    return dispatch(authFail('Unknown error'))
                } else if (!response.ok) {
                    return dispatch(authFail(response.data))
                }

                dispatch(authSuccess(response.data))

                const tokens = getState().authentication.tokens;
                GetUserName(tokens?.access).then(userResponse => {
                    if (userResponse.ok) {
                        dispatch(setUserInfo(userResponse.data))
                    }
                })

                if (cb) {
                    cb()
                }
            })
    }
}

export const refreshTockenAction = (token: string, cb?: () => void): AppThunk => {
    return (dispatch) => {
        RefreshTocken(token)
            .then(response => {
                if (!response || !response.ok) {
                    return dispatch({
                        type: AuthActionName.LOGOUT
                    })
                }

                dispatch(authSuccess({
                    access: response.data,
                    refresh: token
                } as TokensType))

            })
    }
}
