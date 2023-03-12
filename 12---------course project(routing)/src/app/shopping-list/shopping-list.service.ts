import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService
{
    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 15),
        new Ingredient("Bananas", 10)
    ];

    getIngredients()
    {
        return this.ingredients;
    }

    addIngredient(ingredient: Ingredient)
    {
        this.ingredients.push(ingredient)
    }

    addIngredients(ingredients: Ingredient[])
    {
        this.ingredients.push(...ingredients);
    }
}