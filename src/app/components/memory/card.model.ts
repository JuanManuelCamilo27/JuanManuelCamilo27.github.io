export interface Card {
  id: number;
  imageSrc: string;
  isMatched: boolean;
  isFlipped: boolean;
  disableClick: boolean;
  attempts: number;
  wasClicked: boolean;
}
