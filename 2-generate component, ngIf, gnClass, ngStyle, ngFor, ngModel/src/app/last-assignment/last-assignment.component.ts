import { Component } from '@angular/core';

@Component({
  selector: 'app-last-assignment',
  templateUrl: './last-assignment.component.html',
  styleUrls: ['./last-assignment.component.css']
})
export class LastAssignmentComponent {
  showSecret = false;
  logItems = [];

  onToggleDetails()
  {
    this.showSecret = !this.showSecret;
    this.logItems.push(this.logItems.length + 1);
  }
}
