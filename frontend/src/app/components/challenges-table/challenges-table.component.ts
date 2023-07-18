import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IChallenge } from 'src/app/models/IChallenge';
import { IAppState } from 'src/app/state/app.state';
import {
  selectAllChallenges,
  selectCurrentChallenge,
} from 'src/app/state/challenges/challenger.selector';
import { ChallengeActions } from 'src/app/state/challenges/challenges.actions';

@Component({
  selector: 'app-challenges-table',
  templateUrl: './challenges-table.component.html',
  styleUrls: ['./challenges-table.component.css'],
})
export class ChallengesTableComponent {
  displayedColumns: string[] = ['name', 'creator', 'startDate', 'endDate'];
  challenges$ = this.store.select(selectAllChallenges);
  currentChallenge$ = this.store.select(selectCurrentChallenge);

  constructor(private store: Store<IAppState>) {
    this.store.dispatch(ChallengeActions.getChallenges());
  }

  selectChallenge(challenge: IChallenge) {
    this.store.dispatch(
      ChallengeActions.getCurrentChallenge({ challengeId: challenge._id })
    );
  }
}
