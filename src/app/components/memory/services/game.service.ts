import { Injectable } from '@angular/core';

import { Card } from '../card.model';
import { BoardComponent } from '../board/board.component';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  time = 0;
  timerStarted = false;
  timeInterval: any;

  constructor() {}

  // Función para barajar un array.
  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  shuffleInfCards(cards: Card[]): void {
    const unclickedCards = cards.filter((card) => !card.wasClicked);
    this.shuffle(unclickedCards);

    let currentIndex = 0;
    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].wasClicked) {
        cards[i] = unclickedCards[currentIndex];
        currentIndex++;
      }
    }
  }
  private shuffle(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  startTimer() {
    if (this.timerStarted) return;
    this.timerStarted = true;
    this.timeInterval = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  restartTimer() {
    this.timerStarted = false;
    this.time = 0;
    this.stopTimer();
  }

  stopTimer() {
    clearInterval(this.timeInterval);
  }
}
