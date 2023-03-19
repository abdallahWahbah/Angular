import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations:[
    // divState is the animation name used in the html file
    trigger("divState", [
      state("normal", style({
        "background-color": "red",
        transform: "translateX(0)"
      })),
      state("highlight", style({
        "background-color": "blue",
        transform: "translateX(100px)"
      })),
      transition("normal => highlight", animate(500)),
      // transition("normal <=> highlight", animate(500)), // if you wanted to apply the same transition from each one to the other one, <=>
      transition("highlight => normal", animate(3000))
    ]),
    trigger("wildState", [
      state("normal", style({
        "background-color": "red",
        transform: "translateX(0) scale(1)"
      })),
      state("highlight", style({
        "background-color": "blue",
        transform: "translateX(100px) scale(1)"
      })),
      state("shrink", style({
        "background-color": "green",
        transform: "translateX(0) scale(.5)"
      })),
      transition("normal => highlight", animate(500)),
      transition("highlight => normal", animate(3000)),
      transition("shrink <=> *", [ //from shrink to any state and from any state to shrink
        style({ // initial state
          "background-color": "orange"
        }),
        animate(1000, style({ // after 1000ms apply this style
          borderRadius: "50px"
        })),
        animate(500) // after 500ms (from the start not after the above 1000ms finishes) apply the original style(shrink)
      ]) 
    ]),
    trigger("list1",[
      state("in", style({
        opacity: "1",
        transform: "translateX(0)"
      })),
      transition("void => *", [ // void when you have an element but wasn't added to the dom yet (non-existing(void) to any state(*))
        style({
          opacity: "0",
          transform: "translate(-100px)"
        }),
        animate(500) // after 500ms apply the original styles
      ]) ,
      transition("* => void", [
        animate(500, style({
          opacity: "0",
          transform: "translateX(100px)"
        }))
      ])
    ]),
    trigger("list2",[
      state("in", style({
        opacity: "1",
        transform: "translateX(0)"
      })),
      transition("void => *", [
        animate(1000, keyframes([
          style({
            opacity: "0",
            transform: "translate(-100px)",
            offset: 0
          }),
          style({
            opacity: ".5",
            transform: "translate(-50px)",
            offset: .3
          }),
          style({
            opacity: "1",
            transform: "translate(0)",
            offset: 1
          }),
        ]))
      ]),
      transition("* => void", [
        group([ // apply both animations at the same time
          animate(500, style({
            color: "red"
          })),
          animate(800, style({
            opacity: "0",
            transform: "translateX(100px)"
          }))
        ])
      ])
    ])
    
  ]
})
export class AppComponent {
  state="normal"
  wildState="normal"
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item: string) {
      this.list.push(item);
    }

    onDelete(item)
    {
      this.list.splice(this.list.indexOf(item), 1)
    }

    onAnimate()
    {
      this.state = this.state === "normal" ? "highlight" : "normal"
      this.wildState = this.wildState === "normal" ? "highlight" : "normal"
    }

    onShrink()
    {
      this.wildState = "shrink"
    }

    animationStarted(event)
    {
      console.log(event)
    }

    animationEnded(event)
    {
      console.log(event)
    }
}
