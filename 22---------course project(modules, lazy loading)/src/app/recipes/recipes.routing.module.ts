import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";


const routes: Routes = [
    {path: "", 
        component: RecipesComponent, 
        canActivate: [AuthGuard],
        children: 
        [
            {path: "", component: RecipeStartComponent},
            {path: "new", component: RecipeEditComponent}, // make sure to put this line before the next one cause if it's after if, if you go to /recipes/new >>> it will comcider new as a dynamic id (priorities)
            {path: ":id", component: RecipeDetailComponent, resolve: [RecipesResolverService]},
            {path: ":id/edit", component: RecipeEditComponent, resolve: [RecipesResolverService]},
        ] 
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule
{

}