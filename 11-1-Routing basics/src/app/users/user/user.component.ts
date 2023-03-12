import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"]
    }

    // if you tried to access the page where you are at with different data, it won't be reloaded >>> no need for extra loading >> better performance
    // so we need to listen to the route so that we know if it will be changed in the future

    // params in an (observable) easy way to subscribe to some event which might happen in the future
    this.route.params.subscribe((params: Params) =>
    {
      this.user.id = params["id"];
      this.user.name = params["name"];
    })
  }

}
