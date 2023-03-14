import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate
{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
    {
        // take the latest user value and then unsubscribe
        return this.authService.user.pipe(take(1), map(user => {
            // return !!user;
            const isAuth = !!user;
            if(isAuth) return true;
            else return this.router.createUrlTree(['/auth'])
        }), 
        // tap(isAuth => // old approach
        // {
        //     if(!isAuth) this.router.navigate(['/auth'])
        // })
        )
    }
}