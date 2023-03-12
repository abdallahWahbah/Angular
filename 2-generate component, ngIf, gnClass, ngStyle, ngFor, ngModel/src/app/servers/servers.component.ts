import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  // template:`
  // <api-server></api-server>
  // <api-server></api-server>`, // not working
  
  // styleUrls: ['./servers.component.css']
  styles: [`
    p{
      color: blue
    }
  `]
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = "No server was created";
  serverName = "initial value or empty";
  userName="";
  serverCreated = false;
  servers = ["server 1", "server 1"];

  constructor()
  {
    setTimeout(()=>
    {
      this.allowNewServer = true;
    }, 2000)
  }

  onCreateServer()
  {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server: (" + this.serverName + " )was created";
  }

  onUpdateServerName(event: Event)
  {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  resetUserName()
  {
    this.userName = ""
  }
}
