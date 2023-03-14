import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

// we made this resolver because if yu chose a recipe and refreshed the page, you will get an error
// we also added a resolve property to the app.routing.module file
// and we subscribed the getAllRecipesService() in the header 

// the resolver is a code that runs before the a route is loaded to ensure that certain data the route depends on is there
@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]>
{
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0)
        {
            return this.dataStorageService.getAllRecipesService();
        }
        else return recipes;
    }
}