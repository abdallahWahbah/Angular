import { Component, ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import * as fromAppStore from "../../store/app.reducer";
import { AlertComponent } from 'src/app/alert/alert.component';
import { AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null
  storeSub: Subscription

  constructor(private authService: AuthService, 
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromAppStore.AppState>){}

  ngOnInit(): void {
    this.storeSub = this.store.select("auth").subscribe(authData => {
      // console.log(authData)
      this.isLoading = authData.loading;
      this.error = authData.authError;
      // console.log(this.error)
    }) 
  }
  onSwitchMode()
  {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm)
  {
    // console.log(form.value)
    const email = form.value.email;
    const password = form.value.password;

    // this.isLoading = true;

    if(this.isLoginMode) 
    {
      // this.authService.login(email, password)
      // .subscribe(response =>{
      //   console.log(response)
      //   this.isLoading = false;
      //   this.router.navigate(['/recipes']);
      // }, errorResponse => 
      // {
      //   // console.log(errorResponse)
      //   this.error = errorResponse?.error?.error?.message === "EMAIL_NOT_FOUND" ? "Email not found" : "An Unknown error occured"
      //   switch(errorResponse?.error?.error?.message)
      //   {
      //     case "EMAIL_NOT_FOUND":
      //     {
      //       this.error = "Email not found or the user may have been deleted";
      //       break;
      //     }
      //     case "INVALID_PASSWORD":
      //     {
      //       this.error = "The password you entered is wrong";
      //       break;
      //     }
      //     case "USER_DISABLED":
      //     {
      //       this.error = "The user account has been disabled by an administrator";
      //       break;
      //     }
      //     default:{
      //       this.error = "An Unknown error occured";
      //       break;
      //     }
      //   }
      //   // these cases are found here: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
      //   // search for Common error codes in the same page (EMAIL_NOT_FOUND, INVALID_PASSWORD, USER_DISABLED)
      //   this.isLoading = false;
      // })
      this.store.dispatch(new AuthActions.LoginStart({email, password}))
    }
    else
    {
      // this.authService.signup(email, password)
      // .subscribe(response =>{
      //   console.log(response)
      //   this.isLoading = false;
      //   this.router.navigate(['/recipes']);
      // }, errorResponse =>
      // {
      //   // console.log(errorResponse)
      //   this.error = errorResponse?.error?.error?.message === "EMAIL_EXISTS" ? "This email already exists" : "An Unknown error occured"
      //   // these cases are found here: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
      //   // search for Common error codes in the same page (EMAIL_EXISTS, OPERATION_NOT_ALLOWED, TOO_MANY_ATTEMPTS_TRY_LATER)
      //   this.isLoading = false;
      // });

      this.store.dispatch(new AuthActions.SignupStart({email, password}))
    }

    form.reset();
  }

  onHadnleError()
  {
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError())
  }

  ngOnDestroy(): void {
    if(this.storeSub)
    {
      this.storeSub.unsubscribe();
    }
  }
}
