import {HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http";

// intercept runs its code right before the request leaves our application
// next in an object with important method that will allow us to let the request continue its journey

export class AuthInterceptorService implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        console.log("Request is on its way")
        console.log(req.url)
        // return next.handle(req);
        const modifiedRequest = req.clone({
            headers: req.headers.append("interceptor", "helloooo")
        });
        return next.handle(modifiedRequest);
    }
}


// we use interceptors when we need to do something before making the request (all requests)
// most used to make authentication


// to use this interceptor >>>> we only add it in the providers in app.module.ts