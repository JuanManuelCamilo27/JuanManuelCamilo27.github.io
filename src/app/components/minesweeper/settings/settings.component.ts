import { Component, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { GameService } from '../game.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements AfterViewChecked {
  width = new FormControl(this.gameService.gridWidth);
  height = new FormControl(this.gameService.gridHeight);
  bombs = new FormControl(this.gameService.bombs);

  constructor(
    private cdr: ChangeDetectorRef,
    public gameService: GameService
  ) {}

  saveSettings() {
    this.gameService.settingsVisible = false;
    this.gameService.gridWidth = this.width.value!;
    this.gameService.gridHeight = this.height.value!;
    this.gameService.bombs = this.bombs.value!;
    this.gameService.newGame();
  }

  getMaxBombs() {
    return Math.floor(this.width.value! * this.height.value! * 0.9);
  }

  ngAfterViewChecked() {
    this.bombs.setValue(Math.min(this.getMaxBombs(), this.bombs.value!));
    this.cdr.detectChanges();
  }
}
