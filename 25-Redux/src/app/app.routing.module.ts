import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { AuthGuard } from "./auth/auth/auth.guard";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: "", redirectTo: "recipes", pathMatch: "full"}, // pathMath: "full" >>> only redirect if the whole path is empty
    {path: "recipes", loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule)},
    {path: "shopping-list", loadChildren: () => import('./shopping-list/shopping-list-module').then(m => m.ShoppingListModule)},
    {path: "auth", component: AuthComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRouting
{

}