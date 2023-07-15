import { AuthActionType } from '../../Type/AuthActionType';
import { AuthUserStateType } from '../../Type/AuthUserStateType';
import { ResponseErrorsType } from '../../Type/ResponseErrorsType';
import { TokensType } from '../../Type/TokensType';
import { UserInfoType } from '../../Type/UserInfoTypes';
import { AuthActionName } from './actions';

const initValue: AuthUserStateType = {
    isAuthenticated: false,
}

export const AuthReducer = (state: AuthUserStateType = initValue, action: AuthActionType): AuthUserStateType => {
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
        case AuthActionName.AUTH_SUCCESS:
            return {
                isAuthenticated: true,
                tokens: action.payload as TokensType
            }
        case AuthActionName.AUTH_FAIL:
            return {
                isAuthenticated: false,
                errors: action.payload as (ResponseErrorsType)
            }
        case AuthActionName.LOGOUT:
            return {
                isAuthenticated: false
            }
        case AuthActionName.SET_USER_INFO:
            return {
                ...state,
                user: action.payload as (UserInfoType)
            }
        default:
            return state
    }
}