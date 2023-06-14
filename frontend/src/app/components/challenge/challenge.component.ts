import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent implements OnChanges {
  @Input() currentChallenge: IChallenge | undefined;
  @Output() resetViewEmit: EventEmitter<null> = new EventEmitter<null>();
  daysRemaining: number | undefined;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentChallenge']) {
      if (this.currentChallenge) {
        this.daysRemaining = this.calculateDaysRemaining(
          new Date(this.currentChallenge?.endDate)
        );
      }
    }
  }

  resetView() {
    this.resetViewEmit.emit();
  }

  calculateDaysRemaining(endDate: Date): number {
    return Math.floor(
      Math.abs(endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
