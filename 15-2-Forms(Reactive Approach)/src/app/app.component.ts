import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames=['Chris', 'Anna'];

  ngOnInit()
  {
    this.signupForm = new FormGroup({
      // FormControl >> 1st param in the initial value
      // 2nd param is the validation (can be an array)
      // 3rd param is a custom validation for async tasks
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([])
    })

    this.signupForm.valueChanges.subscribe((values) => console.log(values));

    // changing all values
    // this.signupForm.setValue({
    //   userData:{ 
    //     username: "Abdallah",
    //     email: "abdo@react.com"
    //   },
    //   gender: "male",
    //   hobbies: []
    // })

    // changing single(or multiple) value
    this.signupForm.patchValue({
      userData:{ 
        username: "Abdallah",
        email: "abdo@react.com"
      }
    })
  }

  onSubmit()
  {
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }

  onAddHobby() // form array
  {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control)
  }

  forbiddenName(control: FormControl): {[name: string]: boolean} // return >>> {"nameIsForbidden": true}
  { // we used bind(this) when calling the function cause we used "this" in the function
    if(this.forbiddenUsernames.indexOf(control.value) !== -1)
    {
      return {'nameIsForbidden': true}
    }
    else return null
  }

  forbiddenEmails(control: FormGroup): Promise<any> | Observable<any>
  {
    const promise = new Promise<any>((resolve, reject) =>
    {
      setTimeout(()=>
      {
        if(control.value === "test@test.com")
        {
          resolve({'emailIsForbidden': true})
        }
        else resolve(null)
      }, 1500)
    })
    return promise
  }
}
