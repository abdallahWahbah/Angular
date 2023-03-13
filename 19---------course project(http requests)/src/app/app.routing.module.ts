import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const approutes: Routes = [
    {path: "", redirectTo: "recipes", pathMatch: "full"}, // pathMath: "full" >>> only redirect if the whole path is empty
    {path: "recipes", component: RecipesComponent, children: [
        {path: "", component: RecipeStartComponent},
        {path: "new", component: RecipeEditComponent}, // make sure to put this line before the next one cause if it's after if, if you go to /recipes/new >>> it will comcider new as a dynamic id (priorities)
        {path: ":id", component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        {path: ":id/edit", component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ] },
    {path: "shopping-list", component: ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(approutes)],
    exports: [RouterModule]
})
export class AppRouting
{

}