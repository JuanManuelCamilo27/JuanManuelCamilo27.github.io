import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-result-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-message.component.html',
  styleUrl: './result-message.component.scss',
})
export class ResultMessageComponent {
  constructor(
    public gameService: GameService,
    public imageService: ImageLoaderService
  ) {}

  @Output() resetGame: EventEmitter<void> = new EventEmitter<void>();

  @Input() score: number;
  @Input() time: number;

  onResetGameClick() {
    this.resetGame.emit();
  }
}
