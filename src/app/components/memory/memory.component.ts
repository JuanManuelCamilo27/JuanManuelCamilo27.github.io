import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss',
})
export class MemoryComponent {}
