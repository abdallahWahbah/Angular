import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("form") signupFormValues: NgForm; // we use this approach when we need the values before submitting
  // but if we wanted the values only when submitting, pass the #form ref to onSubmit function in ts file and receive it in this file
  defaultQuestion="pet";
  answer: string; // this variable for two-way binding
  genders = ["male", "female"];
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: "",
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    // change all form values (must write all form inputs)
    // this.signupFormValues.setValue({
    //   userData: {
    //     username: suggestedName, 
    //     email: "abdo@asdkj.com"
    //   },
    //   secret: "pet",
    //   questionAnswer: "teacher",
    //   gender: "male"
    // })
    
    // change specific input value
    this.signupFormValues.form.patchValue({
      userData: {
        username: suggestedName,
        // email: "abdo@react.com"
      }
    })
  }


  // onSubmit(form: NgForm)
  // {
  //   console.log(form.value)
  // }

  onSubmit()
  {
    // console.log(this.signupFormValues.value)
    this.submitted = true;
    
    this.user.username = this.signupFormValues.value.userData.username;
    this.user.email = this.signupFormValues.value.userData.email;
    this.user.secretQuestion = this.signupFormValues.value.secret;
    this.user.answer = this.signupFormValues.value.questionAnswer;
    this.user.gender = this.signupFormValues.value.gender;

    this.signupFormValues.reset();
  }
}
