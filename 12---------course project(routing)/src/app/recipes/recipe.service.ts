import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService
{
    constructor(private shoppingListService: ShoppingListService){}
    recipeSelected = new EventEmitter<Recipe>()
    recipes: Recipe[] = [
        new Recipe(
            "A test Recipe", 
            "This is simply a test", 
            "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
            [
                new Ingredient("Meat", 1),
                new Ingredient("French Fries", 20),
            ]),
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
}