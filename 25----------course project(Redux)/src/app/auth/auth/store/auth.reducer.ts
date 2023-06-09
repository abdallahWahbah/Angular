import {Action} from "@ngrx/store";
import { User } from "../user.module";
import * as AuthActions from './auth.actions';

export interface State{
    user: User,
    authError: string,
    loading: boolean
}

const initialState = {
    user: null,
    authError: null,
    loading: false
};

export const authReducer = (state: State = initialState, action: any) =>
{
    switch(action.type)
    {
        case AuthActions.AUTHENTICATE_SUCCESS: {
            const user = new User(action.payload.email, 
                                action.payload.userId, 
                                action.payload.token, 
                                action.payload.expirationDate)

            return {
                ...state,
                user,
                authError: null,
                loading: false
            }
        }
        case AuthActions.LOGOUT: {
            return {
                ...state, 
                user: null,
                authError: null
            }
        }
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START: {
            return {
                ...state,
                authError: null,
                loading: true
            }
        }
        case AuthActions.AUTHENTICATE_FAILURE: {
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        }
        case AuthActions.CLEAR_ERROR: {
            return{
                ...state,
                authError: null
            }
        }
        default: {
            return state;
        }
    }
}