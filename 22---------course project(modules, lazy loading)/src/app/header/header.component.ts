import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: "app-header",
    templateUrl:"./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy
{
    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
    private userSubscription: Subscription;
    isAuthenticated = false;

    ngOnInit()
    {
        this.userSubscription = this.authService.user.subscribe(userData =>
        {   
            this.isAuthenticated = !!userData;
        })
    }
    onSaveData()
    {
        this.dataStorageService.storeAllDataService();
    }

    onFetchData()
    {
        this.dataStorageService.getAllRecipesService().subscribe();
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onLogout()
    {
        this.authService.logout();
    }
}