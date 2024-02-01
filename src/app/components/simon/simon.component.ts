import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-simon',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.scss',
})
export class SimonComponent {}
