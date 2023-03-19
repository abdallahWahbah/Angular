import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";

import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';
import * as fromAppReducer from '../../store/app.reducer';

@Injectable()
export class RecipeEffects
{
    fetchRecipes = createEffect(()=>
    {
        return this.actions$.pipe(
            ofType(RecipesActions.FETCHRECIPES),        
            switchMap(() =>
            {
                return this.http
                .get<Recipe []>("https://ng-course-recipe-eb7a0-default-rtdb.firebaseio.com/recipe.json")
            }),
            map(recipes => { // map here is a rxjs operator
                return recipes.map(recipe =>  // map here is an array method
                {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }),
            map(recipes => {
                return new RecipesActions.SetRecipes(recipes)
            })
        )
    })

    storeRecipes = createEffect(()=>
    {
        return this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select("recipes")),
        switchMap(([actionData, recipesState]) =>
        {
            return this.http
            .put("https://ng-course-recipe-eb7a0-default-rtdb.firebaseio.com/recipe.json", recipesState.recipes)
        }))
    }, {dispatch: false})
    constructor(private actions$: Actions, 
                private http: HttpClient, 
                private store: Store<fromAppReducer.AppState>){}
}