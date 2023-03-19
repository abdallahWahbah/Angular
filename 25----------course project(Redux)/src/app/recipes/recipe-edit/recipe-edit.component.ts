import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute,Params, Router} from "@angular/router";
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {map, Subscription} from "rxjs";

// import { RecipeService } from '../recipe.service';
import * as fromAppReducer from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy{

  id: number;
  editMode = false; // this component is called in 2 cases (creating new recipe or editing an existing recipe)
  recipeForm: FormGroup;
  recipeSub: Subscription

  constructor(private route: ActivatedRoute,
              // private recipeService: RecipeService,
              private router: Router,
              private store: Store<fromAppReducer.AppState>){};

  ngOnInit()
  {
    this.route.params.subscribe(
      (params: Params) =>
      {
        this.id = +params["id"];
        this.editMode = params["id"] != null; // if it has id (edit recipe /recipes/id/edit) else (new recipe /recipes/new) (check out the app.router.module.ts)
        console.log(this.editMode);

        this.initForm();
      }
    )
  }

  onSubmit()
  {
    // console.log(this.recipeForm.value)
    // const newRecipe = new Recipe(
    //   this.recipeForm.value('name'),
    //   this.recipeForm.value('description'),
    //   this.recipeForm.value('imagePath'),
    //   this.recipeForm.value('ingredients'),
    // )
    if(this.editMode)
    {
      // this.recipeService.updateRecipe(this.id, newRecipe);
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value)
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, newRecipe: this.recipeForm.value}))
    }
    else
    {
      // this.recipeService.addRecipe(newRecipe);
      // this.recipeService.addRecipe(this.recipeForm.value)
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value))

    }

    this.onCancel();
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    )
  }

  onDeleteIngredient(index: number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  deleteAllIngredients() // this method is not user >>> for learning purposes only
  {
    /**
     * 
     * 
      As of Angular 8+, there's a new way of clearing all items in a FormArray.
      (<FormArray>this.recipeForm.get('ingredients')).clear();
      The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.

      It's like manually creating a loop and calling removeAt() for every item.
     */
      (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onCancel()
  {
    // route to one level up >>> prev: recipe/0/edit >> new: recipe/0
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  initForm()
  {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode)
    {
      // let recipe = this.recipeService.getRecipe(this.id);

      this.recipeSub = this.store.select("recipes")
      .pipe(map(recipesState => {
        return recipesState.recipes.find((item, index) => index === this.id)
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
  
        if(recipe["ingredients"])
        {
          for(let ingredient of recipe.ingredients)
          {
            recipeIngredients.push(new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            }))
          }
        }
      })

    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    })
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy(): void {
    if(this.recipeSub)
    {
      this.recipeSub.unsubscribe();
    }
  }
}
