// import { HttpClient, HttpParams } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { exhaustMap, map, take, tap } from "rxjs";
// import {Store} from "@ngrx/store";
// import * as fromAppReducer from '../store/app.reducer';
// import * as RecipesActions from '../recipes/store/recipe.actions';


// import { AuthService } from "../auth/auth/auth.service";
// import { Recipe } from "../recipes/recipe.model";
// import { RecipeService } from '../recipes/recipe.service';

// @Injectable({providedIn: "root"})
// export class DataStorageService
// {
//     constructor(private http: HttpClient, 
//                 private recipeService: RecipeService,
//                 private authService: AuthService,
//                 private store: Store<fromAppReducer.AppState>){}

//     storeAllDataService()
//     {
//         // override all the data stored in the firebase under that node
//         const recipes = this.recipeService.getRecipes();

//         this.http
//         .put("https://ng-course-recipe-eb7a0-default-rtdb.firebaseio.com/recipe.json", recipes)
//         .subscribe(response => console.log(response))
//     }

//     getAllRecipesService()
//     {
//         return this.http
//         .get<Recipe []>("https://ng-course-recipe-eb7a0-default-rtdb.firebaseio.com/recipe.json")
//         .pipe(map(recipes => { // map here is a rxjs operator
//             return recipes.map(recipe =>  // map here is an array method
//             {
//                 return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
//             })
//         }),
//             tap(recipes => // works as subscribe
//             {
//                 // this.recipeService.setRecipes(recipes)
//                 this.store.dispatch(new RecipesActions.SetRecipes(recipes))
//             })
//         )
//     }
// }