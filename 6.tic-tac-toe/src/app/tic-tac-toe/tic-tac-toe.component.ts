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
  currentPlayer: string = 'X';  // each player is represented by 'X' or 'O'
  winner: string | null = null;  // null means no winner yet
  isDraw: boolean = false; // to check if the game is a draw

  // adding all the functions
  
  // method to verify if cell is occupied
  private isCellOccupied(index: number): boolean {
    return this.board[index] !== '';
  } 

  //method to check gameover
  private isGameOver(): boolean {
    return this.winner !== null || this.isDraw;
  }
  
  // method to check is move Invalid
  private isMoveInvalid(index: number): boolean {
    return this.isCellOccupied(index) || this.isGameOver();
  }


  //method to switch player
  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';// toggling between players
  }

  // method to check winner
  private checkWinner(): boolean{
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows    // all possible winning combinations
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        return true;
      }
      return false;
    });
  }

  private isBoardFull(): boolean {
    return this.board.every(cell => cell !== '');  // checks if all cells are filled
  }

  // method to update game state
  private updateGameState(): void {    // method to update game state after each move
    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
      // winner is already set in checkWinner
    } else if (this.isBoardFull()) {
      this.isDraw = true;  // if board is full and no winner, it's a draw
    } else {
      this.switchPlayer(); // switch player if no winner and not a draw
    }
  }

// method to make a move
  makeMove(index: number): void {
    if (this.isMoveInvalid(index)) {
      return; // ignore invalid moves
    }
    this.board[index] = this.currentPlayer; // place the current player's mark
    this.updateGameState(); // update the game state after the move
  }

  // method to reset the game
  resetGame(): void {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
  }
}
