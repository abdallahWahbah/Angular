import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";


import { AuthService } from './auth/auth/auth.service';
import * as fromAppReducer from "./store/app.reducer";
import * as AuthActions from './auth/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService,
            private store: Store<fromAppReducer.AppState>){}
  
  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin())
  }
}
