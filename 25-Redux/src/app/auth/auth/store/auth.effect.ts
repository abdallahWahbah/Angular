import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, mergeMap, Observable, of, switchMap, takeUntil, tap } from "rxjs";

import { LOGIN_START } from "./auth.actions";
import * as AuthActions from './auth.actions';
import { Router } from "@angular/router";
import { User } from "../user.module";
import { AuthService } from "../auth.service";

interface AuthResponseDataInterface{ // the type of response
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered? : boolean
}

@Injectable()
export class AuthEffects
{
    authLogin$ = createEffect(() =>
    {
        // (ofType): only continue this observable chain if the action we are reacting to is of type LOGIN_START, 
        // all other actions will not trigger here
        // we can call pipe cause actions is an observable

        return this.actions$.pipe( // returns observable
            ofType(LOGIN_START),
            // switchMap allows us to create an observable from another observable's data
            switchMap((authData: AuthActions.LoginStart) => // we have to specify the type
            {
                return this.http
                .post<AuthResponseDataInterface>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcMQIWpkv5kCabYAJynn0gpsTeWq2tAxw", {
                    email: authData.payload.email, 
                    password: authData.payload.password,
                    returnSecureToken: true // required by firebase, should always be true
                })
                .pipe(
                    tap((resData) =>{
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData =>// if the http succedded
                    {
                        
                        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
                        localStorage.setItem("userData", JSON.stringify(user))
                        // of is a utility function for creating a new observable
                        return new AuthActions.AuthenticateSuccess({ // we didn't use of() (see the error below) here cause map itself returns an observable, so if we used of() we returns multitple observables 
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate,
                            redirect: true
                        })
                    }), 
                    catchError(errorResponse =>// if the http failed
                    {
                        let errorMessage = "An Unknown error occured"

                        if(!errorResponse.error || !errorResponse.error.error)
                        {
                            return of(new AuthActions.AuthenticateFailure(errorMessage));
                        }
                        switch(errorResponse?.error?.error?.message)
                        {
                            case "EMAIL_NOT_FOUND":
                            {
                                errorMessage = "Email not found or the user may have been deleted";
                                break;
                            }
                            case "INVALID_PASSWORD":
                            {
                                errorMessage = "The password you entered is wrong";
                                break;
                            }
                            case "USER_DISABLED":
                            {
                                errorMessage = "The user account has been disabled by an administrator";
                                break;
                            }
                            default:{
                                errorMessage = "An Unknown error occured";
                                break;
                            }
                        }
                        return of(new AuthActions.AuthenticateFailure(errorMessage));
                    })
                )
            })
        )
    })

    authSignup = createEffect(()=>
    {
        return this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap((authData: AuthActions.SignupStart) =>
            {
                return this.http
                .post<AuthResponseDataInterface>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcMQIWpkv5kCabYAJynn0gpsTeWq2tAxw", 
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true // required by firebase, should always be true
                })
                .pipe(
                    tap((resData) =>{
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData =>
                    {
                        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
                        localStorage.setItem("userData", JSON.stringify(user))
                        // of is a utility function for creating a new observable
                        return new AuthActions.AuthenticateSuccess({ // we didn't use of() (see the error below) here cause map itself returns an observable, so if we used of() we returns multitple observables 
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate,
                            redirect: true
                        })
                    }),catchError(errorResponse =>
                    {
                        let errorMessage = "An Unknown error occured"
                        if(!errorResponse.error || !errorResponse.error.error)
                        {
                            return of(new AuthActions.AuthenticateFailure(errorMessage));
                        }
                        errorMessage = errorResponse?.error?.error?.message === "EMAIL_EXISTS" ? "This email already exists" : "An Unknown error occured"
                        return of(new AuthActions.AuthenticateFailure(errorMessage));
                    })
                )
            })
        )
    })

    authRedirect = createEffect(()=>
    {
        return this.actions$.pipe(
            ofType(AuthActions.AUTHENTICATE_SUCCESS),
            tap((authSuccessAction: AuthActions.AuthenticateSuccess) =>
            {
                if(authSuccessAction.payload.redirect)
                {
                    this.router.navigate(['/'])
                }
            })
        )
    }, {dispatch: false})

    authLogout = createEffect(()=>
    {
        return this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(()=>
            {
                this.authService.cleatLogoutTimer();
                localStorage.removeItem("userData");
                this.router.navigate(['/auth'])
            })
        )
    }, {dispatch: false})

    autoLogin = createEffect(()=>
    {
        return this.actions$.pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(()=>
            {
                const userData = JSON.parse(localStorage.getItem("userData"));
                if(!userData) return {type: "DUMMY"};
                const loadedUser = new User(userData.email, 
                                            userData.id, 
                                            userData._token, 
                                            new Date(userData._tokenExpirationDate));

                if(loadedUser.token) // the getter method
                {
                    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    // this.user.next(loadedUser);
                    return new AuthActions.AuthenticateSuccess({email: loadedUser.email,
                                                            userId: loadedUser.id,
                                                            token: loadedUser.token,
                                                            expirationDate: new Date(userData._tokenExpirationDate),
                                                            redirect: false})
                    // this.autoLogout(expirationDuration);
                }
                else return {type: "DUMMY"}
            })
        )   
    })
    
    //Actions in one big Observable that will give you access to all dispatched actions
    constructor(private actions$: Actions, 
                private http: HttpClient, 
                private router: Router,
                private authService: AuthService) {}
}