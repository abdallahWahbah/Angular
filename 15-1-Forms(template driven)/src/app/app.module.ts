import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PracticeTemplateDrivenComponent } from './practice-template-driven/practice-template-driven.component';

@NgModule({
  declarations: [
    AppComponent,
    PracticeTemplateDrivenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
