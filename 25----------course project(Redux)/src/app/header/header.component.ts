import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import {Store} from "@ngrx/store";

import { AuthService } from '../auth/auth/auth.service';
// import { DataStorageService } from '../shared/data-storage.service';
import * as fromAppReducer from "../store/app.reducer";
import * as AuthActions from '../auth/auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
    selector: "app-header",
    templateUrl:"./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy
{
    constructor(
                // private dataStorageService: DataStorageService, 
                private authService: AuthService,
                private store: Store<fromAppReducer.AppState>){}
    private userSubscription: Subscription;
    isAuthenticated = false;

    ngOnInit()
    {
        this.userSubscription = this.store.select("auth").pipe(map(userAuth => userAuth.user)).subscribe(userData =>
        {   
            this.isAuthenticated = !!userData;
        })
    }
    onSaveData()
    {
        // this.dataStorageService.storeAllDataService();
        this.store.dispatch(new RecipesActions.StoreRecipes())
    }

    onFetchData()
    {
        this.store.dispatch(new RecipesActions.FetchRecipes())
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onLogout()
    {
        this.store.dispatch(new AuthActions.Logout())
    }
}