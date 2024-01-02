import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board/board/board.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [CommonModule, BoardComponent, SettingsComponent],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss',
})
export class MinesweeperComponent {
  constructor() {}
}
