import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService
{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>(); // the index of item when you click on it to go to edit it in the edit page

    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 15),
        new Ingredient("Bananas", 10)
    ];

    getIngredients()
    {
        return this.ingredients;
    }

    getIngredient(index: number)
    {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient)
    {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[])
    {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient)
    {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number)
    {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}