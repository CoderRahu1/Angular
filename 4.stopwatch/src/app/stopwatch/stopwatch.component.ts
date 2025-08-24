// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-stopwatch',
//   imports: [CommonModule],
//   templateUrl: './stopwatch.component.html',
//   styleUrl: './stopwatch.component.scss'
// })
// export class StopwatchComponent {
//   elapsedTime = 0;
//   isrunning = false;
//   intervalref: any;

//   startStopReset() {
//     this.isrunning ? this.stop() : this.start();
//   }

//   start() {

//       this.isrunning = true;
//       const startTime = Date.now() - this.elapsedTime;
//       this.intervalref = setInterval(() => {
//         this.elapsedTime +=0.1;
//       }, 100);
//       console.log(this.elapsedTime);

//   }
//   stop() {
//     if (this.isrunning) {
//       this.isrunning = false;
//       clearInterval(this.intervalref);
//     }
//   }
//   reset() {
//     this.stop();
//     this.elapsedTime = 0;
//     console.log(this.elapsedTime);

//   }



// }

// advanced version with date pipe
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-stopwatch',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './stopwatch.component.html',
//   styleUrl: './stopwatch.component.scss'
// })
// export class StopwatchComponent {
//   elapsedTime = 0;          // elapsed time in ms
//   isrunning = false;
//   intervalref: any;

//   // getter to convert elapsedTime (ms) into Date for Angular date pipe
//   get time(): Date {
//     return new Date(this.elapsedTime);
//   }

//   start() {
//     if (!this.isrunning) {
//       this.isrunning = true;
//       const startTime = Date.now() - this.elapsedTime;

//       this.intervalref = setInterval(() => {
//         this.elapsedTime = Date.now() - startTime;
//       }, 50);   // refresh every 50ms
//     }
//   }

//   stop() {
//     if (this.isrunning) {
//       this.isrunning = false;
//       clearInterval(this.intervalref);
//     }
//   }

//   reset() {
//     this.stop();
//     this.elapsedTime = 0;
//   }
// }


// more advanced version with lap functionality
import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.scss'
})
export class StopwatchComponent {
  totalTime = 0;        // total countdown time in ms
  remainingTime = 0;    // remaining time in ms
  isrunning = false;
  intervalref: any;

  minutesInput: number = 0;
  secondsInput: number = 0;

  setTimer() {
    this.totalTime = (this.minutesInput * 60 + this.secondsInput) * 1000;
    this.remainingTime = this.totalTime;
  }

  start() {
    if (!this.isrunning && this.remainingTime > 0) {
      this.isrunning = true;
      const startTime = Date.now();

      this.intervalref = setInterval(() => {
        const elapsed = Date.now() - startTime;
        this.remainingTime = this.totalTime - elapsed;

        if (this.remainingTime <= 0) {
          this.remainingTime = 0;
          this.stop();
          alert('⏰ Time’s up!');
        }
      }, 50);
    }
  }

  stop() {
    if (this.isrunning) {
      this.isrunning = false;
      clearInterval(this.intervalref);
      this.totalTime = this.remainingTime; // allow resume
    }
  }

  reset() {
    this.stop();
    this.remainingTime = this.totalTime;
  }

  // ✅ Custom formatter to avoid "30 min offset" issue
  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return `${this.pad(minutes)}:${this.pad(seconds)}:${milliseconds
      .toString()
      .padStart(3, '0')}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
