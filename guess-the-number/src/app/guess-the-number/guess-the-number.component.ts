import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-the-number',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-the-number.component.html',
  styleUrls: ['./guess-the-number.component.scss']
})
export class GuessTheNumberComponent {
  private static readonly MAX_NUMBER = 100;
  private static readonly MAX_ATTEMPTS = 10;

  maxNumber = GuessTheNumberComponent.MAX_NUMBER;

  secretNumber = this.generateRandomNumber();
  attemptsLeft = GuessTheNumberComponent.MAX_ATTEMPTS;
  guessedNumber: number | null = null;
  feedbackMessage = '';
  gameOver = false;

  private generateRandomNumber(): number {
    // Random integer between 1 and MAX_NUMBER (inclusive)
    return Math.floor(Math.random() * GuessTheNumberComponent.MAX_NUMBER) + 1;
  }

  isValidGuess(guess: number | null | undefined): boolean {
    return typeof guess === 'number'
      && Number.isFinite(guess)
      && guess >= 1
      && guess <= GuessTheNumberComponent.MAX_NUMBER;
  }

  onGuessChange(val: any): void {
    const n = Number(val);
    this.guessedNumber = Number.isFinite(n) ? n : null;
  }

  submitGuess(): void {
    if (this.gameOver) return;

    if (!this.isValidGuess(this.guessedNumber)) {
      this.feedbackMessage = `Please enter a valid number between 1 and ${GuessTheNumberComponent.MAX_NUMBER}.`;
      return;
    }

    const guess = this.guessedNumber as number;

    if (guess < this.secretNumber) {
      this.feedbackMessage = 'Too low!';
    } else if (guess > this.secretNumber) {
      this.feedbackMessage = 'Too high!';
    } else {
      this.feedbackMessage = `🎉 Correct! The number was ${this.secretNumber}.`;
      this.endGame(false); // end without overwrite message
      return;
    }

    this.attemptsLeft--;

    if (this.attemptsLeft <= 0) {
      this.endGame(true); // reveal correct number on game over
    } else {
      this.feedbackMessage += ` You have ${this.attemptsLeft} attempts left.`;
    }
  }

  resetGame(): void {
    this.secretNumber = this.generateRandomNumber();
    this.attemptsLeft = GuessTheNumberComponent.MAX_ATTEMPTS;
    this.guessedNumber = null;
    this.feedbackMessage = '';
    this.gameOver = false;
  }

  private endGame(reveal = true): void {
    this.gameOver = true;
    if (reveal) {
      this.feedbackMessage = `Game Over! The correct number was ${this.secretNumber}.`;
    }
  }
}
