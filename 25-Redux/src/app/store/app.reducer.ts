import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/auth/store/auth.reducer';
import * as fromRecipeReucer from '../recipes/store/recipe.reducer';

export interface AppState {
    shoppingList: fromShoppingListReducer.State;
    auth: fromAuthReducer.State;
    recipes: fromRecipeReucer.State
}

export const appReducer = {
    shoppingList: fromShoppingListReducer.shoppingListReducer,
    auth: fromAuthReducer.authReducer,
    recipes: fromRecipeReucer.recipesReducer
}