import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss'
})
export class TicTacToeComponent {
  board : string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  winner: string | null = null;
  isDraw: boolean = false;


}
