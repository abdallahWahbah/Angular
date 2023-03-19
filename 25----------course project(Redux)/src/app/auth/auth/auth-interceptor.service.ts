import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, map } from "rxjs";
import {Store} from "@ngrx/store";
import { AuthService } from "./auth.service";
import * as fromAppReducer from '../../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor
{
    constructor(private authService: AuthService,
                private store: Store<fromAppReducer.AppState>){}
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        // take(1): to take one value from the observer and unsubscribe automatically after it
        // exhaustMap: when you finish the first obervable (authService.user), start the second one witch is the http request 
        return this.store.select("auth").pipe(take(1)
        ,map(authState =>
        {   
            return authState.user
        }), exhaustMap(user =>
        {
            if(!user) return next.handle(req);
            
            const modifiedRequest = req.clone({
                params: new HttpParams().set("auth", user.token)
            })
            return next.handle(modifiedRequest);
        }))
    }
}