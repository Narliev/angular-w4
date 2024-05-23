import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.css'
})
export class TrafficLightComponent implements OnInit, OnChanges{
  @Input({required: true}) color: 'red' | 'yellow' | 'green' | 'default' = 'default';
  activeLightIndex: number = 0;
  prevColor : string = 'red';
  timerY : any;
  timerC : any;
  @Input({required: true}) emer: boolean = false;
  constructor() {
   }
  

  ngOnInit(): void {
    this.startCycle();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['emer'].isFirstChange()) 
      return;
    if(this.emer)
      {
        clearInterval(this.timerC);
        clearInterval(this.timerY);
        this.color = 'yellow';
        this.timerC=window.setInterval(() => {
            this.flashY();}, 1000); 
      }
      else
      {
        this.changeC();
        this.startCycle();
      }
  }

  startCycle() {
    clearInterval(this.timerC);
    clearInterval(this.timerY);
    this.timerC = window.setInterval(() => {
      if (this.activeLightIndex === 0) {
        this.changeC();
      }}, 7000); 
    window.setTimeout(() => {
      this.changeY();
      this.timerY = setInterval(() => this.changeY(), 7000);
    }, 5000);
  }
  changeC()
  {
    if(this.prevColor == 'green')
    {
      this.color = 'red';
    }
    else
      {
        this.color = 'green';
      }
  }
  changeY()
  {
    this.prevColor = this.color;
    this.color = 'yellow';
  }
  flashY()
  {
    if(this.color == 'default') this.color = 'yellow';
    else this.color = 'default';
  }
  buttonCrossing()
  {
    if(this.color != 'green') alert("Пресичането е неправилно!");
  }
   
}
