import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';

@Component({
  selector: 'app-challenges-table',
  templateUrl: './challenges-table.component.html',
  styleUrls: ['./challenges-table.component.css'],
})
export class ChallengesTableComponent {
  displayedColumns: string[] = ['name', 'creator', 'startDate', 'endDate'];
  @Input() challenges: IChallenge[] | undefined;
  @Output() challengeSelected: EventEmitter<IChallenge> =
    new EventEmitter<IChallenge>();

  selectChallenge(challenge: IChallenge) {
    this.challengeSelected.emit(challenge);
  }
}
