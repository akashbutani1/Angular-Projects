import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styles: [
  ]
})
export class DemoComponent implements OnInit {

  @ViewChild('stepper') private MainStepper: MatStepper;
  constructor() { }

  ngOnInit(): void {
  }

  moveForward(stepper : MatStepper) {
    if(stepper.selectedIndex === stepper.steps.length - 1){
      this.MainStepper.selectedIndex += 1;
    }
    else{
      stepper.selectedIndex += 1;
    }
    
  }

  moveBack(stepper : MatStepper) {
    if(stepper.selectedIndex == 0){
      this.MainStepper.selectedIndex -= 1;
    }
    else{
      stepper.selectedIndex -= 1;
    }
    
  }

}
