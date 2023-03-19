import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {Store} from "@ngrx/store";
import {Actions,ofType} from "@ngrx/effects";
import {take, map, switchMap, of} from "rxjs";

import { Recipe } from "./recipe.model";
// import { DataStorageService } from "../shared/data-storage.service";
// import { RecipeService } from "./recipe.service";
import * as fromAppReducer from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';

// we made this resolver because if yu chose a recipe and refreshed the page, you will get an error
// we also added a resolve property to the app.routing.module file
// and we subscribed the getAllRecipesService() in the header 

// the resolver is a code that runs before the a route is loaded to ensure that certain data the route depends on is there
@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]>
{
    constructor(
                // private dataStorageService: DataStorageService, 
                // private recipeService: RecipeService,
                private store: Store<fromAppReducer.AppState>,
                private actions$: Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store.select("recipes").pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes
            }),
        // ),
        switchMap(recipes => {
            if (recipes.length === 0)
            {
                this.store.dispatch(new RecipesActions.FetchRecipes())
                return this.actions$.pipe(
                    ofType(RecipesActions.SET_RECIPES),
                    take(1)
                );
            }
            else return of(recipes)
        })
        )
    }
}