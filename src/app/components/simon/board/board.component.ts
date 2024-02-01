import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../button/button.component';

import { GameService } from '../services/game.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  count: number = 0;

  colors: any = {
    red: false,
    yellow: false,
    green: false,
    blue: false,
  };

  soundPaths: { [key: string]: string } = {
    red: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
    yellow: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
    green: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
    blue: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
  };

  sleep = async (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  gameStarted: boolean = false;

  showingPattern: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.state.subscribe((state) => {
      this.count = state.count;
      this.teasePlayer(state.simon);
    });
  }

  startGame() {
    this.gameService.generateSimon();
    this.gameStarted = true;
  }

  restartGame() {
    this.gameService.restartSimon();
  }

  async playerGuess(e: string) {
    await this.sleep(600);
    this.gameService.playerGuess(e);
  }

  async teasePlayer(simon: string[]) {
    this.showingPattern = true;
    for (let i = 0; i < simon.length; i++) {
      this.colors[simon[i]] = true;
      this.playSound(simon[i]);
      await this.sleep(600);
      this.colors[simon[i]] = false;
      await this.sleep(400);
    }
    this.showingPattern = false;
  }

  playSound(color: string) {
    const audio = new Audio(this.soundPaths[color]);
    audio.play();
  }
}
