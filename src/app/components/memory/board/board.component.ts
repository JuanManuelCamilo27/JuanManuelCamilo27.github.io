import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultMessageComponent } from '../components/result-message/result-message.component';
import { GameOverComponent } from '../components/game-over/game-over.component';
import { CardComponent } from '../card/card.component';
import { Card } from '../card.model';

import { GameService } from '../services/game.service';
import { ImageLoaderService } from '../services/image-loader.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ResultMessageComponent,
    GameOverComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  cards: Card[] = [];

  flippedCards: Card[] = [];

  gameWon: boolean = false;
  gameLost: boolean = true;

  moves: number = 0;
  misses: number = 0;
  score: number = 0;

  infinityModeGame: boolean = false;
  cardArr: number[] = [];

  constructor(
    public imageLoaderService: ImageLoaderService,
    public gameService: GameService
  ) {}

  ngOnInit() {
    this.loadImages();
    this.gameService.restartTimer();
  }

  loadImages() {
    this.imageLoaderService
      .getImagePaths()
      .pipe(
        tap((images) => {
          const shuffledImagePaths = this.gameService.shuffleArray([...images]);

          this.cards = shuffledImagePaths.map((image) => ({
            id: image.id,
            imageSrc: image.path,
            isMatched: false,
            isFlipped: false,
            disableClick: false,
            attempts: 0,
            wasClicked: false,
          }));
        }),
        catchError((error) => {
          console.error('Error loading image paths', error);
          throw error;
        })
      )
      .subscribe();
  }

  handleCardClick(card: Card) {
    this.gameService.startTimer();

    if (card) {
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.moves++;
        this.disableAllCards();
        this.checkForMatch();
      }
    }
  }

  checkForMatch() {
    const [firstCard, secondCard] = this.flippedCards;

    if (firstCard.id === secondCard.id) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;

      this.score++;
    } else {
      this.misses++;
    }

    setTimeout(() => {
      this.cards.forEach((card) => {
        if (!card.isMatched) {
          card.isFlipped = false;
          card.disableClick = false;
        }
      });

      this.flippedCards = [];

      this.gameWon = this.cards.every((card) => card.isMatched);
      if (this.gameWon) {
        this.gameService.stopTimer();
      }
    }, 1000);
  }

  resetGame() {
    this.gameWon = false;
    this.gameLost = false;
    this.loadImages();
    this.gameService.restartTimer();
    this.score = 0;
    this.moves = 0;
    this.misses = 0;
    this.flippedCards = [];
  }

  disableAllCards() {
    this.cards.forEach((card) => {
      card.disableClick = true;
    });
  }

  normalMode() {
    this.resetGame();
    this.infinityModeGame = false;
  }

  infinityMode() {
    this.resetGame();
    this.infinityModeGame = true;
    this.cardArr = [];
  }

  handleInfinityCardClick(card: Card) {
    this.gameService.startTimer();

    if (card) {
      card.wasClicked = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.moves++;
        this.disableAllCards();
        this.infinityCheckForMatch();
      }
    }
  }

  infinityCheckForMatch() {
    const [firstCard, secondCard] = this.flippedCards;

    if (firstCard.id === secondCard.id) {
      this.handleMatchingCards(firstCard, secondCard);
    } else {
      this.handleMismatchedCards(firstCard, secondCard);
    }

    this.resetCardsAfterDelay();
  }

  handleMatchingCards(firstCard: Card, secondCard: Card) {
    this.score++;
    firstCard.attempts = 0;
    secondCard.attempts = 0;
    firstCard.wasClicked = false;
    secondCard.wasClicked = false;

    setTimeout(() => {
      this.gameService.shuffleInfCards(this.cards);
    }, 1000);
  }

  handleMismatchedCards(firstCard: Card, secondCard: Card) {
    if (
      firstCard.attempts === 1 ||
      secondCard.attempts === 1 ||
      this.cardArr.includes(firstCard.id)
    ) {
      this.handleGameLoss();
    } else {
      this.handleAttemptsIncrementAndRecord(firstCard, secondCard);
    }
  }

  handleGameLoss() {
    this.misses++;
    this.gameLost = true;

    setTimeout(() => {
      this.infinityMode();
    }, 1200);
  }

  handleAttemptsIncrementAndRecord(firstCard: Card, secondCard: Card) {
    firstCard.attempts++;
    secondCard.attempts++;
    this.cardArr.push(firstCard.id, secondCard.id);
  }

  resetCardsAfterDelay() {
    setTimeout(() => {
      this.resetAllCards();
    }, 1000);
  }

  resetAllCards() {
    this.cards.forEach((card) => {
      card.isFlipped = false;
      card.disableClick = false;
    });

    this.flippedCards = [];
  }
}
