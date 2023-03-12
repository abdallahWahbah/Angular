import { 
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, 
  DoCheck, 
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  SimpleChanges, 
  ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // if you wanted the styles in server-element.component.css to be global and affect all the application
  // encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements 
  OnInit, 
  OnChanges, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
  {
  @Input() element: {name: string, type: string, content: string}
  // if you wanted the element to be called from outside with another name (assining alias to custom properties)
  // @Input('srvElement') element: {name: string, type: string, content: string}
  // now you can pass element by the new name only (srvElement) >>> look at the end of app.component.html comments

  constructor()
  {
    console.log("constructor called!")
  }
  ngOnChanges(changes: SimpleChanges)
  {
    console.log("ngOnChanges called!")
  }
  ngOnInit()
  {
    console.log("ngOnInit called!")
  }
  ngDoCheck()
  {
    console.log("ngDoCheck called!")
  }
  ngAfterContentInit()
  {
    console.log("ngAfterContentInit called!")
  }
  ngAfterContentChecked()
  {
    console.log("ngAfterContentChecked called!")
  }
  
  ngAfterViewInit()
  {
    console.log("ngAfterViewInit called!")
  }
  ngAfterViewChecked()
  {
    console.log("ngAfterViewChecked called!")
  }
  ngOnDestroy()
  {
    console.log("ngOnDestroy called!")
  }
  
}
