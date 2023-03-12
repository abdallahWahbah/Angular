import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-practice-template-driven',
  templateUrl: './practice-template-driven.component.html',
  styleUrls: ['./practice-template-driven.component.css']
})
export class PracticeTemplateDrivenComponent implements OnInit {

  @ViewChild("form") formData: NgForm;
  options=["Basic", "Advanced", "Pro"];
  defaultSubscription = "Basic";


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit()
  {
      console.log(this.formData.value);
  }

}
