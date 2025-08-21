import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Define properties for the profile card
  //string interpolation - {{ name }} - used to display data to app/application.html
  //property binding - [name]="name"
  //event binding - (click)="updateProfile()"
  //two-way data binding - [(ngModel)]="name"
  title = 'profile-card';
  name: string = 'John Doe';
  age: number = 0;
  description: string = 'A passionate developer learning Angular';
}



// so for string i