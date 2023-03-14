import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/alert/alert.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null

  constructor(private authService: AuthService, 
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver){}

  onSwitchMode()
  {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm)
  {
    // console.log(form.value)
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if(this.isLoginMode) 
    {
      this.authService.login(email, password)
      .subscribe(response =>{
        console.log(response)
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorResponse => 
      {
        // console.log(errorResponse)
        this.error = errorResponse?.error?.error?.message === "EMAIL_NOT_FOUND" ? "Email not found" : "An Unknown error occured"
        switch(errorResponse?.error?.error?.message)
        {
          case "EMAIL_NOT_FOUND":
          {
            this.error = "Email not found or the user may have been deleted";
            break;
          }
          case "INVALID_PASSWORD":
          {
            this.error = "The password you entered is wrong";
            break;
          }
          case "USER_DISABLED":
          {
            this.error = "The user account has been disabled by an administrator";
            break;
          }
          default:{
            this.error = "An Unknown error occured";
            break;
          }
        }
        // these cases are found here: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
        // search for Common error codes in the same page (EMAIL_NOT_FOUND, INVALID_PASSWORD, USER_DISABLED)
        this.isLoading = false;
      })
    }
    else
    {
      this.authService.signup(email, password)
      .subscribe(response =>{
        console.log(response)
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorResponse =>
      {
        // console.log(errorResponse)
        this.error = errorResponse?.error?.error?.message === "EMAIL_EXISTS" ? "This email already exists" : "An Unknown error occured"
        // these cases are found here: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        // search for Common error codes in the same page (EMAIL_EXISTS, OPERATION_NOT_ALLOWED, TOO_MANY_ATTEMPTS_TRY_LATER)
        this.isLoading = false;
      });
    }

    form.reset();
  }

  onHadnleError()
  {
    this.error = null;
  }
}
