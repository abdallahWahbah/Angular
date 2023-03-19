import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Subscription } from 'rxjs';
import {Store} from "@ngrx/store";

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromAppReducer from "../../store/app.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  @ViewChild("f") form: NgForm;
  editMode = false;
  editedItem: Ingredient;

  constructor(
              // private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
              private store: Store<fromAppReducer.AppState>
              ){}

  ngOnInit(): void {

    // console.log(this.store.select("shoppingList")) returns the State interface >> have a look on the shopping lisr reducer
    this.subscription = this.store.select("shoppingList").subscribe(stateData =>
    {
      if(stateData.updatedIngredientIndex > -1)
      {
        console.log(stateData.updatedIngredient);
        this.editMode = true;
        this.editedItem = stateData.updatedIngredient;
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else
      {
        this.editMode = false;
      }
    })
  }

  onSubmit(form: NgForm)
  {
    const values = form.value;

    const newIngredient = new Ingredient(values.name, values.amount);

    if(this.editMode)
    {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } 
    else
    {
      // this.shoppingListService.addIngredient(newIngredient)
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } 

    this.editMode = false;
    this.form.reset();
  }

  onClear()
  {
    this.form.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editMode = false;
  }

  onDelete()
  {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
