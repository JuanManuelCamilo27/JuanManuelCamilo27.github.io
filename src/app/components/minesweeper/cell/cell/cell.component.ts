import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cell } from '../../cell.model';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent implements OnInit {
  @Input('index') index: number;
  @Input('cell') cell: Cell;
  flagSymbol = '';
  symbol = '';
  symbolColor = '';
  backgroundColor = '#131313';

  constructor(public gameService: GameService) {}

  ngOnInit() {
    if (this.cell.value == -1) {
      this.symbol = '💣';
    } else if (this.cell.value > 0) {
      this.symbol = this.cell.value.toString();
      switch (this.cell.value) {
        case 1:
          this.symbolColor = 'white';
          break;
        case 2:
          this.symbolColor = 'green';
          break;
        case 3:
          this.symbolColor = 'orange';
          break;
        case 4:
          this.symbolColor = 'red';
          break;
        case 5:
          this.symbolColor = 'magenta';
          break;
        case 6:
          this.symbolColor = 'darkturquoise';
          break;
        case 7:
          this.symbolColor = 'goldenrod';
          break;
        case 8:
          this.symbolColor = 'brown';
          break;
      }
    }
  }

  onClick() {
    this.gameService.startTimer();
    if (this.cell.value == -1) {
      this.symbol = '💥';
    }
    this.gameService.onCellClick(this.index);
  }

  onRightClick() {
    this.gameService.startTimer();
    this.gameService.onCellFlag(this.index);
    switch (this.cell.flag) {
      case 0:
        this.flagSymbol = '';
        break;
      case 1:
        this.flagSymbol = '🚩';
        break;
      case 2:
        this.flagSymbol = '?';
        break;
    }
    return false;
  }
}
