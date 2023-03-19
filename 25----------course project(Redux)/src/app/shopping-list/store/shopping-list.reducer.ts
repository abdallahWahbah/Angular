import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    updatedIngredient: Ingredient;
    updatedIngredientIndex: number;
}

// export interface AppState {
//     shoppingList: State;
// }

const initialState = {
    ingredients: [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10),
    ],
    updatedIngredient: null,
    updatedIngredientIndex: -1 
}

export const shoppingListReducer = (state = initialState, action: any) =>
{
    switch(action.type)
    {
        case ShoppingListActions.ADD_INGREDIENT: {
            // state.ingredients.push({}); 
            // never do this(state changes with ngrx always have to be immutable)(you must not edit the existing state)
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        case ShoppingListActions.ADD_INGREDIENTS: {
            return{
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        }
        case ShoppingListActions.UPDATE_INGREDIENT: {
            const ingredient = state.ingredients[state.updatedIngredientIndex];
            // ingredient.name = action.payload.name; // the same fault as above in add ingredient
            // ingredient.amount = action.payload.amount; // the same fault as above in add ingredient

            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            }

            let updatedIngredients = [...state.ingredients];
            updatedIngredients[state.updatedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                updatedIngredient: null,
                updatedIngredientIndex: -1
            }
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter((item, ingIndex) => ingIndex !== state.updatedIngredientIndex),
                updatedIngredient: null,
                updatedIngredientIndex: -1
            }
        }
        case ShoppingListActions.START_EDIT: {
            return{
                ...state,
                updatedIngredient: {...state.ingredients[action.payload]},
                updatedIngredientIndex: action.payload
            }
        }
        case ShoppingListActions.STOP_EDIT: {
            return {
                ...state,
                updatedIngredient: null,
                updatedIngredientIndex: -1
            }
        }
        default: {
            return state;
        }
    }
}