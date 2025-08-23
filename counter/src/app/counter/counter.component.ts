import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,                   // 👈 Mark it as standalone
  imports: [CommonModule],            // 👈 Import CommonModule for ngIf, ngFor, ngSwitch
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']   // 👈 spelling fix: styleUrls (plural)
})
export class CounterComponent {
  counter: number = 5;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  getCounterStatus() {
    if (this.counter > 0) return 'Positive';
    if (this.counter < 0) return 'Negative';
    return 'Zero';
  }
}
