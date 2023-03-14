import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { User } from "./user.module";

interface AuthResponseDataInterface{ // the type of response
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered? : boolean
}

@Injectable({providedIn: "root"})
export class AuthService
{
    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null); // BehaviorSubject gives the subscribers immediate access to the previously emmited value
    // even if they haven't subscribed at the point of time the value was emmited
    // that means we can access to the currently active user even if we only subscribe after the user has been emmited
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){}

    signup(email: string, password: string)
    {
        return this.http
        .post<AuthResponseDataInterface>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcMQIWpkv5kCabYAJynn0gpsTeWq2tAxw", 
        {
            email,
            password,
            returnSecureToken: true // required by firebase, should always be true
        })
        .pipe(tap(resData => { // tap is an operator that allows us to perform some actions without changing the response
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }))
    }

    login(email: string, password: string)
    {
        return this.http
        .post<AuthResponseDataInterface>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcMQIWpkv5kCabYAJynn0gpsTeWq2tAxw", {
            email, 
            password,
            returnSecureToken: true // required by firebase, should always be true
        })
        .pipe(tap(resData => { // tap is an operator that allows us to perform some actions without changing the response
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }))
    }

    autoLogin()
    {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if(!userData) return;
        const loadedUser = new User(userData.email, 
                                    userData.id, 
                                    userData._token, 
                                    new Date(userData._tokenExpirationDate));

        if(loadedUser.token) // the getter method
        {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout()
    {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem("userData");

        if(this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number)
    {
        this.tokenExpirationTimer = setTimeout(()=>
        {
            this.logout();
        }, expirationDuration)
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number)
    {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const newUser = new User(email, userId, token, expirationDate);
        this.user.next(newUser);
        this.autoLogout(expiresIn * 1000);

        localStorage.setItem("userData", JSON.stringify(newUser));
    }
}