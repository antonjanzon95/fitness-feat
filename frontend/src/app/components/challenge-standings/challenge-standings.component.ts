import { Component, Input } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';

@Component({
  selector: 'app-challenge-standings',
  templateUrl: './challenge-standings.component.html',
  styleUrls: ['./challenge-standings.component.css'],
})
export class ChallengeStandingsComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'workoutTime',
    'weightChange',
  ];
  @Input() currentChallenge: IChallenge | undefined;
}
