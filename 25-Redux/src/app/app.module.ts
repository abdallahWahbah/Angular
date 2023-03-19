import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from "@ngrx/store"; 
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from "@ngrx/router-store";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRouting } from './app.routing.module';
// import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { appReducer } from './store/app.reducer';
import { AuthEffects } from './auth/auth/store/auth.effect';
import { AlertComponent } from './alert/alert.component';
import { environment } from '../environment/environment';
import { RecipeEffects } from './recipes/store/recipe.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AlertComponent,
    // the "shoppingList" key name is totally up to you
    // StoreModule.forRoot({shoppingList: shoppingListReducer, auth: authReducer})
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    // RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
