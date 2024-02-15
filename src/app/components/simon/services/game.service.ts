import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  simon: string[] = [];
  player: string[] = [];

  count: number = 2;
  colors: string[] = ['blue', 'green', 'red', 'yellow'];

  state = new Subject<any>();

  sleep = async (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  constructor() {}

  private randomColor(): string {
    const maxIndex = this.colors.length;
    return this.colors[Math.floor(Math.random() * maxIndex)];
  }

  generateSimon() {
    this.count = 2;
    this.simon = [];
    this.player = [];
    for (let i = 0; i < this.count; i++) {
      this.appendSimon();
    }
    this.setState();
  }

  appendSimon(): void {
    this.simon.push(this.randomColor());
  }

  restartSimon(): void {
    this.generateSimon();
  }

  async playerGuess(val: string) {
    this.player.push(val);
    if (!this.compareSimon()) {
      await this.sleep(1000);
      this.restartSimon();
    }
  }

  compareSimon(): boolean {
    for (let i = 0; i < this.player.length; i++) {
      if (this.player[i] !== this.simon[i]) {
        const audio = new Audio(
          '../../../../assets/simonSound/wrong_sound_effect.mp3'
        );
        audio.play();
        return false;
      }
    }
    if (this.player.length === this.simon.length) {
      this.updateGame();
    }
    return true;
  }

  updateGame() {
    this.appendSimon();
    this.count++;
    this.player = [];

    this.setState();
  }

  setState() {
    this.state.next({
      player: this.player,
      simon: this.simon,
      count: this.count,
    });
  }
}
