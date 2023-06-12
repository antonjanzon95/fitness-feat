import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent {
  @Input() currentChallenge: IChallenge | undefined;
  @Output() resetViewEmit: EventEmitter<null> = new EventEmitter<null>();

  constructor() {}

  resetView() {
    this.resetViewEmit.emit();
  }
}
