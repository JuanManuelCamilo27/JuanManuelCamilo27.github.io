import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameService } from '../../services/game.service';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
})
export class GameOverComponent {
  constructor(
    public gameService: GameService,
    public imageService: ImageLoaderService
  ) {}
}
