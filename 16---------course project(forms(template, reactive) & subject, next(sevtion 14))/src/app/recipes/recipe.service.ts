import { Injectable } from "@angular/core";
import {Subject} from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService
{
    recipesChanged = new Subject<Recipe []>(); 
    // we used Subject because we use slice() in getRecipes >> 
    //so we are not returning the original array ... 
    //you can easily delete this event and return the original array 
    //and delete the .next in the addRecipe and delete the subscribe in the recipe-list component

    constructor(private shoppingListService: ShoppingListService){}
    
    recipes: Recipe[] = [
        new Recipe(
            "A test Recipe", 
            "This is simply a test", 
            "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
            [
                new Ingredient("Meat", 1),
                new Ingredient("French Fries", 20),
            ]
        ),
        new Recipe(
            "Another test Recipe", 
            "This is simply another test", 
            "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
            [
                new Ingredient("Buns", 2),
                new Ingredient("Meat", 3),
            ]
        )
    ]

    getRecipes()
    {
        return this.recipes.slice();
    }

    getRecipe(index: number)
    {
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[])
    {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe)
    {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe)
    {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number)
    {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
    }
}