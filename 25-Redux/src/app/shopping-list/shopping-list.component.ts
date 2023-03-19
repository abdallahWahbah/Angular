import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {Store} from "@ngrx/store";

import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private ingredientchangeSubscription: Subscription;

  constructor( 
              // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
              private store: Store<fromAppReducer.AppState>
              ){}

  ngOnInit()
  {
    // select gives you a slice of your state
    this.ingredients = this.store.select("shoppingList")
    this.store.select("shoppingList").subscribe(x => console.log(x))

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientchangeSubscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => this.ingredients = ingredients
    // )
  }

  ngOnDestroy(): void {
      // this.ingredientchangeSubscription.unsubscribe();
  }

  onEditItem(index: number)
  {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
