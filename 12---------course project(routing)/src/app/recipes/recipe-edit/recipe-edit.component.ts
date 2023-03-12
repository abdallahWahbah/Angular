import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from "@angular/router";


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id: number;
  editMode = false; // this component is called in 2 cases (creating new recipe or editing an existing recipe)

  constructor(private route: ActivatedRoute){}

  ngOnInit()
  {
    this.route.params.subscribe(
      (params: Params) =>
      {
        this.id = +params["id"];
        this.editMode = params["id"] != null; // if it has id (edit recipe /recipes/id/edit) else (new recipe /recipes/new) (check out the app.router.module.ts)
        console.log(this.editMode)
      }
    )
  }
}
