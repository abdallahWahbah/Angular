import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, 
              private route: ActivatedRoute,
              private router: Router){};

  onAddToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  ngOnInit()
  {
    // const id = this.route.snapshot.params["id"];

    // while we are in recipes path >>> we show all recipes and details next to it >> we can click on any recipe to present
    // so we will use the subscribe so that when the url changes, the data changes
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"]
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }

  onEditRecipe()
  {
    // this.router.navigate(['/recipes', 'new']) // both works fine
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe()
  {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}