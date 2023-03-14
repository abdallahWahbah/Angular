import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loadingSpinner/loading-spinner.component";

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule
{
    
}