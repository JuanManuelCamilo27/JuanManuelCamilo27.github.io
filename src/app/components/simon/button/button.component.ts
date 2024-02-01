import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Output() guess: EventEmitter<string> = new EventEmitter<string>();

  @Input() color: string;
  @Input() active: boolean = false;

  constructor() {}

  onClick() {
    this.guess.emit(this.color);
  }
}
