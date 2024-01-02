import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameService } from '../../game.service';
import { CellComponent } from '../../cell/cell/cell.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  constructor(public gameService: GameService) {
    gameService.newGame();
  }

  getBoard() {
    return {
      'grid-template-columns': `repeat(${this.gameService.gridWidth}, ${this.gameService.cellWidth}px)`,
      'grid-template-rows': `repeat(${this.gameService.gridHeight}, ${this.gameService.cellHeight}px)`,
    };
  }
}
