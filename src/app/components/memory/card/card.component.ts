import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card: Card;

  @Output() cardClicked = new EventEmitter<Card>();

  onCardClick() {
    if (!this.card.isFlipped) {
      this.card.isFlipped = true;
      this.cardClicked.emit(this.card);
    }
  }
}
