import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  @ViewChild("f") form: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) =>
    {
      this.editMode = true;
      this.editedItemIndex = index;

      this.editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm)
  {
    const values = form.value;

    const newIngredient = new Ingredient(values.name, values.amount);

    if(this.editMode) this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    else this.shoppingListService.addIngredient(newIngredient)

    this.form.reset();
    this.editMode = false;
  }

  onClear()
  {
    this.form.reset();
    this.editMode = false;
  }

  onDelete()
  {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
